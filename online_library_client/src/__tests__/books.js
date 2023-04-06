import {customFetch} from "../utils/customFetch";
import {getServerResponseData, addBookServerResponseData, editBookServerResponseData} from "../utils/genericUtils";

describe("Books CRUD operations tests", () => {
    async function loginUser() {
        const {token, user_id} = (await (await customFetch('POST', {
            username: 'Stamat',
            password: '12345678'
        }, 'account', 'login', null)).json());
        return [token, user_id];
    }

    describe("Create books tests", () => {
        test("Successful book creation", async () => {
            const [token, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'This is a test book',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: user_id
            }, token);
            expect(data).toBe('Book added successfully!');
        });

        test("Invalid title", async () => {
            const [token, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'ab',
                description: 'This is a test book',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: user_id
            }, token);
            expect(data[0][0]).toBe('The title is too short!');
        });

        test("Invalid description", async () => {
            const [token, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'ab',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: user_id
            }, token);
            expect(data[0][0]).toBe('The description is too short!');
        });

        test("Invalid genre", async () => {
            const [token, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'This is a test book',
                genre: 'unknown',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: user_id
            }, token);
            expect(data[0][0]).toBe('"unknown" is not a valid choice.');
        });

        test("Invalid image url", async () => {
            const [token, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'This is a test book',
                genre: 'fiction',
                image_url: 'unknown',
                creator_id: user_id
            }, token);
            expect(data[0][0]).toBe('Enter a valid URL.');
        });

        test("Invalid creator id", async () => {
            const [token] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'This is a test book',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: 'unknown'
            }, token);
            expect(data[0][0]).toBe('A valid integer is required.');
        });

        test("Invalid token", async () => {
            const [, user_id] = await loginUser();
            const data = await addBookServerResponseData({
                title: 'TestBook',
                description: 'This is a test book',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                creator_id: user_id
            }, 'unknown');
            expect(data.detail).toBe('Invalid token.');
        });
    });

    describe("Read books tests", () => {
        test("Get collection of all books", async () => {
            const response = await customFetch('GET', undefined, 'core', 'get-books', null);
            const data = await response.json();
            expect(typeof data).toBe('object');
        });

        test("Get user books", async () => {
            const [token, user_id] = await loginUser();
            const response = await customFetch('POST', {user_id}, 'core', `get-user-books/${user_id}`, token);
            const data = await response.json();
            expect(typeof data).toBe('object');
        });

        test("Get details of book", async () => {
            const data = await getServerResponseData('GET', undefined, 'core', `details-book/${5}`, null);
            expect(data.title).toBe('Superman');
            expect(data.description).toBe('Very nice book!');
            expect(data.genre).toBe('fiction');
            expect(data.genre).toBe('fiction');
            expect(data.imageUrl).toBe('https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg');
        });
    });

    describe("Update book tests", () => {
        test("Successful book edit", async () => {
            const [token, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'very nice book!',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: user_id
            }, token, 5);
            expect(data).toBe('Book updated successfully!');
        });

        test("Invalid title", async () => {
            const [token, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'ab',
                description: 'very nice book!',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: user_id
            }, token, 5);
            expect(data[0][0]).toBe('The title is too short!');
        });

        test("Invalid description", async () => {
            const [token, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'ab',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: user_id
            }, token, 5);
            expect(data[0][0]).toBe('The description is too short!');
        });

        test("Invalid genre", async () => {
            const [token, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'very nice book!',
                genre: 'unknown',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: user_id
            }, token, 5);
            expect(data[0][0]).toBe('"unknown" is not a valid choice.');
        });

        test("Invalid image url", async () => {
            const [token, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'very nice book!',
                genre: 'fiction',
                image_url: 'unknown',
                creator_id: user_id
            }, token, 5);
            expect(data[0][0]).toBe('Enter a valid URL.');
        });

        test("Invalid owner of book", async () => {
            const [token] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'very nice book!',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: 1
            }, token, 5);
            expect(data).toBe('You can edit only your own books!');
        });

        test("Invalid token", async () => {
            const [, user_id] = await loginUser();
            const data = await editBookServerResponseData({
                title: 'Superman',
                description: 'very nice book!',
                genre: 'fiction',
                image_url: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Superman_Man_of_Steel.jpg',
                creator_id: user_id
            }, 'unknown', 5);
            expect(data.detail).toBe('Invalid token.');
        });

    });

    describe("Delete book tests", () => {
        test("Successful deletion of book", async () => {
            const [token] = await loginUser();
            const data = await getServerResponseData('DELETE', undefined, 'core', `delete-book/${5}`, token);
            expect(data).toBe('Book deleted successfully!');
        });

        test("Invalid owner of book", async () => {
            const [token] = await loginUser();
            const data = await getServerResponseData('DELETE', undefined, 'core', `delete-book/${17}`, token);
            expect(data).toBe('You can delete only your own books!');
        });

    });
});
