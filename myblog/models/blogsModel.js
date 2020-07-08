const mongoose = require("mongoose");
const mongo = require("mongodb");
const dbUrl = "mongodb://localhost:27017/BlogDB";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: {
    type: Schema.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});
const Blogs = (module.exports = mongoose.model("blogs", blogSchema));

//ADD
module.exports.createBlog = function (newBlogs, callback) {
  newBlogs.save(callback);
};

//GETALL
module.exports.getAllBlogs = function (data) {
  Blogs.find(data);
};

module.exports.DeleteBlog = function (id, callback) {
  Blogs.findByIdAndDelete(id, callback);
};

module.exports.getBlogId = function (id, callback) {
  Blogs.findOne({ _id: id }, callback);
};
