import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
// import Edit from './Edit'

function Profile() {
    const { id } = useParams()
    console.log("ID:", id, typeof id)

    const [dogImage, setDogImage] = useState("")
    const [dog, setDog] = useState({

    })
    const [allDogs, setAllDogs] = useState([])


    useEffect(() => {
        async function getDataBackEnd() {
            try {
                const response = await axios.get('http://localhost:3000/dogs')
                setAllDogs(response.data)
            } catch (error) {
                console.error('Failed to fetch dogs:', error)
            }
        }

        getDataBackEnd()
    }, [])

    useEffect(() => {
        async function fetchDog() {
            try {
                const get = await fetch("https://dog.ceo/api/breeds/image/random")
                const data = await get.json()
                setDogImage(data.message)

                const response = await axios.get(`http://localhost:3000/dogs/${id}`)
                console.log("Resp", response)
                setDog(response.data)

            } catch (error) {
                console.error(error)
            }
        }

        fetchDog()
    }, [id])


    return (
        <div>
            <h2>{dog.name} Profile</h2>
            <img className="dog-image" src={dogImage} />
            <p>Nickname: {dog.nickname}</p>
            <p>Owner: {dog.owner}</p>
            <p>Age: {dog.age}</p>
            <p>Bio: {dog.bio}</p>
            <p>Present: {dog.present ? 'Yes' : 'No'}</p>
            <p>Friends: </p>

            <ul>{dog.friends && dog.friends.length > 0 ? dog.friends.filter(friend => allDogs.some(d => d._id === friend._id))
            .map((friend, index) => 
            (<li key={index}>{friend.name}</li> )) 
            : 'No friends'}

            </ul>


            <Link to={`/edit/${id}`}>Edit</Link>
            <br />
            <br />
            <Link to="/">Back</Link>
        </div>

    )
}

export default Profile