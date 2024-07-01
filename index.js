require('dotenv').config();
const { getuser, getusers, insertuser, insertusers, updateuser, updateusers, deleteuser, deleteusers } = require('./apiMethods.js');
const express = require('express');
const app = express();
const port = process.env.PORT;

app.use(express.json()); // for parsing application/json

app.get('/', (request, response) => {
    response.json({ info: 'Welcome to DB' });
});

app.get('/getuser', getuser);
app.get('/getusers', getusers);
app.post('/insertuser', insertuser);
app.post('/insertusers', insertusers);
app.put('/updateuser', updateuser);
app.put('/updateusers', updateusers);
app.delete('/deleteuser', deleteuser);
app.delete('/deleteusers', deleteusers);

app.listen(port, async () => {
    console.log(`Server is running on http://localhost:${port}`);
});
