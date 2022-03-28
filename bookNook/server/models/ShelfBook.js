import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const ShelfBookSchema = new Schema(
  {
    accountId: { type: Schema.Types.ObjectId, required: true },
    bookId: { type: String, required: true },
    shelfType: { type: String, enum: ['top', 'library', 'wishlist'], required: true, default: 'library' },
    imageLinks: [{ type: Object, required: true }],
    title: { type: String, required: true },
    authors: [{ type: String, required: true }]
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ShelfBookSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

