import HulkMailer from 'hulk-mailer';
import Responder from '../../lib/expressResponder';

export default class MailController {
  static send(req, res) {
    const email = new HulkMailer.Email(req.body);
    HulkMailer.send(email, (error, success) => {
      if(error)
        return Responder.operationFailed(res, error);
      return Responder.success(res, success);
    });
  }
};
