import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './models/User.js';
import Role from './models/Role.js';
import Case from './models/Case.js';
import Event from './models/Event.js';
import Evidence from './models/Evidence.js';
import CaseMember from './models/CaseMember.js';
import AuditLog from './models/auditLog.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', email);

  try {
    const user = await User.findOne({ email });

    console.log('User from DB:', user);
    if (!user) return res.status(401).json({ message: 'User not found' });

    // For now plain text check (later replace with bcrypt.compare)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role_id: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Case stats for current user
app.get('/case-stats', authenticateToken, async (req, res) => {
  try {
    const memberships = await CaseMember.find({ user_id: req.user.id }).populate('case_id');

    const totalAssigned = memberships.length;
    const activeCases = memberships.filter((m) => m.case_id.status === 'Open').length;
    const closedCases = memberships.filter((m) => m.case_id.status === 'Close').length;
    const highPriorityCases = memberships.filter((m) => m.case_id.priority === 3).length;

    res.json({
      totalAssigned,
      activeCases,
      closedCases,
      highPriorityCases,
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching case stats', error: err.message });
  }
});

// Get latest 3 assigned cases for current user
app.get('/assigned-cases', authenticateToken, async (req, res) => {
  try {
    const memberships = await CaseMember.find({ user_id: req.user.id }).populate({
      path: 'case_id',
      options: {
        sort: { priority: -1, createdAt: 1 }, // use your compound index
        limit: 3,
      },
    });

    const cases = memberships.map((m) => ({
      id: m.case_id._id,
      caseId: m.case_id.case_id,
      title: m.case_id.title,
      priority: m.case_id.priority, // 3=High, 2=Medium, 1=Low
      status: m.case_id.status,
    }));

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching assigned cases', error: err.message });
  }
});

// Recent open cases (max 3)
app.get('/recent-cases', authenticateToken, async (req, res) => {
  try {
    const recentCases = await Case.find({ status: 'Open' })
      .sort({ priority: -1, createdAt: 1 }) // use your compound index priority_-1_created_at_-1
      .limit(3);

    if (!recentCases || recentCases.length === 0) {
      return res.json({ message: 'no recent cases' });
    }

    const cases = recentCases.map((c) => ({
      id: c._id,
      caseId: c.case_id,
      title: c.title,
      priority: c.priority, // 3=High, 2=Medium, 1=Low
      status: c.status,
    }));

    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching recent cases', error: err.message });
  }
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Protected route
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the dashboard!', user: req.user });
});

app.get('/cases', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the cases page!', user: req.user });
});

app.get('/cases/:caseId', authenticateToken, (req, res) => {
  res.json({ message: 'Welcome to the case page!', user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
