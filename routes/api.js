/**
 * Created by artwe on 12/06/2017.
 */
const express = require('express');
const config = require('../config/database');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/taskList');
const mongoose = require('mongoose');


//Register Route
router.post('/register', function (req,res,next) {
    console.log('request has '+req.body)
    let newUser = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password

    });

    //add user to db
    User.addUser(newUser, (err, user) => {
      if(err){
          res.json({success: false, msg: 'Failed to register user'});
      }
      else {
          res.json({success: true, msg: 'User registered'});
      }
    })
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});




//add task router
router.post('/addtask',passport.authenticate('jwt',{session: false}),(req,res,next) => {
    var newTask = new Task({
        content: req.body.content
    });

//add Tasks
    Task.addTask(newTask, (err, task) => {
        if (err)
            return res.json({success: false, msg: "Cannot add task"});
        else
            return res.json({success: true, msg: "Task added",task: task});
    })
});

//delete task

router.delete('/task/:id', function (req,res,next) {

  Task.deleteOne({_id: req.params.id}, (err, doc) => {
    if(err) throw err;
    else {
      return res.json({success: true, msg: "Task deleted"});
    }
  });
});

//update task
router.put('/task/:id', (req,res,next) => {
    var updTask = req.body;

    Task.findOneAndUpdate({_id: req.params.id},updTask,{new: true}, (err,doc) => {
      if(err) throw err;
      else {
        res.json({success: true , task: doc})

      }
    });


});

//get task
router.get('/tasks',passport.authenticate('jwt',{session: false}), (req,res,next) => {

    Task.find({},function (err,docs) {
        if(err)
            res.json({success: false, msg: "Cannot retrieve task"});
        else
            res.json({success: true, tasks: docs});
    });
})

//export router
module.exports = router;
