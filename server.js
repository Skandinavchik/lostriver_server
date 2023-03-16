const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app/app');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE)
    .then(() => {console.log('DB connection successful! 👍')});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});