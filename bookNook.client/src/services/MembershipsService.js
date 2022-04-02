import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class MembershipsService {


    async createMembership(membershipData, clubId) {
        const res = await api.post('api/clubs/' + clubId + '/memberships', membershipData)
        logger.log('creating membership', res.data)
        res.data.account.memberId = res.data.id
        AppState.memberships.push(res.data.account)

    }

    async deleteMembership(theAccountId, theClubId) {

        const membership = AppState.memberships.find(m => m.id == theAccountId)
        const res = await api.delete('api/clubs/' + theClubId + '/memberships/' + membership.memberId)
        logger.log('deleting membership', res.data)
        AppState.memberships = AppState.memberships.filter(m => m.memberId !== membership.memberId)


    }

}

export const membershipsService = new MembershipsService()