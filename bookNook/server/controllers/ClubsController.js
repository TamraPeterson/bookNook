import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { clubBooksService } from "../services/ClubBooksService"
import { clubsService } from "../services/ClubsService"
import { commentsService } from '../services/CommentsService'
import { membershipService } from "../services/MembershipService"

export class ClubsController extends BaseController {
  constructor() {
    super('api/clubs')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
      .get('/:id/memberships', this.getMemberships)
  }


  async getAll(req, res, next) {
    try {
      const clubs = await clubsService.getAll(req.query)
      res.send(clubs)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const club = await clubsService.getById(req.params.id)
      res.send(club)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const club = await clubsService.createClub(req.body)
      res.send(club)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await clubsService.remove(req.params.id, req.userInfo.id)
      return res.send('delorted')
    }
    catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.id = req.params.id
      req.body.creatorId = req.userInfo.id
      const updateActiveBook = await clubsService.update(req.body)
      return res.send(updateActiveBook)
    } catch (error) {
      next(error)
    }
  }

  async getMemberships(req, res, next) {
    try {
      const memberships = await membershipService.getMemberships({ clubId: req.params.id })
      return res.send(memberships)
    } catch (error) {
      next(error)
    }
  }



}