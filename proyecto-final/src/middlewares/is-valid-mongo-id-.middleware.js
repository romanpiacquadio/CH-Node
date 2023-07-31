import { isValidObjectId } from "mongoose";

export const isValidMongoId = (paramsId) => {
  return (req, res, next) => {
    const urlId = req.params[`${paramsId}`];
    const url = req.originalUrl;
    if(!isValidObjectId(urlId)) {
      return res.status(400).send({ message: `Bad request on URL: ${url}`})
    }

    next();
  }
}