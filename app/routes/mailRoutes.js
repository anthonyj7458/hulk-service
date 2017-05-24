import express from 'express';
import MailController from '../controllers/mailController';

const initMailRoutes = () => {
  const mailRoutes = express.Router();

  mailRoutes.post('/send', MailController.send);
  mailRoutes.post('/:providerName/send', MailController.sendByProvider);

  return mailRoutes;
};

export default initMailRoutes;
