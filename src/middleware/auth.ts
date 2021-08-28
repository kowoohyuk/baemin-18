import { Request } from "express";
import { findByToken } from "../apis/token.js";

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.w_auth;
  findByToken(token, (err, users) => {
    try {
      if (err) return res.redirect("/error");
      if (!users || users.length === 0)
        return res.render("main", { title: "My배민" });
      const user = users[0];
      req.token = token;
      req.user = user;
      next();
    } catch (err) {
      return res.redirect("/error");
    }
  });
};

export { auth };
