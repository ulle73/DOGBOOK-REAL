import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { DogBookContext } from './context'



function Start() {


    const { dogs, deleteDog } = useContext(DogBookContext)


    return (
        <>
        <div className="container">
            <h1 className="center">DogBook by Ryd</h1>

            <ul>
                {dogs.map((dog) => {
                    return <li key={dog._id}><Link to={`/profile/${dog._id}`} style={{ color: dog.present ? "rgb(1,204,1)" : "red" }}>{dog.name}</Link>
                        <button
                            className="trashcan"
                            onClick={() => deleteDog(dog._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button></li>
                })}
            </ul>

            <Link className="create-button" to="/create">Create Dog</Link>
        </div>
       
        </>
    )
}

export default Start
