import jwt from "jsonwebtoken";
import userModel from "../../DB/model/User.model.js";

// ====================authorization===================
export const auth = async (req, res, next) => {
  console.log('hello');
  const { authorization } = req.headers;
  
  if (!authorization.startsWith(process.env.BEARER_KEY)) {
    return res.status(400).json({ message: "authorization is required or In-valid Beare key" });
  }

  const token = authorization.split(process.env.BEARER_KEY)[1]
console.log('lol');
  if (!token) {
    return (new Error("token is required", { cause: 400 }))
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE);

    if (!decoded?.id) {
    console.log('kkklklpkp');

      return next(new Error("In-valid Payload", { cause: 400 }))
    }
    console.log('kkkkkkkkk');

    const user = await userModel.findById(decoded.id); // {} null
    if (!user) {
      return next(new Error("Not register account", { cause: 401 }))
    }
    req.user = user;
console.log('kk');
    return next();

  } catch (error) {
    //Token expired
    if (error.message === "jwt expired") {
      res.status(401).json({ message: "Invalid account" });
    } 
  }
};
// ====================isUserLogged&NotDeleted===================
export const userLoggedIn = async (req, res, next) => {
  if (req.user.isOnline && req.user.isLoggedIn && req.user.confirmEmail) {
    if (req.user.isDeleted) {

      return next(new Error("This email is deleted Please login again", { cause: 401 }));

    } else {
      req.user = req.user;
      return next();
    }
  } else {
    return next(new Error("Please login first", { cause: 401 }));
  }
};
