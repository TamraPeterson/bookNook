import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentsService } from '../services/CommentsService'

export class CommentsController extends BaseController {
  constructor() {
    super('api/:clubId/:clubBookId/comments')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('', this.getAll)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const comments = await commentsService.getAll(req.query)
      return res.send(comments)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      const comment = await commentsService.create(req.body)
      await comment.populate('creator', 'name picture')
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await commentsService.remove(req.params.id, req.userInfo.id)
      return res.send('Comment Deleted')
    } catch (error) {
      next(error)
    }
  }
  async getClubComments(req, res, next) {
    try {
        const club = await commentsService.getClubComments(req.params.id)
        return res.send(club)
    } catch (error) {
        next(error)
    }
  }
}