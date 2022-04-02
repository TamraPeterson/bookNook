import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class MembershipService {
  async getMemberships(clubId) {
    const members = await dbContext.Memberships.find(clubId).populate('account', 'name picture')
    return members.map(mongooseDocument => {
      const member = mongooseDocument.toJSON()
      return {
        clubId: member.clubId,
        memberId: member.id,
        ...member.account
      }
    })
  }

  async createMembership(membership) {
    const newMembership = await dbContext.Memberships.create(membership)
    await newMembership.populate('account', 'name picture')
    return newMembership
  }
  async deleteMembership(accountId, id) {
    const membership = await dbContext.Memberships.findById(id)
    if (membership.accountId.toString() !== accountId) {
      throw new Forbidden('Not yours to delete')
    }
    await membership.delete()

  }

}

export const membershipService = new MembershipService()