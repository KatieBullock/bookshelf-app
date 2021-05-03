const { expect } = require("chai");

const Users = require("../../models/Users");

describe("models/Users.js", () => {
  describe("find()", () => {
    it("should return the user if a user with a matching user id exists", () => {
      const user = Users.find("2725");
      expect(user).to.deep.equal({
        id: "2725",
        username: "hermione",
        password: "granger",
      });
    });

    it("should return undefined if no user is found", () => {
      const user = Users.find("1234");
      expect(user).to.equal(undefined);
    });
  });

  describe("isValidCredentials()", () => {
    it("should return the user that has the matching username and password", () => {
      const user = Users.findByCredentials("harry", "potter");
      expect(user).to.deep.equal({
        id: "5976",
        username: "harry",
        password: "potter",
      });
    });

    it("should return undefined if no user is found", () => {
      const user = Users.find("harry", "nogo");
      expect(user).to.equal(undefined);
    });
  });
});
