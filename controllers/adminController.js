const db = require('../models')
const Restaurant = db.Restaurant

let adminController = {
  getRestaurants: (req, res) => {
    return Restaurant.findAll({ raw: true }).then(restaurants => {
      return res.render('admin/restaurants', {
        restaurants: restaurants
      })
    })
    return res.render('admin/restaurants')
  }
}

module.exports = adminController