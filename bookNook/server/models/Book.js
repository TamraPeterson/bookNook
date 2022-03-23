import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const BookSchema = new Schema(
  {

  },
  { timestamps: true, toJSON: { virtuals: true } }
)