const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db')

const app = express();

connectDB();

app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the MERN library app!' });
});
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(8000, () => {
    console.log('Server listening on port ' + 8000);
});