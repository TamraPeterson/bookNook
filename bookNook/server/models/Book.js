import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const BookSchema = new Schema(
  {

    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: { type: String, required: true },
    mainCategory: { type: String, required: true },
    imageLinks: [{ type: Object, required: true }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
)