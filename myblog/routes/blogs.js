var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

var blogController = require("../controllers/blogsController");

/* GET home page. */

router.get("/", blogController.index);
router.get("/add", blogController.addForm);
router.get("/delete/:id", blogController.delete);
router.get("/edit/:id", blogController.edit);

router.post(
  "/add",
  [
    check("title", "กรุณาป้อนชื่อบทความ").not().isEmpty(),
    check("author", "กรุณาป้อนชื่อผู้เขียน").not().isEmpty(),
  ],
  blogController.submitForm
);

module.exports = router;
