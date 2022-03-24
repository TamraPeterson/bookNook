import { Auth0Provider } from "@bcwdev/auth0provider";
import { clubBooksService } from "../services/ClubBooksService";
import BaseController from "../utils/BaseController";

export class ClubBooksController extends BaseController {
  constructor() {
    super('api/:clubId/clubBooks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllClubBooks)
      .post('', this.createClub)
      .delete('/:id', this.remove)
      .get('/:id', this.getById)
  }
  async remove(req, res, next) {
    try {
      const book = await clubBooksService.remove(req.params.id)
    } catch (error) {
      next(error)
    };
  }
  async createClub(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const book = await clubBooksService.createClub(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }
  async getAllClubBooks(req, res, next) {
    try {
      const books = await clubBooksService.getAll()
      res.send(books)
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const book = await clubBooksService.getById(req.params.id)
      res.send(book)
    } catch (error) {
      next(error)
    }
  }


}