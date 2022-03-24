import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const ClubSchema = new Schema(
  {
    id: { type: String, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)