import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { api } from "./AxiosService"

class CommentsService {

    async getCommentsByBook(id) {
        const res = await api.get('api/comments?clubBookId=' + id)
        logger.log('comments', res.data)
        AppState.comments = res.data
    }
    async newComment(comment) {
        const res = await api.post('api/comments', comment)
        logger.log('comment created', res.data)
        AppState.comments.push(res.data)
    }

    async deleteComment(id) {

        if (await Pop.confirm("are you sure?")) {
            const comment = AppState.comments.find(c => c.id == id)
            logger.log('this be  id', id)
            await api.delete('api/comments/' + comment.id)
            AppState.comments = AppState.comments.filter(c => c != comment)
        }


    }
}


export const commentsService = new CommentsService()