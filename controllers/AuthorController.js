const AuthorModel = require('../models/Author');

const AuthorAdd = async (req, res) => {
    const { name } = req.body;
    const newAuthor = new AuthorModel({
        name
    });

    try {
        await newAuthor.save();
        res.status(201).json(newAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

const AuthorGet = async (req, res) => {
    try {
        const Author = await AuthorModel.find();
        res.status(200).json(Author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const AuthorDelete = async (req, res) => {
    try {
        const Author = await AuthorModel.findByIdAndRemove(req.params.id);
        res.status(202).json(Author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


const AuthorGetById = async (req, res) => {
    try {
        const Author = await AuthorModel.findOne({ _id: req.params.id });
        res.status(200).json(Author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const AuthorUpdate = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const UpdateAuthor= {
        name
    };
    console.log(UpdateAuthor);
    try {
        await AuthorModel.findByIdAndUpdate(id, UpdateAuthor, { new: true });
        res.status(200).json(name);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
      }
};


module.exports = { AuthorAdd, AuthorGet, AuthorDelete, AuthorGetById, AuthorUpdate }