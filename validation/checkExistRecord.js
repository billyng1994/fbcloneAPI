const FBmembership = require("../models/FBmembership")

const checkExistRecord = async (matchField, value) => {
    // Optional way to set a string from other variable as the key of a obj
    // const QueryObj = {}
    // QueryObj[matchField] = value

    try{
        // ES6 method of setting a string from other variable as the key of a obj
        //const result = await FBmembership.findOne({[matchField]:value})
        const result = await FBmembership.findOne({[matchField]:value})
  
        return result
    } catch (err) {
        console.log(err)
        return false
    }
  }

module.exports = { checkExistRecord }