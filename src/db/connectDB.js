const mongoose = require('mongoose');

const username = encodeURIComponent('Newton');
const password = encodeURIComponent('NS@jan2022');
const dbName = 'RegistrationForm';

const url = `mongodb+srv://${username}:${password}@cluster0.wpsflje.mongodb.net/${dbName}?retryWrites=true&w=majority`

const optionalParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url,optionalParams)
.then(()=>{
    console.log('DB connected to server');
})
.catch((e)=>{
    console.log(`Not connected to server error: ${e.message}`);
})