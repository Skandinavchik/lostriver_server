const express = require('express');
const morgan = require('morgan');

const waterRouter = require('../routes/waterRoutes');
const userRouter = require('../routes/userRoutes');


const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use((req, res, next) => {
    
    next();
});

app.use('/api/v1.0/waters', waterRouter);
app.use('/api/v1.0/users', userRouter);

module.exports = app;