const CategoryModel = require('../models/Category');

const CategoryAdd = async (req, res) => {

    const { name } = req.body;

    const newCategory = new CategoryModel({
        name
    });

    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }

}

const CategoryGet = async (req, res) => {
    try {
        const category = await CategoryModel.find();
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const CategoryDelete = async (req, res) => {
    try {
        const category = await CategoryModel.findByIdAndRemove(req.params.id);
        res.status(202).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const CategoryGetById = async (req, res) => {
    try {
        const category = await CategoryModel.findOne({ _id: req.params.id });
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const CategoryUpdate = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const UpdateCategory= {
        name
    };
    console.log(UpdateCategory);
    try {
        await CategoryModel.findByIdAndUpdate(id, UpdateCategory, { new: true });
        res.status(200).json(name);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
};


module.exports = { CategoryAdd, CategoryGet, CategoryDelete, CategoryGetById, CategoryUpdate }