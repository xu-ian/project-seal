# SEAL-8

## Front-end:

### index.js (client/src/components/ToggleForm)

- path: “/assigntest”
- debugger that displays a test version for SEAL-8 that is isolated from courses

### Deliverable.js (/client/src/components/ToggleForm/toggle-components)

- component that instructs index.js on how to construct a deliverable and displays it, given a json object of the same name

### registration.js (/client/src/components/ToggleForm/toggle-components)

- component that instructs index.js on how to construct a list of deliverables and displays it, given a list of deliverables

### form.js (/client/src/components/ToggleForm/toggle-components)

- component that instructs index.js on how to create a card containing a form and displays it
- form is currently used to make a deliverable object, but can be changed via index.js

### t-button.js (/client/src/components/ToggleForm/toggle-components)

- component that instruct index.js on how to create a toggle button and displays it
- toggle button is current used to control the display of the form, but can be changed via index.js


## Back-end:

### content.js (server/routes)

- handles POST and GET requests
- GETs all deliverables from backend and return the list of deliverables
- POST one deliverable from the form to the backend
