// Register babel
require('babel-register');

require('./fixtures');

var HulkMailer = require('hulk-mailer');
HulkMailer.init(require('./config').email_providers);

require('./controllers/mailControllerTest');
