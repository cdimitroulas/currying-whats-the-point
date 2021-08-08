declare const updateUserEmail: (
  userId: number
) => (email: string) => Promise<User>;

type User = {
  id: number;
  email: string;
  type: "customer" | "admin";
};

type AdminUser = User & { type: "admin" };
type CustomerUser = User & { type: "customer" };

type CustomerActions = {
  updateUserEmail: (email: string) => Promise<User>;
};

type AdminActions = {
  updateUserEmail: (userId: number) => (email: string) => Promise<User>;
};

// Overloaded function which had a different return type based on the
// type of user passed in.
function getPermittedActions(user: CustomerUser): CustomerActions;
function getPermittedActions(user: AdminUser): AdminActions;
function getPermittedActions(user: User): CustomerActions | AdminActions {
  switch (user.type) {
    case "customer":
      return {
        // Using partial application, we "bake" in the customer's
        // user ID into the `updateUserEmail` function.
        updateUserEmail: updateUserEmail(user.id)
      };

    case "admin":
      return {
        updateUserEmail
      };
  }
}

declare const admin: AdminUser;
const permittedAdminActions = getPermittedActions(admin);

// Admin can update the email on any account, as we wanted
permittedAdminActions.updateUserEmail(1234)("new-email@test.com");

declare const customer: CustomerUser;
const permittedCustomerActions = getPermittedActions(customer);

// Customer doesn't even have the option of passing a customer ID.
// Their own ID is "baked" in to the function, which prevents any
// security concern.
permittedCustomerActions.updateUserEmail("new-email@test.com");

// The type system prevents us from trying to pass a customer ID
// in the same we did for the admin user:
permittedCustomerActions.updateUserEmail(1234)("new-email@test.com"); // Type error!
