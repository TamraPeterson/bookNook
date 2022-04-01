import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class MembershipService {
  async getMemberships(clubId) {
    const members = await dbContext.Memberships.find(clubId).populate('account', 'name picture')
    return members.map(mongooseDocument => {
      const member = mongooseDocument.toJSON()
      return {
        clubId: member.clubId,
        accountId: member.id,
        ...member.account
      }
    })
  }

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