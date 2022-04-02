import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class MembershipsService {


    async createMembership(membershipData, clubId) {
        const res = await api.post('api/clubs/' + clubId + '/memberships', membershipData)
        logger.log('creating membership', res.data)
        AppState.memberships.push(res.data)

    }

    async deleteMembership(theAccountId, theClubId) {
        const res = await api.delete('api/clubs/' + theClubId + '/memberships/' + theAccountId)
        logger.log('deleting membership', res.data)
        const membership = AppState.memberships.find(m => m.accountId == theAccountId && m.clubId == theClubId)
        logger.log('membership to delete', membership)
    }

}

export const membershipsService = new MembershipsService()