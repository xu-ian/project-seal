const coursesRouter = require('./courses');
const messagesRouter = require('./messages');

const endpoints = {
    courses: '/courses/',
    messages: '/messages/'
}

module.exports = (app) => {
    app.use(endpoints.courses, coursesRouter);
    app.use(endpoints.messages, messagesRouter);
}