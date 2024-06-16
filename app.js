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
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(express.static('htdocs'));

    // #region ESQUEMAS
    // (estructura de las colecciones)

    const schArtista = new mongoose.Schema(
        {
            nombre: { type: String, unique: true },
            miembros: [{ nombre: String }],
            activo: { type: Boolean, default: false },
            genero: [{ genero: String }]
        }
    );

    const schAlbum = new mongoose.Schema(
        {
            titulo: { type: String, unique: true },
            artista: String,
            genero: [{ genero: String }]
        }
    );

    const schCancion = new mongoose.Schema(
        {
            titulo: { type: String, unique: true },
            artista: String,
            album: String,
            duracion_segundos: Number,
            fechaPublicacion: Date
        }
    );


    // #region MODELOS
    // (colecciones en Mongo)

    const artistas = mongoose.model('artistas', schArtista);
    const albumes = mongoose.model('albumes', schAlbum);
    const canciones = mongoose.model('canciones', schCancion);

    // Añadir documentos a las colecciones

    // #region artistas
    const insertartistas = [
        new artistas({
            nombre: "led zeppelin",
            miembros: [
                { nombre: "john bonham" },
                { nombre: "jimmy page" },
                { nombre: "john paul jones" },
                { nombre: "robert plant" }
            ],
            genero: [
                { genero: "hard" },
                { genero: "rock" },
                { genero: "blues" },
                { genero: "inglés" }
            ]
        }),
        new artistas({
            nombre: "extremoduro",
            miembros: [
                { nombre: "roberto iniesta" },
                { nombre: "iñaki antón" }
            ],
            genero: [
                { genero: "rock" },
                { genero: "metal" },
                { genero: "español" }
            ]
        }),
        new artistas({
            nombre: "raphael",
            miembros: [
                { nombre: "miguel rafael martos sánchez" }
            ],
            genero: [
                { genero: "balada" },
                { genero: "canción" },
                { genero: "español" }
            ]
        }),
        new artistas({
            nombre: "invisible",
            miembros: [
                { nombre: "luis alberto spinetta" },
                { nombre: "machi rufino" },
                { nombre: "pomo lorenzo" }
            ],
            genero: [
                { genero: "rock" },
                { genero: "progresivo" },
                { genero: "jazz" },
                { genero: "argentino" }
            ]
        }),
        new artistas({
            nombre: "camela",
            miembros: [
                { nombre: "angeles muñoz" },
                { nombre: "dioni martín" },
                { nombre: "miguel ángel cabrera" }
            ],
            activo: true,
            genero: [
                { genero: "tecno" },
                { genero: "rumba" },
                { genero: "flamenco" },
                { genero: "español" }
            ]
        }),
        new artistas({
            nombre: "the jackson 5",
            miembros: [
                { nombre: "jackie" },
                { nombre: "tito" },
                { nombre: "jermaine" },
                { nombre: "marlon" },
                { nombre: "michael" }
            ],
            genero: [
                { genero: "soul" },
                { genero: "motown" },
                { genero: "funk" },
                { genero: "disco" },
                { genero: "r&b" },
                { genero: "estadounidense" }
            ]
        }),
        new artistas({
            nombre: "queen",
            miembros: [
                { nombre: "freddie mercury" },
                { nombre: "roger taylor" },
                { nombre: "brian may" },
                { nombre: "john deacon" }
            ],
            genero: [
                { genero: "rock" },
                { genero: "progresivo" },
                { genero: "glam" },
                { genero: "orquesta" },
                { genero: "inglés" }
            ]
        }),
        new artistas({
            nombre: "estopa",
            miembros: [
                { nombre: "david muñoz" },
                { nombre: "josé muñoz" }
            ],
            activo: true,
            genero: [
                { genero: "rumba" },
                { genero: "catalana" },
                { genero: "español" }
            ]
        }),
        new artistas({
            nombre: "slayer",
            miembros: [
                { nombre: "dave lombardo" },
                { nombre: "tom araya" },
                { nombre: "jeff hanneman" },
                { nombre: "kerry king" }
            ],
            activo: true,
            genero: [
                { genero: "metal" },
                { genero: "thrash" },
                { genero: "doom" },
                { genero: "groove" }
            ]
        })
    ];
    // #region álbumnes
    const insertalbumes = [
        new albumes({
            titulo: "iii",
            artista: "led zeppelin",
            genero: [
                { genero: "hard" },
                { genero: "rock" },
                { genero: "blues" },
                { genero: "inglés" }
            ]
        }),
        new albumes({
            titulo: "la ley innata",
            artista: "extremoduro",
            genero: [
                { genero: "rock" },
                { genero: "metal" },
                { genero: "español" }
            ]
        }),
        new albumes({
            titulo: "digan lo que digan",
            artista: "raphael",
            genero: [
                { genero: "balada" },
                { genero: "canción" },
                { genero: "español" }
            ]
        }),
        new albumes({
            titulo: "el jardín de los presentes",
            artista: "invisible",
            genero: [
                { genero: "rock" },
                { genero: "progresivo" },
                { genero: "jazz" },
                { genero: "argentino" }
            ]
        }),
        new albumes({
            titulo: "10 de corazón",
            artista: "camela",
            genero: [
                { genero: "tecno" },
                { genero: "rumba" },
                { genero: "flamenco" },
                { genero: "español" }
            ]
        }),
        new albumes({
            titulo: "abc",
            artista: "the jackson 5",
            genero: [
                { genero: "soul" },
                { genero: "motown" },
                { genero: "funk" },
                { genero: "disco" },
                { genero: "r&b" },
                { genero: "estadounidense" }
            ]
        }),
        new albumes({
            titulo: "innuendo",
            artista: "queen",
            genero: [
                { genero: "rock" },
                { genero: "progresivo" },
                { genero: "glam" },
                { genero: "orquesta" },
                { genero: "inglés" }
            ]
        }),
        new albumes({
            titulo: "estopa",
            artista: "estopa",
            genero: [
                { genero: "rumba" },
                { genero: "catalana" },
                { genero: "español" }
            ]
        }),
        new albumes({
            titulo: "seasons in the abyss",
            artista: "slayer",
            genero: [
                { genero: "metal" },
                { genero: "thrash" },
                { genero: "doom" },
                { genero: "groove" }
            ]
        })
    ];
    // #region canciones
    const insertcanciones = [
        new canciones({
            titulo: "tangerine",
            artista: "led zeppelin",
            album: "iii",
            duracion_segundos: 193,
            fechaPublicacion: '1970-09-18'
        }),
        new canciones({
            titulo: "lo de fuera",
            artista: "extremoduro",
            album: "la ley innata",
            duracion_segundos: 426,
            fechaPublicacion: '2008-11-12'
        }),
        new canciones({
            titulo: "mi gran noche",
            artista: "raphael",
            album: "digan lo que digan",
            duracion_segundos: 182,
            fechaPublicacion: '1967-04-09'
        }),
        new canciones({
            titulo: "200 años",
            artista: "invisible",
            album: "el jardín de los presentes",
            duracion_segundos: 177,
            fechaPublicacion: '1975-05-08'
        }),
        new canciones({
            titulo: "cuando zarpa el amor",
            artista: "camela",
            album: "10 de corazón",
            duracion_segundos: 202,
            fechaPublicacion: '2004-02-27'
        }),
        new canciones({
            titulo: "abc",
            artista: "the jackson 5",
            album: "abc",
            duracion_segundos: 186,
            fechaPublicacion: '1976-10-16'
        }),
        new canciones({
            titulo: "estopa",
            artista: "estopa",
            album: "estopa",
            duracion_segundos: 297,
            fechaPublicacion: '2000-12-24'
        }),
        new canciones({
            titulo: "seasons in the abyss",
            artista: "slayer",
            album: "seasons in the abyss",
            duracion_segundos: 321,
            fechaPublicacion: '1991-03-14'
        }),
        new canciones({
            titulo: "the show must go on",
            artista: "queen",
            album: "innuendo",
            duracion_segundos: 286,
            fechaPublicacion: '1991-10-18'
        })
    ];
    // #region saves
    for (let i = 0; i < insertartistas.length; i++) {
        try {
            await insertartistas[i].save();
            console.log(insertartistas[i].nombre + ': artista añadido');
        } catch (E11000) {
            console.log(insertartistas[i].nombre + ': artista ya existente');
        }
    }

    for (let i = 0; i < insertalbumes.length; i++) {
        try {
            await insertalbumes[i].save();
            console.log(insertalbumes[i].titulo + ': album añadido');
        } catch (E11000) {
            console.log(insertalbumes[i].titulo + ': album ya existente');
        }
    }

    for (let i = 0; i < insertcanciones.length; i++) {
        try {
            await insertcanciones[i].save();
            console.log(insertcanciones[i].titulo + ': canción añadida');
        } catch (E11000) {
            console.log(insertcanciones[i].titulo + ': canción ya existente');
        }
    }

    console.log('\n---FIN INSERCIÓN DE DATOS---\n');

    // #region FIND



    // #region artistas

    app.get('/artista/todos', async (req, res) => {
        const artista = await artistas.find();
        if (artista.length > 0) {
            return res.json(artista);
        } else {
            return res.send("No hay registros.");
        }
    })

    app.get('/artista/nombre/:nombre', async (req, res) => {
        const artista = await artistas.findOne({ nombre: req.params.nombre });
        if (artista) {
            return res.json(artista);
        } else {
            return res.send(`Artista ${req.params.nombre} no encontrado.`);
        }
    })

    app.get('/artista/genero/:genero', async (req, res) => {
        try {
            artista = await artistas.find({ 'genero.genero': req.params.genero });
            if (artista.length > 0) {
                return res.json(artista);
            } else {
                return res.send(`Género ${req.params.genero} no encontrado.`);
            }
        } catch (ERROR) {
            return res.send(`Género ${req.params.genero} no encontrado.`);
        }
    })

    app.get('/artista/activo/:activo', async (req, res) => {
        try {
            artista = await artistas.find({ activo: req.params.activo });
            if (artista.length > 0) {
                return res.json(artista);
            } else {
                return res.send("No se encontraron artistas.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron artistas.");
        }
    })
    // #region álbumes

    app.get('/album/todos', async (req, res) => {
        const album = await albumes.find();
        if (album.length > 0) {
            return res.json(album);
        } else {
            return res.send("No hay registros.");
        }
    })

    app.get('/album/titulo/:titulo', async (req, res) => {
        try {
            album = await albumes.find({ titulo: req.params.titulo });
            if (album.length > 0) {
                return res.json(album);
            } else {
                return res.send("No se encontraron álbumes.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron álbumes.");
        }
    })

    app.get('/album/artista/:artista', async (req, res) => {
        try {
            album = await albumes.find({ artista: req.params.artista });
            if (album.length > 0) {
                return res.json(album);
            } else {
                return res.send("No se encontraron álbumes.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron álbumes.");
        }
    })

    app.get('/album/genero/:genero', async (req, res) => {
        try {
            album = await albumes.find({ 'genero.genero': req.params.genero });
            if (album.length > 0) {
                return res.json(album);
            } else {
                return res.send("No se encontraron álbumes.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron álbumes.");
        }
    })

    // #region canciones

    app.get('/cancion/todas', async (req, res) => {
        const cancion = await canciones.find();
        if (cancion.length > 0) {
            return res.json(cancion);
        } else {
            return res.send("No hay registros.");
        }
    })

    app.get('/cancion/titulo/:titulo', async (req, res) => {
        try {
            cancion = await canciones.find({ titulo: req.params.titulo });
            if (cancion.length > 0) {
                return res.json(cancion);
            } else {
                return res.send("No se encontraron canciones.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron canciones.");
        }
    })

    app.get('/cancion/artista/:artista', async (req, res) => {
        try {
            cancion = await canciones.find({ artista: req.params.artista });
            if (cancion.length > 0) {
                return res.json(cancion);
            } else {
                return res.send("No se encontraron canciones.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron canciones.");
        }
    })

    app.get('/cancion/album/:album', async (req, res) => {
        try {
            cancion = await canciones.find({ album: req.params.album });
            if (cancion.length > 0) {
                return res.json(cancion);
            } else {
                return res.send("No se encontraron canciones.");
            }
        } catch (ERROR) {
            return res.send("No se encontraron canciones.");
        }
    })

    app.get('/cancion/duracion/:duracion', async (req, res) => {
        try {
            let cancion;
            const duracion = req.params.duracion;

            if (duracion == "corta") {
                cancion = await canciones.find({ duracion_segundos: { $lt: 190 } });
            } else if (duracion == "media") {
                cancion = await canciones.find({ duracion_segundos: { $gte: 190, $lt: 290 } });
            } else if (duracion == "larga") {
                cancion = await canciones.find({ duracion_segundos: { $gte: 290 } });
            } else {
                return res.status(400).json({ error: 'Duración no válida, introduzca "corta", "media" o "larga".' });
            }

            if (cancion.length > 0) {
                return res.json(cancion);
            } else {
                return res.status(404).send("No se encontraron canciones.");
            }
        } catch (error) {
            return res.status(500).send("Error al buscar canciones.");
        }

    })

    app.get('/cancion/decada/:decada', async (req, res) => {
        try {
            let cancion;
            const decada = req.params.decada;

            switch (decada) {
                case "1960":
                    cancion = await canciones.find({ fechaPublicacion: { $lt: new Date('1970-01-01T00:00:00.000Z') } });
                    break;
                case "1970":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('1970-01-01T00:00:00.000Z'), $lt: new Date('1980-01-01T00:00:00.000Z') } });
                    break;
                case "1980":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('1980-01-01T00:00:00.000Z'), $lt: new Date('1990-01-01T00:00:00.000Z') } });
                    break;
                case "1990":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('1990-01-01T00:00:00.000Z'), $lt: new Date('2000-01-01T00:00:00.000Z') } });
                    break;
                case "2000":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('2000-01-01T00:00:00.000Z'), $lt: new Date('2010-01-01T00:00:00.000Z') } });
                    break;
                case "2010":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('2010-01-01T00:00:00.000Z'), $lt: new Date('2020-01-01T00:00:00.000Z') } });
                    break;
                case "2020":
                    cancion = await canciones.find({ fechaPublicacion: { $gte: new Date('2020-01-01T00:00:00.000Z'), $lt: new Date('2030-01-01T00:00:00.000Z') } });
                    break;
                default:
                    return res.status(400).json({ error: 'Década no válida, introduzca 1960, 1970, 1980, etc.' });
            }

            if (cancion.length > 0) {
                return res.json(cancion);
            } else {
                return res.status(404).send("No se encontraron canciones.");
            }
        } catch (error) {
            return res.status(500).send("Error al buscar canciones.");
        }
    });


    // #region añadir nuevo

    app.post('/cancion/new', async (req, res) => {
        try {
            const titulo = req.body.titulo;
            const artista = req.body.artista;
            const album = req.body.album;
            const duracion_segundos = req.body.duracion_segundos;
            const fechaPublicacion = req.body.fechaPublicacion;

            if (!titulo || !artista || !album || !duracion_segundos || !fechaPublicacion) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios: titulo, artista, album, duracion, fecha.' });
            }

            const newCancion = new canciones({
                titulo: titulo,
                artista: artista,
                album: album,
                duracion_segundos: duracion_segundos,
                fechaPublicacion: fechaPublicacion
            });

            await newCancion.save();

            res.status(201).send(`${newCancion.titulo} se ha añadido correctamente`);
        } catch (error) {
            res.status(500).json({ error: 'Error al añadir la canción' });
        }
    });

    app.post('/artista/new', async (req, res) => {
        try {
            const nombre = req.body.nombre;
            const miembros = req.body.miembros;
            const activo = req.body.activo;
            const genero = req.body.genero;

            if (!nombre || !miembros || !activo || !genero) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }

            const newArtista = new artistas({
                nombre: nombre,
                miembros: miembros,
                activo: activo,
                genero: genero
            });

            await newArtista.save();

            res.status(201).send(`${newArtista.nombre} se ha añadido correctamente`);
        } catch (error) {
            res.status(500).json({ error: 'Error al añadir el artista' });
        }
    });

    app.post('/album/new', async (req, res) => {
        const titulo = req.body.titulo;
        const artista = req.body.artista;
        const genero = req.body.genero;

        if (!titulo || !artista || !genero) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        try {
            const newAlbum = new albumes({
                titulo: titulo,
                artista: artista,
                genero: genero
            });

            await newAlbum.save();

            res.send(`${newAlbum.titulo} se ha añadido correctamente`);
        } catch (error) {
            const existe = await artistas.findOne({ titulo: req.params.titulo });
            if (existe) {
                res.send(`El album ${titulo} ya está registrado.`);
            } else {
                res.json({ error: 'Error al añadir el álbum.' });
            }
        }
    });

    // #region update

    app.post('/cancion/update/:titulo', async (req, res) => {
        const filtro = { titulo: req.params.titulo };
        const valores = {
            artista: req.body.artista,
            titulo: req.body.titulo,
            album: req.body.album,
            duracion_segundos: req.body.duracion_segundos,
            fechaPublicacion: req.body.fechaPublicacion
        };

        const update = await canciones.findOneAndUpdate(filtro, valores, { new: true });

        res.send(`Datos de la canción ${update.titulo} actualizados.`);
    });

    app.post('/artista/update/:nombre', async (req, res) => {
        const filtro = { nombre: req.params.nombre };
        const valores = {
            nombre: req.body.nombre,
            genero: req.body.genero,
            miembros: req.body.miembros,
            activo: req.body.activo
        };

        const update = await artistas.findOneAndUpdate(filtro, valores, { new: true });

        res.send(`Datos del artista ${update.nombre} actualizados.`);
    });

    app.post('/album/update/:titulo', async (req, res) => {
        const filtro = { titulo: req.params.titulo };
        const valores = {
            titulo: req.body.titulo,
            genero: req.body.genero,
            artista: req.body.artista
        };

        const update = await albumes.findOneAndUpdate(filtro, valores, { new: true });

        res.send(`Datos del álbum ${update.titulo} actualizados.`);
    });



    // #region ELIMINAR



    // #region por nombre

    app.get('/artista/del/:nombre', async (req, res) => {
        const artista = await artistas.findOneAndDelete({ nombre: req.params.nombre });
        if (artista) {
            return res.send(`Artista ${artista.nombre} eliminado con éxito.`);
        } else {
            return res.send(`Artista ${req.params.nombre} no encontrado.`);
        }
    });

    app.get('/album/del/:titulo', async (req, res) => {
        const album = await albumes.findOneAndDelete({ titulo: req.params.titulo });
        if (album) {
            return res.send(`Álbum ${album.titulo} eliminado con éxito.`);
        } else {
            return res.send(`Álbum ${req.params.titulo} no encontrado.`);
        }
    });

    app.get('/cancion/del/:titulo', async (req, res) => {
        const cancion = await canciones.findOneAndDelete({ titulo: req.params.titulo });
        if (cancion) {
            return res.send(`Canción ${cancion.titulo} eliminada con éxito.`);
        } else {
            return res.send(`Canción ${req.params.titulo} no encontrada.`);
        }
    });


    // #region por filtros

    app.get('/artista/del/activo/:activo', async (req, res) => {
        let param = req.params.activo;
        let activo = "";
        const artista = await artistas.deleteMany({ activo: param });

        console.log(artista);
        console.log(param);

        if (param === 'false') {
            activo = " no";
        }

        if (artista.deletedCount > 0) {
            return res.send(`${artista.deletedCount} artistas${activo} activos eliminados con éxito.`);
        } else {
            return res.send('Artistas no encontrados.');
        }
    });

    app.get('/album/del/genero/:genero', async (req, res) => {
        const album = await albumes.deleteMany({ 'genero.genero': req.params.genero });

        if (album.deletedCount > 0) {
            return res.send(`${album.deletedCount} álbumes del género ${req.params.genero} activos eliminados con éxito.`);
        } else {
            return res.send('Álbumes no encontrados.');
        }
    });




} 