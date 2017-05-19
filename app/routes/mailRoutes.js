import express from 'express';
import MailController from '../controllers/mailController';

const initMailRoutes = () => {
  const mailRoutes = express.Router();

  mailRoutes.post('/send', MailController.send);

  return mailRoutes;
};

export default initMailRoutes;
