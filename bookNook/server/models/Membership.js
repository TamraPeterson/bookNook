import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const MembershipSchema = new Schema(
  {
    accountId: { type: String, required: true },
    clubId: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

MembershipSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

MembershipSchema.virtual('club', {
  localField: 'clubId',
  foreignField: '_id',
  justOne: true,
  ref: 'Club'
})
