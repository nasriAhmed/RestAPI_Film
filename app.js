const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
const port = 3000;


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/filmstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Could not connect to MongoDB');
    console.error(error);
});

//shema monogo
const FilmSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    année: { type: Number, required: true },
    note: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
});

const film = mongoose.model('film', FilmSchema);
//module.exports = film;
//mongoose.set('strictQuery', false);


app.use(express.static('public'));


// Get
app.get('/films', (req, res) => {
    film.find({}, [])
        .then((resultat) => {
            // Return the users as a JSON response
            res.json(resultat);
            console.log('Liste de client:', resultat);
        })
        .catch((err) => {
            // Handle any errors that may occur
            res.status(500).send(err.message);
            console.error('Error while finding users:', err);
        });
});


app.get('/films/:id', (req, res) => {
    film.findById(req.params.id, (err, film) => {
        if (err) {
            res.status(500).send(err);
        } else if (!film) {
            res.status(404).send();
        } else {
            res.status(200).send(film);
        }
    });
});

app.post('/films', async(req, res) => {
    const film = new film(req.body);
    await film.save();
    res.send(film);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});