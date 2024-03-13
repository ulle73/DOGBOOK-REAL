import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function FriendPicture({ friends, dogs, dog }) {
    const [friendImages, setFriendImages] = useState([])

    useEffect(() => {
        const fetchFriendImages = async () => {
            const images = []
            console.log(images.length)
            friends.forEach(async (friend) => {
                try {
                    const response = await axios.get(`https://dog.ceo/api/breeds/image/random`)
                    images.push({ id: friend._id, image: response.data.message })
                    setFriendImages([...images])
                } catch (error) {
                    console.error(error)
                }
            })
        }

        fetchFriendImages()
    }, [friends])

    return (
        <>
            {friends && friends.length > 0 ? (
                friends
                    .filter(friend => dogs.some(dog => dog._id === friend._id))
                    .map((friend, index) => {
                        return (
                            <div key={index}>
                                <div className="center">
                                    <Link to={`/profile/${friend._id}`}>
                                        <img className="dog-image-friend" src={friendImages.find(img => img.id === friend._id)?.image} />
                                        <div className="friend-name">{friend.name}</div>
                                    </Link>
                                </div>
                            </div>)})) : ('No friends')}
        </>
    )
}

export default FriendPicture
