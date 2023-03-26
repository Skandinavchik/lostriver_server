const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const waterRouter = require('../routes/waterRoutes');
const userRouter = require('../routes/userRoutes');


const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    
    next();
});
app.set('etag', false);

app.use('/api/v1.0/waters', waterRouter);
app.use('/api/v1.0/users', userRouter);

module.exports = app;