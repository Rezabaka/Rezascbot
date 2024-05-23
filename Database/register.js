const fs = require('fs')
const crypto = require('crypto')

/**
 * GET db
**/
const _users = JSON.parse(fs.readFileSync('./database/users.json'))

/**
 * GET random user from db
 * return {string}
**/
const getRegisteredRandomId = () => {
    return _users[Math.floor(Math.random() * _users.length)].id
}

/**
 * add user to db
 * @param {String} userId 
 * @param {String} name 
 * @param {String} age 
 * @param {String} time 
 * @param {String} serial 
**/
const addRegisteredUser = (userid, name, age, time, serials) => {
    const obj = { id: userid, name: name, age: age, time: time, serial: serials }
    _users.push(obj)
    fs.writeFileSync('./database/users.json', JSON.stringify(_users))
}

/**
 * GET random serial
 * params {number} size
 * return {string}
**/
const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}

/**
 * cek user from db
 * params {string} userid
 * return {true/false}
**/
const checkRegisteredUser = (userid) => {
    let status = false
    Object.keys(_users).forEach((i) => {
        if (_users[i].id === userid) {
            status = true
        }
    })
    return status
}

module.exports = {
	getRegisteredRandomId,
	addRegisteredUser,
	createSerial,
	checkRegisteredUser
}