import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class ClubsService {
  async getAll(query = {}) {
    const clubs = await dbContext.Clubs.find(query)
    return clubs
  }
  async getById(id) {
    const club = await dbContext.Clubs.findById(id)
    if (!club) {
      throw new BadRequest('No club dog')
    }
    return club
  }
  async createClub(body) {
    const club = await dbContext.Clubs.create(body)
    await club.populate('creator', 'name picture')
    return club
  }
  async remove(clubId, userId) {
    const club = await dbContext.Clubs.findById(clubId)
    if (club.creatorId.toString() != userId) {
      throw new BadRequest('not yo clurb')
    }
    await dbContext.Clubs.findOneAndRemove({ _id: clubId })
  }




}

export const clubsService = new ClubsService()