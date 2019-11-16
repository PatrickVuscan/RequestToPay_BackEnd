/* This file is responsible for testing the userRequest provider. */
import {singleUser} from "../../../utils/__mocks__/queryReturns";
import {HTTP400Error, HTTP404Error} from "../../../utils/httpErrors";
import * as Provider from "./entityByNameRequest";

// we will be mocking this object by providing fake data
jest.mock("../../../utils/query.ts");

// the name of the module to describe with these tests
describe("query", () => {
    // The test description and the function to call. Be careful with async.
    test("getUserByName: test no users", async () => {
        // get get the result of what we are testing. the mocked q should 'know' this query
        // assert that the request raises an error
        await expect(Provider.getEntityByName("zero")).rejects.toEqual(new HTTP404Error(
            "Found no users with his username: zero.  Query result: [object Object]",
        ));
    });
    test("getUserByName: test single user", async () => {
        // get get the result of what we are testing. the mocked q should 'know' this query.
        const result = await Provider.getEntityByName("one");
        // assert that the result returns the correct thing
        expect(result).toEqual(singleUser.rows[0]);
    });
    test("getUserByName: test more than 1 user", async () => {
        // get get the result of what we are testing. the mocked q should 'know' this query
        // assert that the request raises an error
        await expect(Provider.getEntityByName("two")).rejects.toEqual(new HTTP400Error(
            "Found multiple users with his username: two.  Query result: [object Object]",
        ));
    });
});