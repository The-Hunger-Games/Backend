const supertest = require("supertest");

const app = require("../functions/server")();
const parentRouter = require("../router");

app.use(parentRouter);

describe("GET /", () => {
  it("should return 200 OK", () => {
    return supertest(app).get("/").expect(200);
  });
});
