const coursesRouter = require('./courses');
const recordRouter = require('./record');

const endpoints = {
    courses: '/courses/'
}

module.exports = (app) => {
    app.use(endpoints.courses, coursesRouter);
    app.use(recordRouter);
}