import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const ClubSchema = new Schema(
  {

  },
  { timestamps: true, toJSON: { virtuals: true } }
)