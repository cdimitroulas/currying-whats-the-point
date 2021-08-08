import express from "express";
import {
  ILogger,
  IUserRepository,
  updateUserEmail,
  User
} from "./updateUserEmail";

// Simple logger which logs to the console
const logger: ILogger = {
  info: console.log
};

// Simple in-memory implementation for IUserRepository, with a couple of mock users
const users: Record<string, User> = {
  1: { id: 1, email: "test@example.com" },
  2: { id: 2, email: "test@example.co.uk" }
};

const userRepository: IUserRepository = {
  fetchUser: async (userId) => {
    const user = users[userId];
    if (!user) {
      throw new Error("User not found");
    }
    return user
  },
  saveUserChanges: async user => {
    users[user.id] = user;
  }
};

// We partially apply updateUserEmail, getting back a function with the depenencies baked in
const updateUserEmailWithDeps = updateUserEmail({ logger, userRepository });

// Now we can use our function where it's needed without needing to worry about the
// dependencies.
// Here's an example of it being used in an express handler
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/users/:id/email", async (req, res) => {
  const email: string = req.body.email;
  const userId: number = parseInt(req.params.id);

  const updatedUser = await updateUserEmailWithDeps(userId, email);

  res.status(200).send(updatedUser);
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
})
