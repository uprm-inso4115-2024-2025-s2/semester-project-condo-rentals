const request = require("supertest");
const app = require("../server"); // Import your Express server

describe("Property API Tests", () => {
    let propertyId;
    const testOwnerId = "5372e2ea-9260-4db8-991a-e7dfbf1d53bd"; // testing_db@upr.edu user id

    /** CREATE Property */
    it("Should add a new property", async () => {
        const res = await request(app).post("/properties").send({
            owner_id: testOwnerId,
            title: "Test Property",
            description: "A beautiful test property",
            price: 1500,
            location: "Test City",
            is_available: true
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body[0]).toHaveProperty("id");

        propertyId = res.body[0].id; // Store property ID for later tests
    });

    /** GET All Properties */
    it("Should retrieve all properties", async () => {
        const res = await request(app).get("/properties");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    /** UPDATE Property */
    it("Should update a property", async () => {
        const res = await request(app).put(`/properties/${propertyId}`).send({
            price: 1800,  // Changing price
            is_available: false
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0].price).toEqual(1800);
        expect(res.body[0].is_available).toEqual(false);
    });

    /** DELETE Property */
    it("Should delete a property", async () => {
        const res = await request(app).delete(`/properties/${propertyId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Property deleted successfully");
    });
});
