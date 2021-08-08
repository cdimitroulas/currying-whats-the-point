export type User = {
  id: number;
  email: string;
}

export type ILogger = {
  info: (msg: string) => void;
}

export type IUserRepository = {
  fetchUser: (userId: number) => Promise<User>;
  saveUserChanges: (user: User) => Promise<void>;
};


type Dependencies = {
  logger: ILogger;
  userRepository: IUserRepository;
}

// Very basic implementation, just for illustration
const checkEmailFormat = (email: string): void => {
  if (!email.includes("@")) {
    throw new Error("Not a valid email");
  }
};

export const updateUserEmail = (
  dependencies: Dependencies
) => async (userId: number, newEmail: string): Promise<User> => {
  const { logger, userRepository } = dependencies;

  checkEmailFormat(newEmail);
  const user = await userRepository.fetchUser(userId);
  const updatedUser = { ...user, email: newEmail };
  await userRepository.saveUserChanges(updatedUser);
  logger.info(`Email updated for user with ID ${user.id}`);
  return updatedUser;
}

