const express = require("express");
const authController = require("../../controllers/auth-controller");
const { userSignUpSchema, userSignInSchema } = require("../../models/User");
// const validateId = require("../../middlewares");
const isEmptyBody = require("../../helpers");
const validateBody = require("../../middlewares/validateBody");

const authRouter = express.Router();

const userSignUpValidate = validateBody(userSignUpSchema);
const userSignInValidate = validateBody(userSignInSchema);
authRouter.post(
    "/register",
    isEmptyBody,
    userSignUpValidate,
    authController.signup
);
authRouter.post(
    "/signin",
    isEmptyBody,
    userSignInValidate,
    authController.signin
);
module.exports = authRouter;
