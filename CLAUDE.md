Things to always do:

- Always run `npm run test` after completing updates on the codebase to verify changes pass formatting and ts checks.
- If running `npm run test` fails because of formatting or lint issues, run `npm run dev:fix` to fix those issues automatically. If they can't be automatically fixed, fix the issues manually.
- All strings rendered in React need to support i18n and should be added in the messages folder for the supported languages. 