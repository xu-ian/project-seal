const coursesRouter = require('./courses');

const endpoints = {
    courses: '/courses/',
}

module.exports = (app) => {
    app.use(endpoints.courses, coursesRouter);
}