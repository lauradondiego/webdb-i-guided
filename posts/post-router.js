const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // get data from database and return it to the client
  // SQL would be selet * from posts
  // Look at knex query builder on the link he sent for help
  // whenever you see an example with 'knex', change to 'db' since we called it db on line 4
  // all db operations, return a promise so need .then .catch
  db.select("*")
    .from("posts")
    // you could also do db('posts).select('title), ('contents') instead of 14 and 15
    .then(posts => {
      // we are gettingb ack posts so lets call it posts
      res.status(200).json(posts);
    })
    // check to see your response in insomnia
    .catch(err => {
      res.json(err);
    });
});

router.get("/:id", (req, res) => {
  // select * from posts where id = 2
  const { id } = req.params;

  db("posts")
    .where({ id })
    .first()
    // grabs first record of the array
    .then(posts => {
      // we are gettingb ack posts so lets call it posts
      res.status(200).json(posts);
    })
    // check to see your response in insomnia
    .catch(err => {
      res.json(err);
    });
});

router.post("/", (req, res) => {
  // insert into posts () values () in SQL
  const postData = req.body;
  // validate the postData before inserting into db ( check for body contents, name etc)
  db("posts")
    .insert(postData, "id")
    .then(([id]) => {
      db("posts")
        .where({ id })
        .first()
        .then(post => {
          // we are gettingb ack posts so lets call it posts
          res.status(200).json(post);
        });
      res.status(200).json(id);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/:id", (req, res) => {
    const changes = req.bodydb('posts').where('id', req.params.id).update(changes)
});

router.delete("/:id", (req, res) => {
    db('posts')
.where ({id : req.params.id})

});

module.exports = router;
