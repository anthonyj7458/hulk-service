import chai from 'chai';
import httpMocks from 'node-mocks-http';
import EventEmitter from 'events';
import MailController from '../../app/controllers/mailController';

describe('Mail Controller', function() {

  describe('#send()', function() {

    it('should respond with Status: 200 OK, Result: Sent', function(done) {

      const {req, res} = httpMocks.createMocks({
        method: 'POST',
        url: '/mail/send',
        body: {
          "from": "anthonyj7458@gmail.com",
          "to": "anthonyj7458@gmail.com",
          "subject": "Hello Joseph Anthony",
          "text": "Congratulations Joseph Anthony, you just sent an email!"
        }
      }, {eventEmitter: EventEmitter});

      res.on('end', function() {

        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(200);
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      MailController.send(req, res);
    });

  });
});