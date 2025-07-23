import express from "express";
import {
  userRegister,
  userLogin,
  userDelete,
  userEdit,
  userList,
  userLogout,
} from "../controllers/userController.js";
import isUser from "../middleware/userAuth.js";

const userRoute = express.Router();

userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.post("/logout", isUser, userLogout);
userRoute.delete("/delete/:userId", isUser, userDelete);
userRoute.put("/edit/:userId", isUser, userEdit);
userRoute.get("/userList", isUser, userList);

export default userRoute;
