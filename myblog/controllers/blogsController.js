const Blogs = require("../models/blogsModel");
const { check, validationResult } = require("express-validator");

// const data = {
//   name: "Withan",
//   id: 20800,
// };

exports.index = function (req, res, next) {
  Blogs.getAllBlogs(function (err, blogs) {
    if (err) throw err;
    res.render("blogs/index", { blogs });
  });
  //   res.send(data);
};

exports.addForm = function (req, res, next) {
  res.render("blogs/addForm");
  //   res.send(data);
};

exports.delete = function (req, res, next) {
  //console.log("ID DELETE = ", req.params.id);
  Blogs.DeleteBlog([req.params.id], function (err, callback) {
    if (err) throw err;
    res.redirect("/blogs");
  });
};

exports.edit = function (req, res, next) {
  Blogs.getBlogId([req.params.id], function (err, blog) {
    if (err) throw err;
    res.render("blogs/editForm", { blog: blog });
    // res.send({ data: blog });
  });
  // console.log("ID EDIT : ", req.params.id);
};

exports.submitForm = function (req, res, next) {
  const result = validationResult(req);
  var errors = result.errors;
  for (var key in errors) {
    console.log(errors[key].value);
  }
  if (!result.isEmpty()) {
    //response validate data to register.ejs
    //กรณีป้อนไม่ครบ
    res.render("blogs/addForm", {
      errors: errors,
    });
  } else {
    //กรณีป้อนครบ
    const data = new Blogs({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category,
    });
    Blogs.createBlog(data, function (err, callback) {
      if (err) console.log(err);
      res.redirect("/blogs");
    });
  }
};
