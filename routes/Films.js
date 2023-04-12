const express = require("express");
const router = express.Router();

const Film = require("../models/Film");

// GET all films
console.log("Getting all films");
router.get("/", async(req, res) => {
    try {
        const listeFilms = await Film.find({}).exec();
        res.send(listeFilms);
        if (listeFilms) {
            listeFilms.forEach(function(film) {
                console.log("Titre de film : ", film.titre);
                console.log("Année de production du film : ", film.année);
                console.log("Note de film : ", film.note);
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//Get film by id
console.log("Getting film by ID");
router.get("/:id", async(req, res) => {
    try {
        const Film_by_id = await Film.findById(req.params.id);
        res.json(Film_by_id);
        console.log("Film", Film_by_id);
    } catch (err) {
        //console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
//Add new film
console.log("Add new film");
router.post("/", (req, res) => {
    const newFilm = new Film({
        titre: req.body.titre,
        année: req.body.année,
        note: req.body.note,
    });

    newFilm.save().then((film) => res.json(film));
});

//delete film
console.log("delete film");

router.delete("/:id", (req, res) => {
    Film.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(() => res.status(404).json({ success: false }));
});

//Update film
console.log("Update film");
router.put("/:id", (req, res) => {
    Film.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        )
        .then((film) => res.json(film))
        .catch(() => res.status(404).json({ success: false }));
});
module.exports = router;