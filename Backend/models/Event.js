import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  event_id: { type: Number, required: true, unique: true },
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases', required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model('Events', eventSchema, 'Events');
