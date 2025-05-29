const express = require("express");
const {
  userRegister,
  userLogin,
  userDelete,
  userEdit,
  userList,
} = require("../controllers/userController");

const userRoute = express.Router();
userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.delete("/delete", userDelete);
userRoute.put("/edit", userEdit);
userRoute.get("/userList", userList);

module.exports = userRoute;
