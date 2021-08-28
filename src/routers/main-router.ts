import express, { Request } from "express";
import { auth } from "../middleware/auth.js";
import db from "../database/database.js";
import { User } from "../types/User.js";

const mainRouter = express.Router();

mainRouter.get("/", auth, (req, res) => {
  res.render("main", { title: "My배민", nickname: req.user.nickname });
});

mainRouter.put("/logout", auth, async (req, res) => {
  try {
    await db.update({ _id: req.user._id }, { $set: { token: "" } });
    return res.json({
      result: 0,
    });
  } catch (err) {
    return res.json({
      result: 1,
    });
  }
});

export default mainRouter;
