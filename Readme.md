# Readme

## env

Mongo_URL="mongodb://localhost:27017/Quotes"
SECRET_KEY="abcdefghijklmnopqrstuvwxyz"

new to create admin first by updating sign up API replacing Public with Admin


## Steps JWT

1. Install the necessary packages:
You'll need to install the jsonwebtoken package, which provides JWT-related functionality, and the express package, which is a popular web framework for Node.js. You can install these packages by running the following command:

    > npm install jsonwebtoken express

2. Import the necessary modules:
In your main server file, you'll need to import the jsonwebtoken and express modules. You can do this by including the following lines at the top of your file:

    > const jwt = require('jsonwebtoken');
    > const express = require('express');

3. Create a secret key:
You'll need to create a secret key that will be used to sign and verify JWT. This key should be kept secret, and should not be hardcoded in your application. You can create a secret key by running the following command:

    > const secret = 'your_secret_key';

4. Create a middleware function to handle JWT:
You'll need to create a middleware function that will handle JWT for your API routes. This function should check for the presence of a JWT in the request headers, and verify the token using your secret key. If the token is valid, it should attach the decoded token to the request object, so it can be accessed by other routes. If the token is invalid, it should return an error.

    ``` snippets

    const checkJwt = (req, res, next) => {
        // check for the presence of a JWT in the request headers
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }

        // verify the JWT using your secret key
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({message: 'Invalid token'});
            }

            // attach the decoded token to the request object
            req.decoded = decoded;
            next();
        });
    };

    ```

5. Use the middleware function for protected routes:
You'll need to use the middleware function for routes that you want to protect with JWT. For example, you can use it for all routes that start with `

6. Create a login route:
You'll need to create a login route that will allow users to authenticate with your API and receive a JWT. This route should accept a user's credentials (e.g. email and password), check them against your database, and if they are valid, return a JWT.

    ``` snippets

    app.post('/login', (req, res) => {
        // check user credentials against your database
        // ...

        // if credentials are valid, create a JWT
        const payload = {
            userId: user.id,
            email: user.email
        };
        const token = jwt.sign(payload, secret, {expiresIn: '1h'});
        res.json({token});
    });

    ```

7. Use the middleware function for protected routes:
You'll need to use the middleware function for routes that you want to protect with JWT. For example, you can use it for all routes that start with /api/, which will be your API's protected routes.

    > app.use('/api', checkJwt);

8. Create API routes:
Create routes that allow users to access protected resources by providing a valid JWT. These routes will be able to access the decoded token from the request object and use it to retrieve the user's information from the database.

    > app.get('/api/users', (req, res) => {

9. Create API routes:
Create routes that allow users to access protected resources by providing a valid JWT. These routes will be able to access the decoded token from the request object and use it to retrieve the user's information from the database.

    ``` snippets

    app.get('/api/users', (req, res) => {
        // use the decoded token to retrieve the user's information from the database
        const userId = req.decoded.userId;
        // ...
        res.json({users: [{id: userId, name: 'John Doe'}]});
    });


    ```

Start the server:
Finally, start the server by calling the listen function on the express application.

> app.listen(3000, () => console.log('Server started on port 3000'));

Please keep in mind that the above example is a simplified version of how JWT authentication can be implemented in a Node.js API and it's not recommended to use this in a production environment. It's important to use a secure method for storing passwords like bcrypt and use a package like helmet for security headers. Also, it's important to validate all inputs to prevent security issues like SQL injection and XSS.


## MondoDB Queries

```

find
sort
limit 
skip
explain
count
select

.select('name email role');

pretty not working

.lean().exec(function (err, data) {

find().limit(1).sort({$natural:-1})
find().limit(1).sort({$natural:-1})
find().limit(1).sort({$natural:-1}).explain()
find().limit(1).sort({$natural:-1}).count()
find().limit(1).sort({$natural:-1}).limit(1)
find().limit(1).sort({$natural:-1}).skip(1)


find({a: {$in: [1, 2, 3]}})


find({$or: [{a: 1}, {b: 1}]})
find({$and: [{a: 1}, {b: 1}]})
find({$nor: [{a: 1}, {b: 1}]})
find({$and: [{a: 1}, {$or: [{b: 1}, {c: 1}]}]})
find({$and: [{a: 1}, {$or: [{b: 1}, {c: 1}]}]}).sort({a: 1})
find({$and: [{a: 1}, {$or: [{b: 1}, {c: 1}]}]}).sort({a: 1}).limit(1)
find({$and: [{a: 1}, {$or: [{b: 1}, {c: 1}]}]}).sort({a: 1}).limit(1).skip(1)
find({$and: [{a: 1}, {$or: [{b: 1}, {c: 1}]}]}).sort({a: 1}).limit(1).skip(1).toArray()

 db.quotes.aggregate([
    { 
        $lookup: 
        { 
            from: "employees", 
            localField:"author", 
            foreignField:"name", 
            as: "result"
        }
    }
    ]).pretty()

```


