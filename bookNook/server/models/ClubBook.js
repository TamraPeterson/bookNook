import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ClubBookSchema = new Schema(
  {
    clubId: { type: String, required: true },
    bookId: { type: String, required: true },
    startDate: { type: Date, required: true },
    title: { type: String, required: true },
    authors: [{ type: String, required: true }],
    imageLinks: [{ type: Object, required: true }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ClubBookSchema.virtual('club', {
  localField: 'clubId',
  foreignField: '_id',
  justOne: true,
  ref: 'Club'
})


