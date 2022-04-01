import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { clubsService } from "./ClubsService"

class ClubBooksService {
  async getAll(id) {
    const books = await dbContext.ClubBooks.find({ clubId: id })
    return books
  }
  async getById(id) {
    const book = await dbContext.ClubBooks.findById(id)
    if (!book) {
      throw new BadRequest('No book')
    }
    return book
  }
  async remove(id) {
    const book = await dbContext.ClubBooks.findByIdAndRemove(id)
    return book
  }
  async createClubBook(body) {
    const book = await dbContext.ClubBooks.create(body)

    return book
  }

  async edit(updateBook) {
    const club = await clubsService.getById(updateBook.clubId)
    // if (club.creatorId.toString() !== updateBook.creatorId) {
    //   throw new Forbidden('Not your, friggin thing man')
    // }
    const original = await this.getById(updateBook.id)
    // original.isActive = !original.isActive
    original.save()
    return original

  }
}

export const clubBooksService = new ClubBooksService()