import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import logger from './logger';
import initRoutes from './../app/routes';
import Responder from './expressResponder';

const app = express();

function initMiddleware() {
  app.set('showStackError', true);
  app.enable('jsonp callback');
  app.use(morgan('combined', { stream: logger.stream }));

  if (process.env.NODE_ENV === 'development') {
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.locals.cache = 'memory';
  }

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
}

function initErrorRoutes() {
  app.use((err, req, res, next) => {
    if (!err) {
      next();
    }
    return Responder.operationFailed(res, err);
  });
}

export function init() {
  initMiddleware();
  initRoutes(app);
  initErrorRoutes();

  return app;
}
