# Currying - What's the point?

This repo contains the code which is mentioned in my blog post series about currying.

Before doing anything, you will need to run `npm install`.

In case you want to play around with the code, here are some commands you can use:
- `npm run functionCompositionUncurried` - will run the code in 01-function-composition/uncurried.ts
- `npm run functionCompositionCurried` - will run the code in 01-function-composition/curried.ts
- `npm run partialApplicationBasics` - will run the code in 02-partial-application/basics.ts
- `npm run partialApplicationExpress` - will run the express app in 02-partial-application/update-user-email/usage. You can call the relevant endpoint using `curl -XPOST localhost:8080/users/1/email -H "Content-Type: application/json" -d '{"email":"new-email@example.com"}'`
