
export default class Book {
    constructor(data) {
        this.title = data.volumeInfo.title,
        this.authors = data.volumeInfo.authors,
        this.imageLinks = data.volumeInfo.imageLinks,
        this.bookId = data.id
    }
}