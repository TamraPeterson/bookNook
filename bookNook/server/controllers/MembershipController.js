import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class MembershipController extends BaseController {
  constructor() {
    super('api/membership')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.deleteMembership)
      .post('', this.createMembership)
  }
  createMembership(req, res, next) {
    throw new Error("Method not implemented.")
  }
  deleteMembership(req, res, next) {
    throw new Error("Method not implemented.")
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }
}
