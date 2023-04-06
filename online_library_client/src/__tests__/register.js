import {customFetch} from "../utils/customFetch";
import {getServerResponseData} from "../utils/genericUtils";


describe("Register functionality tests", () => {
    test("Correct credentials", async () => {
        const response = await customFetch('POST', {username: 'NewUser', password: '12345678'}, 'account', 'register', null)
        expect(response.status).toBe(201);
    });

    test("Existing user", async () => {
        const data = await getServerResponseData('POST', {username: 'Stamat', password: '12345678'}, 'account', 'register', null)
        expect(data[0][0]).toBe('A user with that username already exists.');
    });

    test("Invalid username", async () => {
        const data = await getServerResponseData('POST', {username: 'Abc', password: '12345678'}, 'account', 'register', null)
        expect(data[0][0]).toBe('Username too short!');
    });

    test("Invalid password", async () => {
        const data = await getServerResponseData('POST', {username: 'NewUser', password: '123'}, 'account', 'register', null)
        expect(data[0][0]).toBe('Password is too short!');
    });
});