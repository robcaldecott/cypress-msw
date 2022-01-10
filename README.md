# Cypress MSW Issue

```
npm install
```

Start the app:

```
npm run dev
```

Open another console window and start Cypress:

```
npx cypress open
```

Test will fail because `window.msw` is `undefined` yet it is there
in the browser.
