# Project SEAL Documentation Overview

## Packages Installed:

###Client Side(Front End):

- @material-ui/core
- @material-ui/icons
- axios
- classnames
- fontsource-roboto
- jwt-decode
- react-redux
- redux
- redux-thunk

###Server Side(Back End):

- body-parser
- concurrently
- bycryptjs
- express-validator
- jsonwebtoken
- mongoose
- mongoose-extend-schema
- nodemon
- passport
- passport-jwt
- is-empty
- prop-types
- multer

## Links to documentation

- Links Here once reordered.
-[](SEAL 1 & 2)
-[](SEAL 3)
-[](SEAL 4)
-[](SEAL 5)
-[](SEAL 7)
-[](SEAL 8)
-[](SEAL 12)
-[](SEAL 16)
-[](SEAL 19)
-[](SEAL 38)

## Front End:

## SEAL 1 & 2:

### select.js (client/src/components)

- path: “/”
- select to Login/Signup page

### Login.js (/client/src/components)

- path: “/signin”
- take user input and send a POST request to “/users/login”

### registration.js (/client/src/components)

- path: “/signup”
- take user input and send POST request to “users/register”
- Note: password requires at least 8 characters

## SEAL 3:

### companyProfile.js(/client/src/components/companyProfile)

- path:"/list"
- View a list of all the company profile created. 

### createCompanyProfile.js(/client/src/components/companyProfile)

- path:"/create"
- Create new company profile. 

### editCompanyProfile.js(/client/src/components/companyProfile)

- path:"/edit/:id"
- Edit id-specified company profile. 

### myCompanyProfile.js(/client/src/components/companyProfile)

- path:"/view/:id"
- Display the component content of id-specified company profile. 

## SEAL 4:

### PostViewer.js(/client/src/components)

- path:"/posts/1"
- View posts
- Navigate between pages of posts
- Add posts(imported from PostWrite.js)
- View posts in depth(imported from PostViewerSpecific.js)

### PostViewerSpecific.js(/client/src/components)

- path:"/posts/post"
- View selected posts
- View comments related to selected post
- Add comment to post(imported from CommentWrite.js)

### PostWrite.js(/client/src/components)

- exported into PostViewer.js
- Write a post body
- Select tags to add to post
- Submit a request to add post into database

### CommentWrite.js(/client/src/components)

- exported into PostViewerSpecific.js
- Write a comment body
- Submit a request to add comment into database

### Post.js(/client/src/components)

- exported into PostViewer.js and PostViewerSpecific.js
- Displays a post.

### Comment.js(/client/src/components)

- exported into PostViewerSpecific.js
- Displays a comment.

## SEAL 5:

### FriendList.js(/client/src/components/FriendList)

- path:"/friendlist/"
- Contains a list of all contacts
- Each contact leads to a different Conversation(Imported from MessageList)

### MessageBox.js(client/src/components/MessageBox)

- Displays one message in a message box

### MessageInput.js(client/src/components/MessageInput)

- Displays text input box
- Sends a typed message

### MessageList.js(client/src/components/MessageList)

- path:"/friendlist/friendid"
- Displays a list of messages as a conversation between two contacts(Uses MessageBox)
- Adds a message to the conversation(Inported from MessageInput)
- Goes back to Contacts page

## SEAL 7:

## SEAL 8:

## SEAL 12:

### Submit.js(/client/src/components/Submit)

- path:"/submit"
- Read instructions for assignment submission.
- Choose and submit Files for assignment.

## SEAL 16

## SEAL 19

## SEAL 38

- Redirect to a welcome page (Authenticated.js) after user login, that page contains a log out button
- Moves Login.js, registration.js, select.js to Authentication folder under component
- Added actions, reducers and authUtils folders and store.js 

## Back End:

## SEAL 1 & 2:

### user.js (server/routes)

- handle POST requests from Login.js and egistration.js, then send user info to database
- hash password

## SEAL 3:

### company.js(/server/src/routes)

- Handles requests for creating, editing or retrieving company profile in the database. 

## SEAL 4:

### posts.js(/server/src/routes)

- Handles requests for manipulating or retrieving posts in the database from PostWrite.js and PostViewer.js/

### comments.js(/server/src/routes)

- Handles requests for manipulating comments in the database from CommentWrite.js.

## SEAL 5:

## SEAL 7:

## SEAL 8:

## SEAL 12:

### Server Side File Storage(/server/uploads/deliverables)

- Folder to store files uploaded and submitted files in.

### deliverables.js (/server/routes/deliverables)

- Handles requests for retrieving submissions, and adding one or more submissions.

## SEAL 16:

## SEAL 19: