import { applyStyles } from "@popperjs/core"
import { Modal } from "bootstrap"
import { AppState } from "../AppState"
import Book from "../Models/Book"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api, googleApi, googleKey } from "./AxiosService"

class ClubsService {


    async getClubsByBookId(query = {}) {
        const res = await api.get('api/clubs', { params: query })
        logger.log('get clubs', res.data)
        AppState.clubs = res.data
        return res.data
    }

    async getClubById(id) {
        logger.log(id)
        const res = await api.get('api/clubs/' + id)
        logger.log('the club', res.data)
        AppState.activeClub = res.data

    }

    async searchClub(query = '') {
        const res = await api.get('api/clubs')
        AppState.clubs = res.data
        query = query.toLowerCase()
        const reg = new RegExp(query, 'ig')
        AppState.clubs = AppState.clubs.filter(c => reg.exec(c.name))
        logger.log('new array who dis?', AppState.clubs)

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

    async deleteClub(id) {

        if (await Pop.confirm("Are you sure?")) {
            const clubToRemove = AppState.clubs.find(c => c.id == id)
            logger.log(id, 'this should be an id')
            await api.delete('api/clubs/' + clubToRemove.id)
            AppState.clubs = AppState.clubs.filter(c => c != clubToRemove)
        }



    }

    async setAsActive(activeBook) {
        const res = await api.put('api/clubs/' + activeBook.clubId, activeBook)
        logger.log('active book', res.data)
        AppState.activeClub = res.data

    }

    async getMemberships(id) {
        const res = await api.get('api/clubs/' + id + '/memberships')
        logger.log('getting memberships', res.data)
        AppState.memberships = res.data
    }

}


export const clubsService = new ClubsService()