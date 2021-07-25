const coursesRouter = require('./courses');
const messagesRouter = require('./messages');
// const offersRouter = require('./offers');

const endpoints = {
    courses: '/courses/',
    messages: '/messages/'  
    // offers: '/offers/'
}

module.exports = (app) => {
    app.use(endpoints.courses, coursesRouter);
    app.use(endpoints.messages, messagesRouter);
    // app.use(endpoints.offers, offersRouter);
}