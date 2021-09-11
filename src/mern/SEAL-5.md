# SEAL-5 

## Packages Installed:

- axios
- mongoose

## Front End:

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

## Back End:

# SEAL-5 (Messaging Backend)

## Models

### Message.js(server/models/Message)

Stores all messages that are sent between users

Structure for a Message
- String: Contents of message
- ObjectID: User who sent message

### Relation.js(server/models/Relation)

Stores all contact pairs and their Conversations as a List of Messages

Structure for a Relation
- Array-ObjectID-Size=2: Pair of users who are contacts
- Array-ObjectID: Conversation between the users as a list of Messages

## Endpoints

### conversations.js(server/routes/conversaions)

/messages/getContacts/:id
- Gets all Relations where :id is one of the users

### messages.js(server/routes/messages)

/messages/getMessages/:mid/:uid
- Gets a conversation by the two participants of the conversation :mid and :uid

/messages/username/:id
- Gets the name of a user from their :id

/messages/specific/:id
- Gets the message with :id

/messages/addMessage/:body/:mid/:uid
- Adds a message with contents :body to a conversation with participants :mid, :uid

/messages/updateMessage/:id/:body
- Updates the message :id with the new body :body