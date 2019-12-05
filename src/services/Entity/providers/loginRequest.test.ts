/* This file is responsible for testing the loginRequest provider. */
import {singleUser} from "../../../utils/__mocks__/queryReturns";
import {HTTP404Error} from "../../../utils/httpErrors";
import * as Provider from "./loginRequest";

// we will be mocking this object by providing fake data
jest.mock("../../../utils/query.ts");

// the name of the module to describe with these tests
describe("query", () => {
    // The test description and the function to call. Be careful with async.
    test("loginRequest: test no users", async () => {
        // get get the result of what we are testing. the mocked q should 'know' this query
        // assert that the request raises an error
        await expect(Provider.loginRequest("zero", "zero")).rejects.toEqual(new HTTP404Error(
            "Could not find entity(zero) with specified password(zero)",
        ));
    });
    test("loginRequest: test single user", async () => {
        // get get the result of what we are testing. the mocked q should 'know' this query.
        const result = await Provider.loginRequest("one", "one");
        // assert that the result returns the correct thing
        expect(result).toEqual(singleUser.rows[0]);
    });
});
