const express = require("express");
const logger = require("morgan");
const http = require("http");
const request = require("request");
const Pins = require("./models/Pins");
const requestPromise = require("request-promise-native");
const axios = require("axios");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use("/api", require("./routes/pins").router);
app.set("port", 3000);

describe("Router Testing", () => {
  let server;

  beforeAll(() => {
    server = http.createServer(app);
    server.listen(app.get("port"));
  });

  afterAll(() => {
    server.close();
  });

  describe("GET Method", () => {
    it("should return 200", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callback => {
        callback(false, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      });
    });

    it("should return 500", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "find").and.callFake(callback => {
        callback(true, data);
      });

      request.get("http://localhost:3000/api", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe("GET Method with parameter", () => {
    it("should return single pin by id", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        callback(false, data);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(200);
        expect(JSON.parse(response.body)).toEqual([{ id: 1 }]);
        done();
      });
    });

    it("should return 500", done => {
      const data = [{ id: 1 }];
      spyOn(Pins, "findById").and.callFake((id, callback) => {
        callback(true, data);
      });

      request.get("http://localhost:3000/api/1", (error, response, body) => {
        expect(response.statusCode).toBe(500);
        done();
      });
    });
  });

  describe("POST Method", () => {
    it("should return 200", done => {
      spyOn(requestPromise, "get").and.returnValue(
        Promise.resolve(
          `<title>Platzi</title><meta name="description" content="Platzi rules">`
        )
      );

      spyOn(Pins, "create").and.callFake((args, callback) => {
        callback(false, {});
      });

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets: [{ url: "http://platzi.com" }]
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });

    it("should return pdf", done => {
      spyOn(Pins, "create").and.callFake((pins, callback) => {
        callback(false, {});
      });

      axios
        .post("http://localhost:3000/api", {
          title: "title",
          author: "author",
          description: "description",
          assets: [{ url: "http://platzi.pdf" }]
        })
        .then(res => {
          expect(res.status).toBe(200);
          done();
        });
    });


  });
});
