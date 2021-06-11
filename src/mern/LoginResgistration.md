# SEAL-1 & SEAL-2

## Package Installed:
- @material-ui
- fontsource-roboto
- axios

## Front-end:

### select.js (client/src/components)

- path: “/”
- select to Login/Signup page

### Login.js (/client/src/components)

- path: “/signin”
- take user input and send a POST request to “/users/login”

### registration.js (/client/src/components)

- path: “/signup”
- take user input and send POST request to “users/register”

## Back-end:

### user.js (server/routes)

- handle POST requests from Login.js and egistration.js, then send user info to database
- hash password

