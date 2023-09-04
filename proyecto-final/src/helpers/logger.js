import winston from "winston";
import { NODE_ENV } from "../config/config.js";

const devLogger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()],
});

const prodLogger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "./errors.log",
      level: "error",
    }),
  ],
});

const loggersLevels = {
  production: prodLogger,
  development: devLogger,
};

export function setLogger(req, res, next) {

  req.logger = loggersLevels[`${NODE_ENV}`];

  next();
}