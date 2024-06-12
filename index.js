// MONGOOSE
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://usermm:majada@majadabae.5qbeln1.mongodb.net/node?retryWrites=true&w=majority&appName=MajadaBAE');
}

// EXPRESS
const express = require('express');
const app = express();
const port = 3000;

/////////////////////////////////////////

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('Hello World!');
})

const canciones = new mongoose.Schema(
    {
        name: String,
        artista: String,
        duracion_segundos: int,
        likes: int
    }
);

const Kitten = mongoose.model('Kitten', kittySchema);

const silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'