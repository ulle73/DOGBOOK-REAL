import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Start() {
    const [dogs, setDogs] = useState([])

    useEffect(() => {
        async function getDataBackEnd() {
            try {
                const response = await axios.get('http://localhost:3000/dogs');
                setDogs(response.data);
            } catch (error) {
                console.error('Failed to fetch dogs:', error);
            }
        }

        getDataBackEnd();
    }, [])


    const deleteDog = async (id) => {
        setDogs(dogs.filter((dog) => dog._id !== id));
        await fetch(`http://localhost:3000/dogs/${id}`, { method: "DELETE" });
        // DELETE FRÅN  BACKEND
    };




    return (
        <div>
            <h2>Start</h2>
            
            <ul>
                {dogs.map((dog) => {
                    return <li key={dog.id}><Link to={`/profile/${dog._id}`} style={{ color: dog.present ? "rgb(1,204,1)" : "red" }}>{dog.name}</Link>
                        <button
                            className="trashcan"
                            onClick={() => deleteDog(dog._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button></li>
                })}
            </ul>
            <Link to="/create">Create Dog</Link>
        </div>
    );
}

export default Start;
