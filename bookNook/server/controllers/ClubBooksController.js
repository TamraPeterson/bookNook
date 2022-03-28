import { Auth0Provider } from "@bcwdev/auth0provider";
import { clubBooksService } from "../services/ClubBooksService";
import { clubsService } from "../services/ClubsService";
import { commentsService } from "../services/CommentsService";
import BaseController from "../utils/BaseController";
import { Forbidden } from "../utils/Errors";

export class ClubBooksController extends BaseController {
  constructor() {
    super('api/clubs/:clubId/clubBooks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAllClubBooks)
      .get('/:id', this.getById)
      .post('', this.createClubBook)
      .delete('/:id', this.remove)
      .put('/:id', this.edit)
      .get('/:id/comments', this.getClubBookComments)
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
  async remove(req, res, next) {
    try {
      const book = await clubBooksService.remove(req.params.id)
      return res.send('this club book has been removed yo')
    } catch (error) {
      next(error)
    }
  }
  async createClubBook(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const book = await clubBooksService.createClubBook(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.clubId = req.params.clubId
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const updateBook = await clubBooksService.edit(req.body)
      return res.send(updateBook)
    } catch (error) {
      next(error)
    }
  }

  async getClubBookComments(req, res, next) {
    try {
      const club = await commentsService.getClubBookComments(req.params.id)
      return res.send(club)
    } catch (error) {
      next(error)
    }
  }


}