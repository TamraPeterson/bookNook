import mongoose from 'mongoose'
const Schema = mongoose.Schema
export const ClubSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    activeBookId: { type: Schema.Types.ObjectId, ref: 'ClubBook', required: true, default: null }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

ClubSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

ClubSchema.virtual('clubBook', {
  localField: 'activeBookId',
  foreignField: '_id',
  justOne: true,
  ref: 'ClubBook'
})