const mongoose = require('mongoose');

const express = require('express');
const { ClientEncryption } = require('mongodb');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Puerto: ${port}`);
})

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://usermm:majada@majadabae.5qbeln1.mongodb.net/node');

    // #region Esquemas
    // (estructura de las colecciones)

    const schArtista = new mongoose.Schema(
        {
            nombre: { type: String, unique: true },
            miembros: [{ nombre: String }],
            activo: { type: Boolean, default: false }

        }
    );

    const schAlbum = new mongoose.Schema(
        {
            titulo: { type: String, unique: true },
            artista: String,
        }
    );

    const schCancion = new mongoose.Schema(
        {
            titulo: { type: String, unique: true },
            artista: String,
            album: String,
            duracion_segundos: Number,
            fechaSubida: Date
        }
    );


    // #region Modelos
    // (colecciones en Mongo)

    const artista = mongoose.model('artistas', schArtista);
    const album = mongoose.model('albumes', schAlbum);
    const cancion = mongoose.model('canciones', schCancion);

    // Añadir documentos a las colecciones

    const artistas = [
        new artista({
            nombre: "Led Zeppelin",
            miembros: [
                { nombre: "John Bonham" },
                { nombre: "Jimmy Page" },
                { nombre: "John Paul Jones" },
                { nombre: "Robert Plant" }
            ]
        }),
        new artista({
            nombre: "Extremoduro",
            miembros: [
                { nombre: "Roberto Iniesta" },
                { nombre: "Iñaki Antón" }
            ]
        }),
        new artista({
            nombre: "Raphael",
            miembros: [
                { nombre: "Miguel Rafael Martos Sánchez" }
            ]
        }),
        new artista({
            nombre: "Invisible",
            miembros: [
                { nombre: "Luis Alberto Spinetta" },
                { nombre: "Machi Rufino" },
                { nombre: "Pomo Lorenzo" }
            ]
        }),
        new artista({
            nombre: "Camela",
            miembros: [
                { nombre: "Ángeles Muñoz" },
                { nombre: "Dioni Martín" },
                { nombre: "Miguel Ángel Cabrera" }
            ],
            activo: true
        }),
        new artista({
            nombre: "The Jackson 5",
            miembros: [
                { nombre: "Jackie" },
                { nombre: "Tito" },
                { nombre: "Jermaine" },
                { nombre: "Marlon" },
                { nombre: "Michael" }
            ]
        }),
        new artista({
            nombre: "Queen",
            miembros: [
                { nombre: "Freddie Mercury" },
                { nombre: "Roger Taylor" },
                { nombre: "Brian May" },
                { nombre: "John Deacon" }
            ]
        }),
        new artista({
            nombre: "Estopa",
            miembros: [
                { nombre: "David Muñoz" },
                { nombre: "José Muñoz" }
            ],
            activo: true
        })
    ];

    // #region GESTIÓN DE ERRORES
    for (let i = 0; i < artistas.length; i++) {
        try {
            await artistas[i].save();
            console.log(artistas[i].nombre + ': artista añadido');
        } catch (E11000) {
            console.log(artistas[i].nombre + ': artista ya existente');
        }
    }
}