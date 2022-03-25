import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class MembershipService {
  async createMembership(membership) {
    const newMembership = await dbContext.Memberships.create(membership)
    newMembership.populate('club')
    return newMembership
  }
  async deleteMembership(accountId, membershipId, membershipBody) {
    if (accountId == membershipBody.accountId) {
      throw new BadRequest('dis not your membership dawg')
    }
    await dbContext.Memberships.findByIdAndDelete(membershipId)
  }

}

export const membershipService = new MembershipService()