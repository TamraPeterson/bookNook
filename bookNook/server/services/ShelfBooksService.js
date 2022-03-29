import { dbContext } from "../db/DbContext"
import { AccountSchema } from "../models/Account"
import { BadRequest, Forbidden } from "../utils/Errors"

class ShelfBooksService {
  async remove(id, userId) {
    const book = await dbContext.ShelfBooks.findById(id)
    if (book.accountId.toString() !== userId) {
      throw new Forbidden('Not your book to delete')
    }
    await book.delete()

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
    const foundBook = await dbContext.ShelfBooks.findOne({ accountId: body.accountId, bookId: body.bookId })
    if (foundBook) {
      throw new BadRequest('Book is already in library nerd')
    }
    const book = await dbContext.ShelfBooks.create(body)
    return book
  }


}

export const shelfBooksService = new ShelfBooksService()