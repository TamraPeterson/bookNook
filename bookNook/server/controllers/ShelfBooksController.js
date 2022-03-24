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
      .post('', this.createBook)
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
      const books = await shelfBooksService.getAll()
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

  async createBook(req, res, next) {
    try {
      const book = await shelfBooksService.createBook(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

}
