const HttpError = require("../helpers/HttpErrors");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");
const jwt = require("jsonwebtoken");

const { User } = require("../models/User");

const { JWT_SECRET } = process.env;

const validateAuth = async (req, res, next) => {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        throw HttpError(401);
    }
    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = User.findById(id);
        if (!user) {
            throw HttpError(401);
        }
        req.user = user;
    } catch (error) {
        next(HttpError(401));
    }
};

module.exports = ctrlWrapper(validateAuth);
