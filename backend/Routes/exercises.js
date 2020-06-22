const router = require('express').Router();
let Exercises = require('../models/exercises');

//all errors are status 5000++

router.route('/').get((req,res) => {
    Exercises.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error Get All Exercises: ', + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date(req.body.date);
    
    const newExercise = new Exercises({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise Added!'))
        .catch(err => res.status(401).json('Error Adding Exercise: ' + err));
});

router.route('/:id').get((req,res) => {
    // let id = req.params.id;

    Exercises.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(409).json('Error Getting Exercise id: ' + req.params.id + " Error: "  + err));
});

router.route('/:id').delete((req,res) => {
    let id = req.params.id;

    Exercises.findByIdAndDelete(id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(415).json('Error Deleting Exercise id: ' + id + " Error: "  + err));
});

router.route('/update/:id').post((req,res) => {
    let id = req.params.id;

    Exercises.findById(id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise Updated'))
                .catch(err => res.status(416).json('Error: ' + err));
            })
        .catch(err => res.status(417).json('Error: ' + err));
})

module.exports = router;





