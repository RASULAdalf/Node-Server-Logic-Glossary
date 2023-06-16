const express = require('express');
const mongooseDriver = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');

const port = process.env.SERVER_PORT || process.env.PORT;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

const wordRouter = require('./routes/WordRoute');
const historyRouter = require('./routes/HistoryRoute');
const voiceRouter = require('./routes/VoiceInputRoute');

mongooseDriver.connect(process.env.MONGO_URL);
app.listen(port,()=>{
        console.log(`App is running on port : ${port}`)

});

app.use('/api/v1/word',wordRouter);
app.use('/api/v1/history',historyRouter);
app.use('/api/v1/voice',voiceRouter);