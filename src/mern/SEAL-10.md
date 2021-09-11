# SEAL-10

## Packages Installed
-axios
-mongoose
-@material-ui/core
-@material-ui/icons

## Front-End:

### index.js(/client/src/components/CoursePage)

- Allows instructor to create and remove assignment and lesson folders from a course
- Shows all lesson and assignment folders and their contents

### AddAssignment.js(/client/src/components/CoursePage)

- Front end to allow adding assignments to an assignment folder in a course

## Back-End:

### AssignmentFolder.js (/server/src/models)

- Defines what an assignment folder is

### LessonFolder.js (/server/src/models)

- Defines what a lesson folder is

### index.js (/server/src/routes/courses)

- Added endpoint that adds an assignment folder 
- Added endpoint that removes an assignment folder
- Added endpoint that adds a lesson folder
- Added endpoint that removes a lesson folder