import config from 'config';
import * as express from './express';
import logger from './logger';
import HulkMailer from 'hulk-mailer';

const start = () => {
  const port = config.get('port');

  const appStartMessage = () => {
    const env = process.env.NODE_ENV;
    logger.info(`App Name : ${config.title}`);
    logger.info(`Environment  : ${env || 'development'}`);
    logger.info(`App Port : ${port}`);
    logger.info(`Process Id : ${process.pid}`);

    if (config.https) {
      logger.info('HTTPs : on');
    }
  };
  
  const app = express.init();

  HulkMailer.init(require('config').email_providers);

  app.listen(port, appStartMessage);
};

export default start;
