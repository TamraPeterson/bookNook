import { applyStyles } from "@popperjs/core"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import { api, googleApi, googleKey } from "./AxiosService"

class ClubsService {
    async getClubById(id) {
        // const res = await googleApi.get('/' + id + '?' + googleKey)
        const res = await api.get('/clubs', id)
        logger.log(res.data)
        res.data.volumeInfo.bookId = res.data.id
        AppState.activeBook = res.data.volumeInfo
        logger.log('active book', AppState.activeBook)
    }

    async searchClub(query) {
        logger.log('query', query)
        AppState.searchClubs = []
        const res = await api.get('/clubs?query=', query)
        logger.log('searchClub', res.data)
        // AppState.searchClubs = res.data.items.map(i => new Club(i))
        logger.log('Search Clubs', AppState.searchClubs)
    }

    async addToShelf() {
        const bookToAdd = AppState.activeBook
        const res = await api.post('api/shelfBooks', bookToAdd)
        logger.log('added book to shelf', res.data)
    }
}

export const clubsService = new ClubsService()