import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ShelfBookSchema } from '../models/ShelfBook'
import { ClubSchema } from '../models/Club'
import { MembershipSchema } from '../models/Membership'
import { ClubBookSchema } from "../models/ClubBook"
import { CommentSchema } from '../models/Comment'



class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts')
  ShelfBooks = mongoose.model('ShelfBook', ShelfBookSchema)
  Clubs = mongoose.model('Club', ClubSchema)
  Memberships = mongoose.model('Membership', MembershipSchema)

  ClubBooks = mongoose.model('ClubBook', ClubBookSchema)
  Comments = mongoose.model('Comment', CommentSchema);

}

export const dbContext = new DbContext()
