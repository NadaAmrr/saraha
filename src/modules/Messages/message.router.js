import * as messageController from "./controller/message.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { Router } from "express";
import { auth, userLoggedIn } from "../../middleware/auth.js";
const router = Router();

router.post(
  "/",
  auth,
  userLoggedIn,
  asyncHandler(messageController.sendMessage)
);
router.get(
  "/",
  auth,
  userLoggedIn,
  asyncHandler(messageController.getUserMessages)
);
router.delete(
  "/:msgId",
  auth,
  userLoggedIn,
  asyncHandler(messageController.deleteMessages)
);

export default router;
