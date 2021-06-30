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

