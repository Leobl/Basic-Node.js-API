var ObjectID = require('mongodb').ObjectID;


// Routes are wrapped in a function, which takes the Express instance and a database as arguments
module.exports = function(app, db) {
    // Here is the GET method made
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });

    // Here is the POST method made
    app.post('/notes', (req, res) => {

        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').insert(note, (err, result) => {
        if (err) { 
            res.send({ 'error': 'An error has occurred' }); 
        } else {
            res.send(result.ops[0]);
        }
        });
    });

    //Here is the DELETE method made
    /**
     * It's like the GET method just instead of the "findOne" 
     * we use the "remove" function! 
     */
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Note ' + id + ' deleted!');
          } 
        });
    });

    //Here is the PUT method made, (for updating)
    /**
     * It's hybrid between READ and CREATE. You find the object, then update it accordingly
     * 
     * You should also think of a logic in case of the fields of title or body are not empty
     * so those are updated
     * If you deleted your only note, time to make another one! 
     */
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(note);
            } 
        });
    });
};