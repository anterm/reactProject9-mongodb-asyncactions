import mongoose from 'mongoose'
import Books from '../src/models/Books'

module.exports = function(app) {
  app.get("/api/books", (req, res) => {
    Books.find({}, (err, books) => {
      setTimeout(() => {
        res.json(books)
      }, 2000)
    })
  })

  app.post("/api/books", (req, res, next) => {
    const book = {
      ...req.body,
      _id: mongoose.Types.ObjectId(),
    }

    new Books(book).save((err, r) => {
      res.json(book)
    })
  })

  app.put('/api/books/:bookId', (req, res, next) => {
    Books.update(
      { _id: req.params.bookId },
      req.body,
      (err, result) => {
        res.end()
      }
    )
  })

  app.delete("/api/books/:bookId", (req, res) => {
    Books.remove({ _id: req.params.bookId }, err => {
      res.end()
    })
  })
}