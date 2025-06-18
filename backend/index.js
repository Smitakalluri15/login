const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PersonModel = require('./models/person')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://deepthii1316:Redtaylor12.@cluster0.q6hahrr.mongodb.net/')

app.post('/signin',(req,res)=>{
  const {email, password} = req.body
  PersonModel.findOne({email: email})
  .then(user => {
    if(user){
      if(user.password==password) res.json('Sucess')
      else res.json('Password is incorrect')
    }
    else{
      res.json('User doesnt exist')
    }
  })
})

app.post('/signup',(req,res)=>{
  PersonModel.create(req.body)
  .then(persons => res.json(persons))
  .catch(err=>res.json(err))
})

app.listen(5000,()=>{
  console.log('Server is running...')
})