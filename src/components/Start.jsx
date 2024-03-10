import React from 'react'
import { Link } from 'react-router-dom'



function Start({ dogs, setDogs, friendList, setFriendList}) {



    const deleteDog = async (id) => {
        setDogs(dogs.filter((dog) => dog._id !== id))
        
        setFriendList((prevFriendList) => prevFriendList.filter((friend) => friend._id !== id))

        await fetch(`http://localhost:3000/dogs/${id}`, { method: "DELETE" })
console.log(friendList)
    }




    return (
        <div>
            <h2>DogBook by Ryd</h2>
            
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
            
            <Link to="/create">Create Dog</Link>
        </div>
    )
}

export default Start
