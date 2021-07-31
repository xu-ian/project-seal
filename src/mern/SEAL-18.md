# SEAL-18

- Allow service providers to write offers & discounts
- Allow user to view all the offers and comment to an offer

## Packages Installed:

- axios
- mongoose

## Front End:

### OfferViewer.js(/client/src/components/Offers)

- path:"/offers/1/"
- List all the offers
- Allow user to click to see specific offer


### Offer.js(client/src/components/Offers)

- path:"/offers/offer"
- Displays the specific offer

## Back End:

### offers.js (server/routes)

- route: "/offers"
- Handle offer endpoints

### offercomments.js (server/routes)

- Handle offer comment endpoints


