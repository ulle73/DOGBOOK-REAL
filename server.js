import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    }],
    present: {
        type: Boolean,
        default: false
    }
});

const Dog = mongoose.model('Dog', dogSchema)


////////////////////////////////





// ROUTES //


app.get('/dogs', async (req, res) => {
    try {
        const dogs = await Dog.find()
        res.status(200).json(dogs)
    } catch (error) {
        res.sendStatus(500)
    }
});


// app.get('/dogs/:id', async (req, res) => {
//     try {
//         const dog = await Dog.findById(req.params.id.toString());
//         console.log(dog)
//         if (!dog) {
//             return res.status(404).json({ error: 'Dog not found' });
//         }
//         res.json(dog);
//     } catch (error) {
//         console.error('Failed to fetch dog:', error);
//         res.status(500).json({ error: 'Failed to fetch dog' });
//     }
// })

app.get('/dogs/:id', async (req, res) => {
    try {
        console.log("Request received for dog with ID:", req.params.id, typeof req.params.id);
        
        const dog = await Dog.findById(req.params.id.toString());
        console.log("Dog found:", dog);

        if (!dog) {
            console.log("Dog not found");
            return res.status(404).json({ error: 'Dog not found' });
        }
        
        res.json(dog);
    } catch (error) {
        console.error('Failed to fetch dog:', error);
        res.status(500).json({ error: 'Failed to fetch dog' });
    }
});



app.post('/dogs', async (req, res) => {
    try {
        const newDog = new Dog({
            name: req.body.name,
            nickname: req.body.nickname,
            age: req.body.age,
            description: req.body.description,
            friends: req.body.friends,
            present: req.body.present
        });
        await newDog.save()
        res.status(201).json(newDog )
    } catch (error) {
        res.sendStatus(500)
    }
});


app.put("/dogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await Dog.findByIdAndUpdate(id, req.body); // Uppdatera en hund i databasen
      const updatedDog = await Dog.findById(id); // Hämta uppdaterad hund från databasen
      res.status(200).json(updatedDog);
    } catch (error) {
      console.error("Failed to update dog:", error);
      res.sendStatus(500);
    }
  })


app.delete('/dogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        const deletedDog = await Dog.findByIdAndDelete(id)
        if (!deletedDog) {
            return res.sendStatus(404)
        }
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

app.listen(3000)