const db = require('../models')
const category = require('../models/category')
const { getCategories } = require('./categoryController')
const Restaurant = db.Restaurant
const Category = db.Category
const Comment = db.Comment
const User = db.User

const pageLimit = 10

const restController = {
  getRestaurants: (req, res) => {
    const whereQuery = {}
    let categoryId = ''
    let offset = 0
    if (req.query.page) {
      offset = (req.query.page - 1) * pageLimit
    }
    if (req.query.categoryId) {
      categoryId = Number(req.query.categoryId) 
      whereQuery.CategoryId = categoryId
    }
     Restaurant.findAndCountAll({               
       include: Category,
       where: whereQuery, //必須傳入物件
       offset,
       limit: pageLimit
     }).then(result => {
       const page = Number(req.query.page) || 1
       const pages = Math.ceil(result.count / pageLimit)
       const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)
       const prev = page - 1 < 1 ? 1 : page - 1
       const next = page + 1 > pages ? pages : page + 1
       const data = result.rows.map(r => ({
         ...r.dataValues,
         description: r.dataValues.description.substring(0, 50),
         categoryName: r.dataValues.Category.name
       }))      
       Category.findAll({
         raw: true,
         nest: true
       }).then(categories => {         
         return res.render('restaurants', {
           restaurants: data,
           categories,
           page,
           totalPage,
           prev,
           next,
           categoryId,
           currentUser: req.user
         })
       })         
    })
  },

  getRestaurant: (req, res) => {
    return Restaurant.findByPk(req.params.id, { include: [
      Category,
      {model: Comment, include: [User]}
    ] })
      .then(restaurant => {
        return res.render('restaurant', { restaurant: restaurant.toJSON(), currentUser: req.user})
      })
  }
}

module.exports = restController