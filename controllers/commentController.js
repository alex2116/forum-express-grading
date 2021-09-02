const db = require('../models')
const restaurant = require('../models/restaurant')
const Comment = db.Comment

const commentController = {
  postComment: (req, res) => {
    return Comment.create({
      text: req.body.text,
      RestaurantId: req.body.restaurantId, //hidden input
      UserId: req.user.id //passport
    })
    .then((comment) => {
      res.redirect(`/restaurants/${req.body.restaurantId}`)
    })
  },

  deleteComment: (req, res) => {
    return Comment.findByPk(req.params.id)
      .then((comment) => {
        comment.destroy()
          .then((comment) => {
            res.redirect(`/restaurants/${comment.RestaurantId}`) //
          })
        
      })
  }
}

module.exports = commentController