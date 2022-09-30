const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost/books`);

let booksSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  location: { type: String },
  books: {
    title: { type: String },
    isbn: { type: Number },
    pageCount: { type: Number },
    publishedDate: { type: String },
    thumbnailUrl: { type: String },
    status: { type: String },
    authors: [{ author: { type: String } }],
    categories: [{ category: { type: String } }],
  },
});

let Books = mongoose.model("Books", booksSchema);

let seed = (data) => {
  return Books.insertMany(data);
};

module.exports = {
  seed,
};
