import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController";

export class BooksController extends BaseController {
  constructor() {
    super('api/books')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
    // .get('/:id', this.getById)
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
