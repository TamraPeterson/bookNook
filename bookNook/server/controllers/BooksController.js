import { Auth0Provider } from "@bcwdev/auth0provider";
import { application } from "express";
import { booksService } from "../services/BooksService";
import BaseController from "../utils/BaseController";

export class BooksController extends BaseController {
  constructor() {
    super('api/books')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .post('', this.createBook)
      .get('/:id', this.getById)
      .delete('/:id', this.remove)

  }
  async remove(req, res, next) {
    try {
      const book = await booksService.remove(req.params.id)
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const books = await booksService.getAll()
      res.send(books)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const book = await booksService.getById(req.params.id)
      res.send(book)
    } catch (error) {
      next(error)
    }
  }

  async createBook(req, res, next) {
    try {
      const book = await booksService.createBook(req.body)
      return res.send(book)
    } catch (error) {
      next(error)
    }
  }

}
