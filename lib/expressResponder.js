import logger from './logger';
import _ from 'lodash';

function Responder() {}

function sendResponse(res, status, body) {
  if(!res.headersSent) {
    if(body)
      return res.status(status).json(body);
    return res.status(status).send();
  }
  else {
    logger.error('Response already sent.');
  }
}

Responder.success = (res, message) => {
  message = _.isString(message) ? { message } : message;
  return sendResponse(res, 200, message);
}

Responder.operationFailed = (res, reason) => {
  const status = reason.status;
  logger.error(reason);
  reason = reason.message || reason;
  return sendResponse(res, status || 400, {reason});
}

export default Responder;