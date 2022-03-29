// AppState.books = resd.data.map(b => new Book(b))

import { applyStyles } from "@popperjs/core"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import { api, googleApi, googleKey } from "./AxiosService"

class BooksService {
    async getBookById(id) {
        const res = await googleApi.get('/' + id + '?' + googleKey)
        logger.log(res.data)
        res.data.volumeInfo.bookId = res.data.id
        res.data.volumeInfo.id = id
        AppState.activeBook = res.data.volumeInfo
        logger.log('active book', AppState.activeBook)
    }

    async searchBook(query) {
        AppState.searchBooks = []
        const res = await googleApi.get('?q=' + query + '&' + googleKey)
        AppState.searchBooks = res.data.items.map(i => new Book(i))
        logger.log('searchbooks', AppState.searchBooks)
    }

    async addToShelf() {
        const bookToAdd = AppState.activeBook
        const res = await api.post('api/shelfBooks', bookToAdd)
        logger.log('added to shelf', res.data)
        AppState.myShelfBooks.push(res.data)
        logger.log(AppState.myShelfBooks)
        return res.data
    }

    async getAll(id) {
        const res = await api.get('api/shelfBooks/?accountId=' + id)
        logger.log('getting books', res.data)
        AppState.myShelfBooks = res.data
    }

    async removeFromShelf(id) {
        const bookToRemove = AppState.myShelfBooks.find(b => b.bookId == id)
        const res = await api.delete('api/shelfBooks/' + bookToRemove.id)
        logger.log('delorting book', res.data)
        AppState.myShelfBooks = AppState.myShelfBooks.filter(b => b != bookToRemove)
    }
}

export const booksService = new BooksService()