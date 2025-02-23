const request = require("supertest");
const app = require("../server");

describe("Booking API Tests", () => {
    let bookingId;
    const testUserId = "5372e2ea-9260-4db8-991a-e7dfbf1d53bd"; // testing_db@upr.edu user id
    const testPropertyId = "cae6e05a-28bc-4746-83d8-86f7cf1c30f6";

    it("Should create a new booking", async () => {
        const res = await request(app).post("/bookings").send({
            renter_id: testUserId,
            property_id: testPropertyId,
            check_in_date: "2025-03-10",
            check_out_date: "2025-03-15",
        });

        expect(res.statusCode).toEqual(200);
        bookingId = res.body.booking.id; // Store booking ID for later tests
    });

    it("Should retrieve all bookings", async () => {
        const res = await request(app).get("/bookings");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body.length).toBeGreaterThan(0);
    });

    /** UPDATE Booking */
    it("Should modify a booking", async () => {
        const res = await request(app).put(`/bookings/${bookingId}`).send({
            check_out_date: "2025-03-16",
            status: "confirmed"
        });

        expect(res.statusCode).toEqual(200);
        expect(res.body.updated_booking[0].check_out_date).toEqual("2025-03-16");
        expect(res.body.updated_booking[0].status).toEqual("confirmed");
    });

    /** DELETE Booking */
    it("Should cancel a booking", async () => {
        const res = await request(app).delete(`/bookings/${bookingId}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("message", "Booking deleted successfully");
    });
});
