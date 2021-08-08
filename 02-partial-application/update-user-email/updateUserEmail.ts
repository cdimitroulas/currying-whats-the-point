export type User = {
  id: number;
  email: string;
}

export type ILogger = {
  info: (msg: string) => void;
}

export type IUserRepository = {
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
) => async (user: User, newEmail: string): Promise<void> => {
  checkEmailFormat(newEmail);

  const updatedUser = { ...user, email: newEmail };
  await dependencies.userRepository.saveUserChanges(updatedUser);
  dependencies.logger.info(`Email updated for user with ID ${user.id}`);
}

