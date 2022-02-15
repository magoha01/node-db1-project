const Accounts = require("./accounts-model");

exports.checkAccountPayload = (req, res, next) => {
  // try{

  // } catch(err) {
  //   next();
  // }
  console.log("checkAccountPayload MW");
  next();
};

exports.checkAccountNameUnique = (req, res, next) => {
  // try{

  // } catch(err) {
  //   next();
  // }
  console.log("checkAccountNameUnique MW");
  next();
};

exports.checkAccountId = async (req, res, next) => {
  try{
    const account =  await Accounts.getById(req.params.id)
    if(!account){
      next({ status: 404, message: "account not found" });
    } else {
      req.account = account
      next();
    }
  } catch(err) {
    next();
  }
};
