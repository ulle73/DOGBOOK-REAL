// import React from 'react'
// import { Link } from 'react-router-dom'
// import axios from 'axios'


// function FriendPicture ({ friends, dogs, friendDogImage }) {




//         return (
//             <>
//       {friends && friends.length > 0 ? (
//         friends
//           .filter(friend => dogs.some(dog => dog._id === friend._id))
//           .map((friend, index) => (
//             <div key={index}>
//               <div className="center">
//                 <Link to={`/profile/${friend._id}`}>
//                   <img className="dog-image-friend" src={friendDogImage}  />
//                   <div>{friend.name}</div>
//                 </Link>
//               </div>
//             </div>
//           ))
//       ) : (
//         'No friends'
//       )}
//     </>
//         );
//       }

//       export default FriendPicture;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function FriendPicture({ friends,  dogs }) {
    const [friendImages, setFriendImages] = useState([]);

    useEffect(() => {
        const fetchFriendImages = async () => {
            const images = [];
            friends.forEach(async (friend) => {
                try {
                    const response = await axios.get(`https://dog.ceo/api/breeds/image/random`);
                    images.push({ id: friend._id, image: response.data.message });
                    setFriendImages([...images]); // Uppdatera state efter varje iteration
                } catch (error) {
                    console.error(error);
                }
            });
        };

        fetchFriendImages();
    }, [friends])

    return (
        <>
            {friends && friends.length > 0 ? (
                friends
                    .filter(friend => dogs.some(dog => dog._id === friend._id))
                    .map((friend, index) => (
                        <div key={index}>
                            <div className="center">
                                <Link to={`/profile/${friend._id}`}>
                                    <img className="dog-image-friend" src={friendImages.find(img => img.id === friend._id)?.image} alt={`Friend ${index}`} />
                                    <div>{friend.name}</div>
                                </Link>
                            </div>
                        </div>
                    ))
            ) : (
                'No friends'
            )}
        </>
    );
}

export default FriendPicture;
