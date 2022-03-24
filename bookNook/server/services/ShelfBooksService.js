import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ShelfBooksService {
  async getShelfBooksByProfileId(profileId) {
    const shelfBooks = await dbContext.Books.find(profileId).populate('shelfBook')
    return shelfBooks.map(mongooseDocument => {
      const book = mongooseDocument.toJSON()
      return {
        accountId: profileId,
        bookId: book.Id,
        ...book.shelfBooks
      }
    })
  }
  async find(query = {}) {
    const values = await dbContext.Values.find(query)
    return values
  }

  async findById(id) {
    const value = await dbContext.Values.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }
}

export const shelfBooksService = new ShelfBooksService()