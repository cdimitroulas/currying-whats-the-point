/**
 * Here are some unit tests for the updateUserEmail function. This is a good example of why
 * dependency injection is great, as we can easily test all the criteria of our function.
 */
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { updateUserEmail } from "./updateUserEmail";

chai.use(chaiAsPromised);
const { assert } = chai;

describe("updateUserEmail", () => {
  it("fails if the email is invalid", async () => {
    // Arrange
    const user = { id: 1, email: "test@example.com" };
    const logger = { info: () => {} };
    const userRepository = {
      fetchUser: async () => user,
      saveUserChanges: async () => undefined
    };
    const dependencies = { logger, userRepository };

    // Act
    const promise = updateUserEmail(dependencies)(user.id, "invalid-email");

    // Assert
    await assert.isRejected(promise, "Not a valid email");
  });

  it("saves the user with the updated email", async () => {
    // Arrange
    const user = { id: 1, email: "test@example.com" };
    const logger = { info: () => {} };
    const userRepository = {
      fetchUser: async () => user,
      saveUserChanges: sinon.mock().resolves(undefined)
    };
    const dependencies = { logger, userRepository };
    const newEmail = "test2@example.com";

    // Act
    await updateUserEmail(dependencies)(user.id, newEmail);

    // Assert
    assert.equal(
      userRepository.saveUserChanges.calledOnce,
      true,
      "Expecte userRepository.saveUserChanges to be called once"
    );

    assert.deepEqual(userRepository.saveUserChanges.getCall(0).args, [
      { ...user, email: newEmail }
    ]);
  });

  it("logs some information that a user changed their email", async () => {
    // Arrange
    const user = { id: 1, email: "test@example.com" };
    const logger = { info: sinon.mock() };
    const userRepository = {
      fetchUser: async () => user,
      saveUserChanges: async () => undefined
    };
    const dependencies = { logger, userRepository };
    const newEmail = "test2@example.com";

    // Act
    await updateUserEmail(dependencies)(user.id, newEmail);

    // Assert
    assert.equal(
      logger.info.calledOnce,
      true,
      "Expecte logger.info to be called once"
    );

    assert.deepEqual(logger.info.getCall(0).args, [
      "Email updated for user with ID 1"
    ]);
  });
});
