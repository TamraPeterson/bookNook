import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ClubBooksService {

    async getClubsBooks(id) {
        const res = await api.get('api/clubs/' + id + '/clubBooks')
        AppState.clubBooks = res.data
        logger.log('book for this club', res.data)

    }

}


export const clubBooksService = new ClubBooksService()