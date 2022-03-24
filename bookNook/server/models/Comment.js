import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    body: { type: String, required: true },
    spoiler: { type: Boolean, required: true },
    clubId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentSchema.virtual('club', {
  localField: 'clubId',
  foreignField: '_id',
  justOne: true,
  ref: 'Club'
})
