const commondValidate = require("./CommondValidation.js")
const cer = require("./checkExistRecord")

async function MemFormValid(data){
  let allValidated = true
  let validedData = {}
  let errorMsg = {}

  const firstName = commondValidate.checkOnlyText(data.firstName)
  const lastName = commondValidate.checkOnlyText(data.lastName)
  const email = commondValidate.checkEmail(data.email)
  const bDate = commondValidate.checkWithCurrentDate(data.bYear + "-" + data.bMonth + "-" + data.bDay)
  const phoneNum = commondValidate.checkPhoneNum(data.phoneNum)
  const gender = commondValidate.checkGender(data.gender)
  const password = commondValidate.checkPassword(data.password)

  if (firstName.status === "empty" || firstName.status === "undefined"){
    allValidated = false
    errorMsg.firstName = {type:"server", message:"What is your first name?"}
  } else if(firstName.status === "invalid"){
    allValidated = false
    errorMsg.firstName = {type:"server", message:"Only alphabet is allowed"}
  } else validedData.firstName = firstName.validData

  if (lastName.status === "empty" || lastName.status === "undefined"){
    allValidated = false
    errorMsg.lastName = {type:"server", message:"What is your last name?"}
  } else if(lastName.status === "invalid"){
    allValidated = false
    errorMsg.lastName = {type:"server", message:"Only alphabet is allowed"}
  }else validedData.lastName = lastName.validData

  if (email.status === "empty" || email.status === "undefined"){
    allValidated = false
    errorMsg.email = {type:"server", message:"You'll use this when you log in and if you ever need to reset your password"}
  } else if(email.status === "invalid"){
    allValidated = false
    errorMsg.firstName = {type:"server", message:"Please use a valid email"}
  } else if (await cer.checkExistRecord("email", email.validData)){
    allValidated = false
    errorMsg.email = {type:"server", message:"This email is already registered"}
  } else validedData.email = email.validData

  if (bDate.status === "empty" || bDate.status === "undefined"){
    allValidated = false
    errorMsg.bDate = {type:"server", message:"What is your birthday?"}
  } else if(bDate.status === "invalid"){
    allValidated = false
    errorMsg.bDate = {type:"server", message:"Please make sure that you use your real date of birth"}
  }else validedData.bDate = bDate.validData

  if (phoneNum.status === "empty" || phoneNum.status === "undefined"){
    allValidated = false
    errorMsg.phoneNum = {type:"server", message:"What is your phone number?"}
  } else if(phoneNum.status === "invalid"){
    allValidated = false
    errorMsg.phoneNum = {type:"server", message:"Please make sure that you use your real phone number"}
  } else if (await cer.checkExistRecord("phoneNum", phoneNum.validData)){
    allValidated = false
    errorMsg.phoneNum = {type:"server", message:"This phone number is already registered"}
  } else validedData.phoneNum = phoneNum.validData

  if (gender.status === "empty" || gender.status === "undefined"){
    allValidated = false
    errorMsg.gender = {type:"server", message:"What is your gender?"}
  } else if(gender.status === "invalid"){
    allValidated = false
    errorMsg.gender = {type:"server", message:"Please input a valid gender"}
  }else validedData.gender = gender.validData

  if (password.status === "empty" || password.status === "undefined"){
    allValidated = false
    errorMsg.password = {type:"server", message:"Please set a password for your account"}
  } else if(password.status === "invalid"){
    allValidated = false
    errorMsg.password = {type:"server", message:"You password should have at least one uppercase letter"}
  }else validedData.password = password.validData

  return {
    status: allValidated,
    validData: validedData,
    error: errorMsg
  }
}

module.exports = { MemFormValid }