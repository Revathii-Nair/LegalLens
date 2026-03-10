import mongoose from 'mongoose';

const evidenceSchema = new mongoose.Schema({
  evidence_id: { type: Number, required: true, unique: true },
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases', required: true },
  uploaded_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  description: { type: String },
  verified: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Evidence', evidenceSchema, 'Evidence');
