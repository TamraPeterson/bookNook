import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const MembershipSchema = new Schema(
  {

  },
  { timestamps: true, toJSON: { virtuals: true } }
)