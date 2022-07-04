const ONLY_ENG_TEXT_PATTERN = /^[a-zA-Z ]+$/i
const ONLY_INT_PATTERN = /^[0-9]+$/
const SENTENCE_PATTERN = /^[a-zA-Z0-9 _:,@!%$\;\?\.\+\-\(\)\*\&]+$/im
const EMAIL_PATTERN = /[a-zA-Z0-9_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}/
const MOBILE_PATTERN = /^[0-9]{8}$/
const PASSWORD_PATTEN = /[a-zA-Z0-9]*[A-Z]+[a-zA-Z0-9]*/g
const DATE_PATTEN = /^[1-9]+[0-9]+[0-9]+[0-9]+-[1-9]+-[1-9]+$/

function checkOnlyText(text, canEmpty = false){
    let status = "pass"
    let validData = text

    if( !text || typeof text !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && text.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!text.match(ONLY_ENG_TEXT_PATTERN)){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

function checkParagraph (text, canEmpty = false){
    let status = "pass"
    let validData = text

    if( !text || typeof text !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && text.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!text.match(SENTENCE_PATTERN)){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

function checkEmail (email, canEmpty = false){
    let status = "pass"
    let validData = email

    if( !email || typeof email !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && email.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!email.match(EMAIL_PATTERN)){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

function checkPhoneNum (phoneNum, canEmpty = false){
    let status = "pass"
    let validData = phoneNum

    if( !phoneNum || typeof phoneNum !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && phoneNum.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!phoneNum.match(MOBILE_PATTERN)){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

function checkWithCurrentDate(date, criteria = "before", canEmpty = false){
    let status = "pass"
    let validData = date
    const currentDatetime = new Date()
    const year = currentDatetime.getFullYear()
    const month = currentDatetime.getMonth()
    const day = currentDatetime.getDate()
    const currentDate = year + "-" + month + "*" + day

    if( !date || typeof date !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && date.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!date.match(DATE_PATTEN)){
        status = "invalid"    
        validData = ""  
    }
    else if( criteria === "before"){
        if (date >= currentDate){
            status = "outrange"    
            validData = ""  
        }
    }
    else if( criteria === "after" ){
        if (date <= currentDate){
            status = "outrange"    
            validData = ""  
        }
    }
    return {
        status: status,
        validData: validData
    }
}

function checkGender(gender, canEmpty = false){
    let status = "pass"
    let validData = gender

    if( !gender || typeof gender !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && gender.length === 0){
        status = "empty"
        validData = ""
    }
    else if(gender != "male" && gender != "female"){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

function checkPassword(password, canEmpty = false){
    let status = "pass"
    let validData = password

    if( !password || typeof password !== "string"){
        status = "undefined"
        validData = ""
    }
    else if(!canEmpty && password.length === 0){
        status = "empty"
        validData = ""
    }
    else if(!password.match(PASSWORD_PATTEN)){
        status = "invalid"    
        validData = ""
    }
    return {
        status: status,
        validData: validData
    }
}

module.exports = { checkOnlyText, checkParagraph, checkEmail, checkPhoneNum, checkWithCurrentDate, checkGender, checkPassword}