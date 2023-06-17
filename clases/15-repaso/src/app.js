const express = require('express');
const cors = require('cors');
const displayRoutes = require('express-routemap');
const handlebars = require('express-handlebars');
const { NODE_ENV, PORT, API_VERSION } = require('./config/config');
const { mongoDBConnection } = require('./db/mongo.config');


class App {
  app;
  env;
  port;
  server;

  constructor(routes) {
    this.app = express();
    this.env = NODE_ENV || 'develop';
    this.port = PORT || 8000;

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.connectDB();
    //this.initHandleBars();
  }

  getServer() {
    return this.app;
  }

  closeServer(done) {
    this.server = this.app.listen(this.port, () => {
      done()
    });
  }

  async connectDB() {
    await mongoDBConnection(); 
  }

  initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/static', express.static(`${__dirname}/public`));
  }

  initializeRoutes(routes){
    routes.forEach(route => {
      this.app.use(`/api/${API_VERSION}`, route.router)
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      displayRoutes(this.app);
      console.log(`===================================`);
      console.log(`======== ENV: ${this.env} =========`);
      console.log(`App listening on port ${this.port}`);
      console.log(`===================================`);
    })
  }

  initHandleBars() {
    this.app.engine("handlebars", handlebars.engine());
    this.app.set("views", __dirname, + "/views");
    this.app.set("view engine", "handlebars");
  }
}

module.exports = App