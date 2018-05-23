const jwt = require('jsonwebtoken')
const {Task} = require('../model/todomodel')
const  { User }  = require('../model/usermodel')
const mongoose = require('mongoose')
const pwd = process.env.SECRETCODE

module.exports = {

        addTask:function(req,res){
            
            let token  = req.headers.token
            let decoded  = jwt.verify(token, 'SECRET')
            let taskList = new Task({
                userId: decoded.id,
                task: req.body.task,
                status: 'uncomplete',
                users:decoded.id
            })

        taskList
            .save((err,result) => {
                if(!err){
                    res.status(201).json({
                        message: 'task successed add',
                        data: result
                    })

                } else {
                    res.status(500).json({
                    message: 'something went wrong'
                    })
                }
            })
            
        
    },

        getlist:function (req,res) {
                let token  = req.headers.token
                let decoded  = jwt.verify(token, 'SECRET')
                token.id = decoded.id
                
                Task.
                    find({ users : decoded.id })
                        .populate('users')
                            .exec(function (err, todo) {
                        if (err) {
                            console.log(err)
                        }else{
                            res.status(200).json(todo)
                        }
                    });
    },
    
        updateTask: function (req, res) {
            let token = req.headers.token
            let decoded = jwt.decode(token,'SECRET')
            
            Task
            .find({task:req.body.task})
            .exec(function(err,task){
                
                    if(err){
                        res.send(err)
                    }else if(task[0].status === 'uncomplete'){              
                        task[0].status = 'complete'
                        task[0].save(function (err, updated) {
                        if (!err){
                            res.status(200).json(task)
                        }else{
                            return res.send(err);    
                        }
                        
                    });
                    }else{
                        task[0].status = 'uncomplete'
                        task[0].save(function (err, updated) {
                        if (!err){
                            res.status(200).json(task)
                        }else{
                            return res.send(err);    
                        }
                        
                    });

                    }

                    
                })        
      },

        deleteTask: function(req,res){
          console.log('asooooy');
          
        console.log(req.params);
        
        Task.findByIdAndRemove(req.params.id, (err, task) => {  
            if (err) return res.status(500).send(err);
            const response = {
                message: "task successfully deleted",
            };
            return res.status(200).send(response);
        });      
      },
        search:function (req,res) { 
               console.log('=====',req.body);
               Task
               .find({status:req.body.status})   
               .exec(function(err,task){
                   if(!err){
                       res.send(task)
                   }else{
                    res.status(500).send(err)
                   }
               })
        }

}