import React, { useContext, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { DogBookContext } from './context'
import axios from 'axios'
import FriendPicture from './FriendPictures'


function Profile() {
    const { id } = useParams()
    console.log("ID:", id, typeof id)

    const { dog, setDog, dogs, dogImage, friendDogImage, setFriendList } = useContext(DogBookContext)
    console.log(dog)




    useEffect(() => {
        async function getDogById(id) {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:3000/dogs/${id}`)
                    setDog(response.data)
                    console.log(dog)

                    setFriendList((prevFriendList) => {
                        return prevFriendList.map((friend) => ({
                            ...friend,
                            checked: response.data.friends.some((f) => f._id === friend._id),
                        }))
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }

        getDogById(id)
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

            <span className="hr-line"> <hr /></span>



            <div className="flex friends">

                <FriendPicture friends={dog.friends} dogs={dogs} friendDogImage={friendDogImage} dog={dog} />

            </div>




            <Link to={`/edit/${id}`}>Edit</Link>

            <br />
            <Link to="/">Back</Link>
        </div>

    )
}

export default Profile