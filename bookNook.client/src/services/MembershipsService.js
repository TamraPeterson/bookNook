import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class MembershipsService {


    async createMembership(membershipData, clubId) {
        const res = await api.post('api/clubs/' + clubId + '/memberships', membershipData)
        logger.log('creating membership', res.data)
        AppState.memberships.push(res.data)

    }

}

export const membershipsService = new MembershipsService()