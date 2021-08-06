# SEAL-51 (Offers)

## `/getOffers`

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
	offers: [offer object, offer object, offer object,...]
}
```

## `/createOffer`

Input:
```
{
	messageText: messageText,
	userID: userID,
}
```
Output:
```
{
	status: statusCode
	offer: offer object
}
```

## `/deleteOffer`

Input:
```
{
	offerid: offerid
}
```
Output:
```
{
	status: statusCode
}
```

## `/editOffer`

Input:
```
{
	offerid: offerid
	messageText: messageText,
}
```
Output:
```
{
	status: statusCode
}
```
