import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class ShelfBooksService {
  async remove(id) {
    await dbContext.ShelfBooks.findOneAndDelete(id)
  }
  async getById(id) {
    const book = await dbContext.ShelfBooks.findById(id)
    return book
  }
  async getAll(query = {}) {
    const books = await dbContext.ShelfBooks.find(query)
    return books
  }
  async createBook(body) {
    const book = await dbContext.ShelfBooks.create(body)
    return book
  }


}

export const shelfBooksService = new ShelfBooksService()