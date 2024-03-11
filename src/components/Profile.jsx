import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'


function Profile({ dogs }) {
    const { id } = useParams()
    console.log("ID:", id, typeof id)

    const [dogImage, setDogImage] = useState("")
    const [friendDogImage, setFriendDogImage] = useState("")
    const [dog, setDog] = useState({

    })


    useEffect(() => {
        async function fetchDog() {
            try {
                const get = await fetch("https://dog.ceo/api/breeds/image/random")
                const data = await get.json()
                setDogImage(data.message)

                const friendGet = await fetch("https://dog.ceo/api/breeds/image/random")
                const friendData = await friendGet.json()
                setFriendDogImage(friendData.message)


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
        <div className="container">
            <img className="dog-image center" src={dogImage} />
            <h1 className="center dog-name">{dog.name} </h1>
            <p className="center nickname"> {dog.nickname}</p>
            {/* <p >Owner: {dog.owner}</p> */}
            <span className="flex"><i className="fa-solid fa-cake-candles fa-xl center cake"></i><h1 className="center age">{dog.age}</h1></span>

            <p className="center bio">{dog.bio}</p>
            <p className="center">Present: {dog.present ? 'Yes' : 'No'}</p>
            {/* <span className="flex"><p>Friends: </p>

<ul>
{dog.friends && dog.friends.length > 0 ? 
dog.friends
.filter(friend => dogs.some(dog => dog._id === friend._id))
.map((friend, index) => (
<div key={index}>
<img className="dog-image-friend" src={dogImage}  />
<li><Link to={`/profile/${friend._id}`}>{friend.name}</Link></li>
</div>
)) 
: 'No friends'}
</ul></span>  */}
<div> <hr /></div>

            {/* <p>Friends: </p> */}

            <div className="flex friends">
                {dog.friends && dog.friends.length > 0 ?
                    dog.friends
                        .filter(friend => dogs.some(dog => dog._id === friend._id))
                        .map((friend, index) => (
                            <div key={index}>
                                <div className="center">
                                    <Link to={`/profile/${friend._id}`}>
                                        <img className="dog-image-friend" src={friendDogImage} />
                                        <div>{friend.name}</div>
                                    </Link>
                                </div>
                            </div>
                        ))
                    : 'No friends'}
            </div>




            <Link to={`/edit/${id}`}>Edit</Link>
          
            <br />
            <Link to="/">Back</Link>
        </div>

    )
}

export default Profile