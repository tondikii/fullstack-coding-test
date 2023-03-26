const errorsHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({error: err.errors.map((el) => el.message)});
      break;
    case "Bad Request Login":
      res.status(400).json({error: "Email or Password is Required"});
      break;
    case "Invalid Username":
    case "Invalid Password":
      res.status(400).json({error: err.name});
      break;
    default:
      res.status(500).json({error: "Internal server error"});
  }
};

module.exports = errorsHandler;
