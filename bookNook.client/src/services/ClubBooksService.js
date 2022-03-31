import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ClubBooksService {

    async getClubsBooks(id) {
        const res = await api.get('api/clubs/' + id + '/clubBooks')
        AppState.clubBooks = res.data
        logger.log('book for this club', res.data)

    }

    async addBookToClub(searchBook, clubId) {
        logger.log("search book", searchBook, clubId)

        const res = await api.post('api/clubs/' + clubId + '/clubBooks', searchBook)
        logger.log(res.data)
        AppState.clubBooks.push(res.data)
        logger.log(AppState.clubBooks)

    }
    async setAsActive(id) {

        const bookToActive = AppState.clubBooks.find(b => b.id == id)
        AppState.activeBook = bookToActive
        logger.log(bookToActive)
    }

}


export const clubBooksService = new ClubBooksService()