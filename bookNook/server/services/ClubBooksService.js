import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ClubBooksService {
  async getById(id) {
    const book = await dbContext.ClubBooks.findById(id)
    return book
  }
  async remove(id) {
    const book = await dbContext.ClubBooks.findByIdAndRemove(id)
    return book
  }
  async getAll() {
    const books = await dbContext.ClubBooks.find()
    return books
  }
  async createClub(body) {
    const book = await dbContext.ClubBooks.create(body)
    return book
  }

}

export const clubBooksService = new ClubBooksService()