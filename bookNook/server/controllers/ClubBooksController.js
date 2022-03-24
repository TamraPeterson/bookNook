import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class ClubBooksController extends BaseController {
  constructor() {
    super('api/:clubId/clubBooks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
    // .get('/:id', this.getById)
    // .post('', this.create)
    // .delete('/:id', this.remove)

  }

  async getAll(req, res, next) {
    try {
      return res.send(['value1', 'value2'])
    } catch (error) {
      next(error)
    }
  }

}