// AppState.books = resd.data.map(b => new Book(b))

import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import { googleApi, googleKey } from "./AxiosService"

class BooksService {
    async getBookById(id) {
        const res = await googleApi.get('/' + id + '?' + googleKey)
        AppState.activeBook = res.data.volumeInfo
        logger.log('active book', AppState.activeBook)
    }

    async searchBook(query) {
        AppState.searchBooks = []
        const res = await googleApi.get('?q=' + query + '&' + googleKey)
        AppState.searchBooks = res.data.items.map(i => new Book(i))
        logger.log('searchbooks', AppState.searchBooks)
    }
}

export const booksService = new BooksService()