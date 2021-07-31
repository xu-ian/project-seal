# SEAL-11
- Allow instructor to write feedback to a deliverable
- Allow user to view deliverable

## Front End:

### feedback.js (\client\src\components\ToggleForm\toggle-components)

- path: "/assigntest/:id/feedback"
- Allow user to view feedback for a specific deliverable id

## Back End:

### feedback.js (server\routes)

- route: "/feedback"
- Handle feedback's endpoints