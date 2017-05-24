import chai from "chai";
import httpMocks from "node-mocks-http";
import EventEmitter from "events";
import HulkMailer from "hulk-mailer";
import MailController from "../../app/controllers/mailController";

describe("Mail Controller", function() {

  describe("#send()", function() {
    it("should respond with Status: 200 OK, Result: Sent", function(done) {

      const {req, res} = httpMocks.createMocks({
        method: "POST",
        url: "/mail/send",
        body: {
          "from": "anthonyj7458@gmail.com",
          "to": "anthonyj7458@gmail.com",
          "subject": "Hello Joseph Anthony",
          "text": "Congratulations Joseph Anthony, you just sent an email!"
        }
      }, {eventEmitter: EventEmitter});

      res.on("end", function() {

        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(200);
          chai.expect(body).to.be.a("object");
          chai.expect(body).to.have.keys("success");
          chai.expect(body.success).to.equal(true);
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      MailController.send(req, res);
    });
  });

  describe("#sendByProvider()", function() {
    it("should respond with Status: 400 Bad Request, Result: Not Sent, Invalid Configs", function(done) {
      HulkMailer.removeProvider("thor");
      HulkMailer.addNewProvider({
        "name": "thor",
        "provider": "mandrill",
        "apiKey": "key-incorrect"
      });

      const {req, res} = httpMocks.createMocks({
        method: "POST",
        url: "/mail/thor/send",
        body: {
          "from": "anthonyj7458@gmail.com",
          "to": "anthonyj7458+1@gmail.com",
          "subject": "Hello Joseph Anthony",
          "text": "Congratulations Joseph Anthony, you just sent an email!"
        },
        params: {
          providerName: "thor"
        }
      }, {eventEmitter: EventEmitter});

      res.on("end", function() {

        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(401);
          chai.expect(body).to.be.a("object");
          chai.expect(body).to.have.keys("reason");
          chai.expect(body.reason).to.equal("Configurations for [thor] is forbidden.");
        }
        catch(assertionError) {
          return done(assertionError);
        }
        HulkMailer.removeProvider("thor");
        HulkMailer.addNewProvider({
          "name": "thor",
          "provider": "mandrill",
          "apiKey": "sandboxedkey"
        });
        done();
      });

      MailController.sendByProvider(req, res);
    });

    it("should respond with Status: 200 OK, Result: Sent, Provider: ironman[mailgun]", function(done) {

      const {req, res} = httpMocks.createMocks({
        method: "POST",
        url: "/mail/ironman/send",
        body: {
          "from": "anthonyj7458@gmail.com",
          "to": "anthonyj7458@gmail.com",
          "subject": "Hello Joseph Anthony",
          "text": "Congratulations Joseph Anthony, you just sent an email!"
        },
        params: {
          providerName: "ironman"
        }
      }, {eventEmitter: EventEmitter});

      res.on("end", function() {

        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(200);
          chai.expect(body).to.be.a("object");
          chai.expect(body).to.have.keys("success");
          chai.expect(body.success).to.equal(true);
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      MailController.sendByProvider(req, res);
    });

   it("should respond with Status: 200 OK, Result: Sent, Provider: thor[mandrill]", function(done) {

      const {req, res} = httpMocks.createMocks({
        method: "POST",
        url: "/mail/thor/send",
        body: {
          "from": "anthonyj7458@gmail.com",
          "to": ["anthonyj7458@gmail.com", "anthonyj7458+1@gmail.com"],
          "cc": ["anthonyj7458+2@gmail.com"],
          "subject": "Hello Joseph Anthony",
          "text": "Congratulations Joseph Anthony, you just sent an email!"
        },
        params: {
          providerName: "thor"
        }
      }, {eventEmitter: EventEmitter});

      res.on("end", function() {

        let body = JSON.parse(res._getData()), statusCode = res._getStatusCode();

        try {
          chai.expect(res._getStatusCode()).to.equal(200);
          chai.expect(body).to.be.a("object");
          chai.expect(body).to.have.keys("success");
          chai.expect(body.success).to.equal(true);
        }
        catch(assertionError) {
          return done(assertionError);
        }
        done();
      });

      MailController.sendByProvider(req, res);
    });
  });
});