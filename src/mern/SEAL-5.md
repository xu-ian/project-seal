# SEAL-5 (Messaging Backend)

## `/getContacts`
Input:
```
{
	userID: userID
}
```
Output:
```
{
	status: statusCode
	contacts: [userID, userID, userID,...]
}
```
## `/addContact`
Input:
```
{
    recieverID: userID,
    newContactID: userID
}
```
Output:
```
{
    status: statusCode
}
```
## `/sendMessage`
Input:
```
{
	messageText: messageText,
	recieverID: userID,
	senderID: userID
}
```
Output:
```
{
	status: statusCode
}
```
## `/editMessage`
Input:
```
{
	messageText: messageText,
	messageID: messageID
}
```
Output:
```
{
	status: statusCode
}
```
## `/getConversation`
Input:
```
{
	recieverID: userID
	senderID: userID
}
```
Output:
```
{
	status: statusCode
	conversation: [
		{
			messageID: messageID,
			messageText: messageText,
			timestamp: timestamp
		}
	]
}
```
