import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { membershipService } from "../services/MembershipService"

export class MembershipController extends BaseController {
  constructor() {
    super('api/clubs/:clubId/memberships')
    this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.deleteMembership)
      .post('', this.createMembership)
  }

  async createMembership(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      req.body.clubId = req.params.clubId
      const membership = await membershipService.createMembership(req.body)
      return res.send(membership)

    } catch (error) {
      next(error)
    }
  }

  async deleteMembership(req, res, next) {
    try {
      const accountId = req.userInfo.id
      const membershipId = req.params.id
      req.body.clubId = req.params.clubId
      await membershipService.deleteMembership(accountId, membershipId, req.body)
      return res.send('dis membership delorted')
    } catch (error) {
      next(error)
    }
  }
}
