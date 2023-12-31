const router = require("express").Router();
const { Comment } = require("../../models");

router.get("/", (req, res) => {
  Comment
    .findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // check the session
  if (req.session) {
    Comment
      .create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      })
      .then((dbCommentData) => res.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Update a Comment's content
router.put("/:id", (req, res) => {
  Comment
    .update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Comment
    .destroy({
      where: {
        id: req.params.id,
      },
    })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No Comment found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
