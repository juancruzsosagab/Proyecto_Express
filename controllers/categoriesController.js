const categoriesModel = require("../models/categoriesModel");
module.exports = {
    getAll: async (req, res, next) => {
        console.log(req.query)
        const categories = await categoriesModel.find({});
        res.json(categories);
    },
    create: function (req, res, next) {
        console.log(req.body);
        const category = new categoriesModel({
            name: req.body.name
        })
        category.save();
        res.json(category);
    }
}