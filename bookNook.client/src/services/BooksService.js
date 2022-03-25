// AppState.books = resd.data.map(b => new Book(b))

import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import { googleApi, googleKey } from "./AxiosService"

class BooksService {
    async getBookById() {
        try {
            const res = await googleApi.get('/:id?' + googleKey)
            logger.log(res.data)
            AppState.activeBook = res.data.map(b => new Book(b))
        } catch (error) {
            logger.error(error)
        }
    }

    async searchBook(query) {
        try {
            const res = await googleApi.get('?q=' + query + '&' + googleKey)

            AppState.searchBooks = res.data.items.map(i => new Book(i))
            logger.log('searchbooks', AppState.searchBooks)
        } catch (error) {
            logger.error(error)
        }
    }
}

export const booksService = new BooksService()