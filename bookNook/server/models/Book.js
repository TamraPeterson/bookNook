import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const BookSchema = new Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    description: { type: String, required: true },
    mainCategory: { type: String, required: true },
    imageLinks: [{ type: Object, required: true, default: 'https://via.placeholder.com' }],
  },
  { timestamps: true, toJSON: { virtuals: true } }
)