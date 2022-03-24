import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class BooksService {
  async remove(id) {
    const book = await dbContext.Books.findByIdAndRemove(id)
    return book
  }
  async getById(id) {
    const book = await dbContext.Books.findById(id)
    return book
  }
  async getAll() {
    const books = await dbContext.Books.find()
    return books
  }
  async createBook(body) {
    const book = await dbContext.Books.create(body)
    return book
  }


}

export const booksService = new BooksService()