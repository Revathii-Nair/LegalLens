import mongoose from 'mongoose';

const caseMemberSchema = new mongoose.Schema({
  case_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cases', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  role: { type: String },
});

export default mongoose.model('CaseMembers', caseMemberSchema, 'CaseMembers');
