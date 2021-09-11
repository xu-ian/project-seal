# SEAL-17

## Packages Installed:
- axios
- @material-ui/core
- @material-ui/icons

## Front-end:

### FriendRequests.js(/client/src/components/)

- path:"/friend/view/:id"
- View current login user's friends, friend requests recieved, and friend requests sent. 
- User profile link to whom lies under the above categories. 

### MyUserProfile.js(/client/src/components/UserProfile/)

- path:"/user-profile/view/:id"
- Display the component content of id-specified user profile. 

Update: 
- Enable login user to see the friend status relative to the current viewing user profile. 
- Enable login user to edit profile when viewing own user profile. 
- Enable login user to send friend request, unsend friend request, accept friend request, reject friend request, and unfriend. 



## Back-end:

### friends.js(/server/src/routes)

- Handles requests for retrieving friend status in the database. 
- Handles requests to send friend request, unsend friend request, accept friend request, reject friend request, and unfriend. 


