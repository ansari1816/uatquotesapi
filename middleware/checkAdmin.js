const checkAdmin = (req, res, next) => {
    if (req.decoded.role === "Admin") {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized User"
        });
    }
}

module.exports = checkAdmin;