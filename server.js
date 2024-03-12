import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'



const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



// MONGO DB SETTINGS //

mongoose.connect('mongodb://localhost:27017/dogbook', { useNewUrlParser: true, useUnifiedTopology: true })


const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nickname: String,
    owner: String,
    age: {
        type: Number,
        min: 0,
        required: true
    },
    bio: String,
    friends: [{
        name: String,
    }],
    present: {
        type: Boolean,
        default: false
    }
})



const Dog = mongoose.model('Dog', dogSchema)



////////////////////////////////





// ROUTES //


app.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find()
        res.status(200).json(dogs)
    } catch (error) {
        res.status(500).send()
    }
})



app.get('/dogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        console.log("Get dog with ID:", id, typeof id)
        
        const dog = await Dog.findById(id)

        console.log("Dog", dog)

        if (!dog) {
            console.log("Dog not found")
            return res.status(404).send()
        }
        
        res.json(dog)
    } catch (error) {
        console.error(error)
        res.status(500).send()
    }
})




app.post('/dogs', async (req, res) => {
    try {
        const newDog = new Dog({
            name: req.body.name,
            nickname: req.body.nickname,
            owner: req.body.owner,
            age: req.body.age,
            bio: req.body.bio,
            // friends: req.body.friends,
            present: req.body.present
        })
        await newDog.save()
        res.status(201).json(newDog )
    } catch (error) {
        res.status(500).send()
    }
})


app.put("/dogs/:id", async (req, res) => {
    try {
      const  id  = req.params.id
      console.log("DETTA", req.params)
      await Dog.findByIdAndUpdate(id,  req.body) // Uppdatera en hund i databasen
      const updatedDog = await Dog.findById(id)
      console.log(updatedDog) // Hämta uppdaterad hund från databasen
      res.status(200).json(updatedDog)
    } catch (error) {
      console.error(error)
      res.status(500).send()
    }
  })


app.delete('/dogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedDog = await Dog.findByIdAndDelete(id)
        if (!deletedDog) {
            return res.status(404).send()
        }
        res.status(200).send()
    } catch (error) {
        res.status(500).send()
    }
})

app.listen(3000)