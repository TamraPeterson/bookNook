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
            AppState.books = res.data.map(b => new Book(b))
        } catch (error) {
            logger.error(error)
        }
    }

    async searchBook(query = {}) {
        try {
            const res = await googleApi.get('?q=' + query + googleKey)
            logger.log('[BooksService searchBook]', res.data)
            AppState.activeBook = new Book(res.data)
        } catch (error) {
            logger.error(error)
        }
    }
}

export const booksService = new BooksService()