import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class MembershipsService {


    async createMembership(newMembership) {
        const res = await api.post('api/membership', newMembership)
        logger.log('creating membership', res.data)
        AppState.memberships.push(newMembership)
        AppState.myMemberships.push(newMembership)
    }

}

export const membershipsService = new MembershipsService()