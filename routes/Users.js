const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Admin = require('../models/Admin')
const User = require('../models/User')

users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/loginuser', (req, res) => {

    var password = req.body.password;

    Admin.findOne({ "username": req.body.username }, (err, result) => {

        if (err) return console.log(err)

        if (result) {

            if (password != result.password) {

                res.json({ message: "Password is Wrong" });

            } else if (result.status == 0) {

                res.json({ message: "Admin Not Approved" })

            } else {

                // console.log("result " + result);

                res.json(result)
            }

        } else {

            res.json({ message: "Username Not Found" });

        }

    })

});

users.get('/getadmin', (req, res) => {

    Admin.find({ $or: [{ status: '0' }, { status: '1' }] }, (err, data) => {

        if (err) {
            res.send("erroe geting name")
        }
        else {
            res.send(data);
        }
    })
});

users.post('/Adduser', (req, res) => {

    const admin = new Admin(req.body);
    admin.save((err, document) => {
        if (err) {

            console.log("err " + err);

            res.json({ message: "Unable to Add Employee" });
        } else {

            console.log("else");

            res.json({ message: "Add Succfully" });
        }

    });

});

users.post('/updateId', (req, res) => {

    Admin.update({ _id: req.body.id }, { $set: { status: "1" } }, function (err, response) {

        if (err) {
            console.log(err)
        } else {
            console.log(response)
        }

    });

});

////////////////////// denied login request /////////////////////

users.post('/unupdateId', (req, res) => {

    Admin.update({ _id: req.body.id }, { $set: { status: "0" } }, function (err, response) {

        if (err) {
            console.log(err)
        } else {
            console.log(response)
        }

    });

});

users.get('/getuser', (req, res) => {

    User.find({ status: "0" }).exec((err, data) => {
        if (err) {
            res.send("erroe geting name")
        }
        else {
            res.send(data);
        }
    })
})

users.get('/deleteuser/:id', (req, res) => {

    User.update({ _id: req.params.id }, { $set: { status: "1" } }, (err, result) => {

        if (err) {
            res.send("erroe geting name");
        }
        else {
            res.send('Delete Succefully');
        }

    })

})

users.post('/createuser', (req, res) => {

    // console.log(req.body);

    const user = new User(req.body);
    user.save((err, document) => {
        if (err) {
            console.log(err);
            res.json({ message: "Unable to Add Employee" });
        } else {
            console.log(document);
            res.json({ message: "Add Succfully" });
        }

    });

});

users.get('/udpateuser/:id', (req, res) => {

    User.find({ _id: req.params.id }, (err, result) => {

        if (err) {
            res.send("erroe geting name");
        }
        else {
            res.json(result);
        }

    })

})

users.post('/userUpdate', (req, res) => {

    var data = {
        name: req.body.name,
        family: req.body.family,
        address: req.body.address,
        mobile: req.body.mobile,
        aadhar: req.body.aadhar,
        updateby: req.body.create,
        updatedate: new Date()
    }

    User.update({ "_id": req.body.id }, data, function (err, result) {

        if (err) {

            res.json({ message: "Data Not Updated" });

        } else {

            res.json({ message: "Data Update Successfully" });
        }
    })
})

users.get('/search/:id', (req, res) => {

    var postal = req.params.id;
    regex = new RegExp(postal);

    User.find({ $or: [{ 'name': regex }, { 'family': regex }, { 'address': regex }, { 'mobile': regex }, { 'aadhar': regex }] }, (err, items) => {

        if (err) {
            res.json(err);
        } else {
            res.json(items);
        }

    })

})

module.exports = users