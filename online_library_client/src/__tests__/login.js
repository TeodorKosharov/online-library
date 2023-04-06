import {customFetch} from "../utils/customFetch";

describe("Login functionality tests", () => {
    test("Correct credentials", async () => {
        const response = await customFetch('POST', {username: 'Stamat', password: '12345678'}, 'account', 'login', null)
        expect(response.status).toBe(200);
    });

    test("Incorrect password", async () => {
        const response = await customFetch('POST', {username: 'Stamat', password: '123'}, 'account', 'login', null)
        expect(response.status).toBe(403);
    });

    test("Incorrect credentials", async () => {
        const response = await customFetch('POST', {username: 'John', password: '123'}, 'account', 'login', null)
        expect(response.status).toBe(404);
    });
});