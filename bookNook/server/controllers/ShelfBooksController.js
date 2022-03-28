import { Auth0Provider } from "@bcwdev/auth0provider";
import { application } from "express";
import { booksService } from "../services/BooksService";
import { shelfBooksService } from "../services/ShelfBooksService";
import BaseController from "../utils/BaseController";

export class ShelfBooksController extends BaseController {
  constructor() {
    super('api/shelfBooks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.createShelfBook)
      .get('/:id', this.getById)
      .delete('/:id', this.remove)

  }
  async remove(req, res, next) {
    try {
      const book = await shelfBooksService.remove(req.params.id)
      return res.send('removed')
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const books = await shelfBooksService.getAll(req.query)
      res.send(books)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const book = await shelfBooksService.getById(req.params.id)
      res.send(book)
    } catch (error) {
      next(error)
    }
  }

  async createShelfBook(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const book = await shelfBooksService.createBook(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

}
