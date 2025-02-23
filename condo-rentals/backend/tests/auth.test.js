const request = require("supertest");
const app = require("../server");

describe("Auth Endpoints", () => {
    it("should register a user", async () => {
        const res = await request(app).post("/auth/register").send({
            email: "thisIsAGoodEmail@gmail.com",
            password: "thisIsAGoodPassword123!",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("user");
    });

    it("should not register a user due to weak password", async () => {
        const res = await request(app).post("/auth/register").send({
            email: "thisIsAGoodEmail@gmail.com",
            password: "weakpassword",
        });

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("error");
    });


    it("should login a user", async () => {
        const res = await request(app).post("/auth/login").send({
            email: "testing_db@upr.edu",
            password: "testingDB123",
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("session");
    });
});
