const employeeModel = require('../models/Employee');
const quoteModel = require('../models/Quote');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var SECRET_KEY = process.env.SECRET_KEY;


var formidable = require('formidable');
var fs = require('fs');


const getEmployees = async (req, res) => {
  try {
    // const employees = await employeeModel.find();
    // res.status(200).json(employees);
    await employeeModel.aggregate(
      [
        { "$addFields": { "searchId": { "$toString": "$_id" } } },
        {
          $lookup: {
            from: "quotes",
            "localField": "searchId",
            "foreignField": "userId",
            as: "quotes"
          }
        },
        // { $unwind: "$quotes" },
        {
          $project: {
            name: 1,
            email: 1,
            photo: 1,
            role: 1,
            createdAt: 1,
            status: 1,
            quotes: {
              _id: 1,
              author: 1,
              quote: 1,
              category: 1,
              status: 1,
              createdAt: 1
            }
          }
        }
      ])
      .then((resp) => {
        console.log(resp, 111);
        res.status(200).json(resp);

      })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getEmployee = async (req, res) => {

  try {
    const employees = await employeeModel.findOne({ _id: req.params.id });
    res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const EmployeeSignIn = async (req, res) => {

  const { email, password } = req.body;
  try {
    const existingUser = await employeeModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: 'User not exist' });
    }

    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    if (existingUser.status == 'Disable') {
      return res.status(400).json({ message: 'User Blocked' });
    }

    jwt.sign({
      email: existingUser.email,
      id: existingUser._id,
      role: existingUser.role
    }, SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
      res.json({
        token,
        name: existingUser.name,
        role: existingUser.role
      })
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });

  }
}


const EmployeeSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await employeeModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await employeeModel.create({
      email: email,
      password: hashPassword,
      name: 'Guest',
      role: 'Public',
      status: 'Enable'
    });

    // const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEY);
    // res.status(201).json({ user: result, token: token });
    jwt.sign({
      email: result.email,
      id: result._id,
      role: result.role
    }, SECRET_KEY, { expiresIn: '1d' }, (err, token) => {
      res.json({
        token,
        name: 'Guest',
        role: result.role
      })
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { name, email, role, photo, status } = req.body;

  const updateEmployee = {
    name,
    email,
    role,
    photo,
    status
  };
  try {
    await employeeModel.findByIdAndUpdate(id, updateEmployee, { new: true });
    res.status(200).json(updateEmployee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await employeeModel.findByIdAndRemove(req.params.id);
    res.status(202).json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const imageEmployee = async (req, res) => {
  try {
    let profilePick = '';
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldPath = files.fileUpload.filepath;
      profilePick = fields.img_name + '.' + files.fileUpload.originalFilename.split('.').pop();
      var newPath = './uploads/' + profilePick;
      fs.copyFile(oldPath, newPath, function (err) {
        if (err) throw err;
        res.status(200).json({ message: "Image Uploaded", filename: profilePick }).end();
      });
    });

    // const updateEmployee = {
    //   name,
    //   age,
    //   email,
    //   dob,
    //   address,
    //   photo
    // };

    // await employeeModel.findByIdAndUpdate(id, { photo: profilePick });

    // await employeeModel.updateOne(id, 
    //   { "$set": { "photo": profilePick } }
    // );
    // res.status(200).json(updateEmployee);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { getEmployees, getEmployee, EmployeeSignUp, EmployeeSignIn, updateEmployee, deleteEmployee, imageEmployee };
