# SEAL-4

## Packages Installed:

- axios
- mongoose

## Front-end:

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

## Back-end:

### posts.js(/server/src/routes)

- Handles requests for manipulating or retrieving posts in the database from PostWrite.js and PostViewer.js/

### comments.js(/server/src/routes)

- Handles requests for manipulating comments in the database from CommentWrite.js.