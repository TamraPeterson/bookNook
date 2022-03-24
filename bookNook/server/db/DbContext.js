import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BookSchema } from '../models/Book'
import { ClubSchema } from '../models/Club'
import { MembershipSchema } from '../models/Membership'




class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');
  Books = mongoose.model('Book', BookSchema)
  Clubs = mongoose.model('Club', ClubSchema)
  Memberships = mongoose.model('Membership', MembershipSchema)

}

export const dbContext = new DbContext()
