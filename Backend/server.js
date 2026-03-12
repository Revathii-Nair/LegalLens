import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Role from "./models/Role.js";
import Case from "./models/Case.js";
import Event from "./models/Event.js";
import Evidence from "./models/Evidence.js";
import CaseMember from "./models/CaseMember.js";
import AuditLog from "./models/auditLog.js";

dotenv.config();
const app = express();
// server.js - Place this at the absolute TOP before app.use(express.json())
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // MUST INCLUDE Authorization
  res.header("Access-Control-Allow-Credentials", "true");

  // Approval for the Preflight handshake
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Login route
app.post("/login", async (req, res) => {
  const email = req.body.email.trim().toLowerCase();
  const { password } = req.body;
  console.log("Login attempt:", email);

  try {
    const user = await User.findOne({ email }).populate("role_id");

    console.log("User from DB:", user);
    if (!user) return res.status(401).json({ message: "User not found" });

    // For now plain text check (later replace with bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role_id: user.role_id.role_id, // numeric ID
        role_name: user.role_id.role_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role_id: user.role_id.role_id, // numeric ID
        role_name: user.role_id.role_name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Case stats for current user
app.get("/case-stats", authenticateToken, async (req, res) => {
  try {
    const cases =
      req.user.role_id === 1
        ? await Case.find({})
        : (await CaseMember.find({ user_id: req.user.id }).populate("case_id"))
            .map((m) => m.case_id)
            .filter(Boolean);

    res.json({
      totalAssigned: cases.length,
      activeCases: cases.filter((c) => c.status === "Open").length,
      closedCases: cases.filter((c) => c.status === "Close").length,
      highPriorityCases: cases.filter((c) => c.priority === 3).length,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching case stats", error: err.message });
  }
});

// Get latest 3 assigned cases for current user
app.get("/assigned-cases", authenticateToken, async (req, res) => {
  try {
    let cases;

    if (req.user.role_id === 1) {
      // Supervising Officer: all cases
      cases = await Case.find().sort({ priority: -1, createdAt: -1 }).limit(3);
    } else {
      const memberships = await CaseMember.find({
        user_id: req.user.id,
      }).populate({
        path: "case_id",
        options: { sort: { priority: -1, createdAt: -1 }, limit: 3 },
      });

      if (!memberships.length) {
        return res.json({ message: "no assigned cases" });
      }

      cases = memberships.map((m) => m.case_id).filter(Boolean);
    }

    res.json(
      cases.map((c) => ({
        id: c._id,
        caseId: c.case_id,
        title: c.title,
        priority: c.priority,
        status: c.status,
      })),
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching assigned cases", error: err.message });
  }
});

// Recent open cases (max 3)
app.get("/recent-cases", authenticateToken, async (req, res) => {
  try {
    let cases;

    if (req.user.role_id === 1) {
      // Supervising Officer: all open cases
      cases = await Case.find({ status: "Open" })
        .sort({ priority: -1, createdAt: -1 })
        .limit(3);
    } else {
      const memberships = await CaseMember.find({
        user_id: req.user.id,
      }).populate({
        path: "case_id",
        match: { status: "Open" },
        options: { sort: { priority: -1, createdAt: -1 }, limit: 3 },
        select: "case_id title status priority createdAt",
      });

      cases = memberships.map((m) => m.case_id).filter(Boolean);
    }

    if (!cases.length) {
      return res.json({ message: "no recent cases" });
    }

    res.json(
      cases.map((c) => ({
        id: c._id,
        caseId: c.case_id,
        title: c.title,
        priority: c.priority,
        status: c.status,
      })),
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching recent cases", error: err.message });
  }
});

//All assigned cases

app.get("/cases", authenticateToken, async (req, res) => {
  try {
    let cases;

    if (req.user.role_id === 1) {
      // Supervising Officer: all cases
      cases = await Case.find({});
    } else {
      const memberships = await CaseMember.find({
        user_id: req.user.id,
      }).populate("case_id");

      if (!memberships.length) {
        return res.json({ message: "no assigned cases" });
      }

      cases = memberships.map((m) => m.case_id).filter(Boolean);
    }

    // Custom sort: Open first (by priority desc), then Archived, then Close
    const statusOrder = { Open: 1, Archived: 2, Close: 3 };
    cases.sort((a, b) => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      // If both are Open, sort by priority (high first)
      if (a.status === "Open" && b.status === "Open") {
        return b.priority - a.priority;
      }
      return 0;
    });

    res.json(
      cases.map((c) => ({
        id: c._id,
        caseId: c.case_id,
        title: c.title,
        priority: c.priority,
        status: c.status,
      })),
    );
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching cases", error: err.message });
  }
});

// case details
app.get("/case/:id", authenticateToken, async (req, res) => {
  try {
    const caseId = parseInt(req.params.id, 10);

    // Find the case
    const caseDoc = await Case.findOne({ case_id: caseId });
    if (!caseDoc) {
      return res.status(404).json({ message: "Case not found" });
    }

    // Find all members assigned to this case
    const memberships = await CaseMember.find({
      case_id: caseDoc._id,
    }).populate({
      path: "user_id",
      populate: { path: "role_id", model: "Roles" }, // populate role details
    });

    // Extract member names
    const memberNames = memberships.map((m) => m.user_id?.name).filter(Boolean);

    // Filter lead investigators by role_name or role_id
    const leadInvestigators = memberships
      .filter((m) => m.user_id?.role_id?.role_name === "Lead_Investigator")
      .map((m) => m.user_id.name);

    res.json({
      id: caseDoc._id,
      caseId: caseDoc.case_id,
      title: caseDoc.title,
      description: caseDoc.description,
      status: caseDoc.status,
      priority: caseDoc.priority,
      start_date: caseDoc.start_date,
      end_date: caseDoc.end_date,
      members: memberNames,
      leadInvestigators: leadInvestigators,
    });
  } catch (err) {
    console.error("Error fetching case:", err);
    res
      .status(500)
      .json({ message: "Error fetching case", error: err.message });
  }
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route
app.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard!", user: req.user });
});

app.get("/cases/:caseId", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the case page!", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
