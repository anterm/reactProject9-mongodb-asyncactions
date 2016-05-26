import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BookSchema = new Schema({
  name: 'string',
  author: "string",
  price: "number"
})

BookSchema.index({ name: 1 })

export default mongoose.model('Books', BookSchema)