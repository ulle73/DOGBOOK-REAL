import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
    const { id } = useParams();
    console.log("ID:", id, typeof id);

    const [dogImage, setDogImage] = useState("")
    const [dog, setDog] = useState({
      
    });

    useEffect(() => {
        async function fetchDog() {
            try {
                const get = await fetch("https://dog.ceo/api/breeds/image/random")
                const data = await get.json()
                setDogImage(data.message)

                const response = await axios.get(`http://localhost:3000/dogs/${id}`);
                console.log("Resp", response);
                setDog(response.data);
            
            } catch (error) {
                console.error(error);
            }
        }

        fetchDog();
    }, [id]);


    return (
        <div>
            <h2>{dog.name} Profile</h2>
            <img className="dog-image" src={dogImage} />
            <p>Nickname: {dog.nickname}</p>
            <p>Owner: {dog.owner}</p>
            <p>Age: {dog.age}</p>
            <p>Bio: {dog.bio}</p>
            <p>Present: {dog.present ? 'Yes' : 'No'}</p>
            <Link to="/">Back</Link>
        </div>

    );
}

export default Profile