import { applyStyles } from "@popperjs/core"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import { api, googleApi, googleKey } from "./AxiosService"

class ClubsService {


    async getClubsByBookId(query = {}) {
        const res = await api.get('api/clubs', { params: query })
        logger.log('get clubs', res.data)
        AppState.clubs = res.data
        return res.data
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

    async createClub(clubData) {
        const res = await api.post('api/clubs', clubData)
        logger.log('service create club', res.data)
        AppState.clubs.push(res.data)
        return res.data
    }
}

export const clubsService = new ClubsService()