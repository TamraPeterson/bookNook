import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService {

    async getCommentsByBook(id) {
        const res = await api.get('api/comments?clubBookId=' + id)
        logger.log('comments', res.data)
    }
    async newComment(comment) {
        const res = await api.post('api/comments', comment)
        logger.log('comment created', res.data)

    }
}

export const commentsService = new CommentsService()