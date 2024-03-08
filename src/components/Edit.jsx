import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Edit({ friendList, setFriendList }) {

  const { id } = useParams()
  const [dog, setDog] = useState({
    name: '',
    nickname: '',
    owner: '',
    age: 0,
    bio: '',
    present: false,
    friends: []
  })

  const navigate = useNavigate()


useEffect(() => {
    async function fetchDog() {
        try {
            const response = await axios.get(`http://localhost:3000/dogs/${id}`)
            setDog(response.data)
            console.log(dog)

        
            setFriendList((prevFriendList) => {
                return prevFriendList.map((friend) => ({
                    ...friend,
                    checked: response.data.friends.some((f) => f._id === friend._id),
                }))
            })
        } catch (error) {
            console.error('Failed to fetch dog:', error)
        }
    }

    fetchDog()
}, [id])

function saveName(event) {
    const { name, value, checked } = event.target
    const newValue = event.target.type === "checkbox" ? checked : value

    if (name === "friends") {
        const friendId = event.target.value
        const friend = friendList.find(friend => friend._id === friendId)
        console.log("friend:", friend)

        if (!checked) {
           
            const updatedFriends = dog.friends.filter(friend => friend._id !== friendId)
            setDog({
                ...dog,
                friends: updatedFriends,
            })
        } else {
            const updatedFriends = [...dog.friends, friend]
            setDog({
                ...dog,
                friends: updatedFriends,
            })
        }
    } else {
        setDog({
            ...dog,
            [name]: newValue,
        })
    }
}




  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.put(`http://localhost:3000/dogs/${id}`, dog)
      console.log('dog updated:', response.data)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h2>Edit Dog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={dog.name} onChange={saveName} placeholder='name' required />
        <input type="text" name="nickname" value={dog.nickname} onChange={saveName} placeholder='nicknam' />
        <input type="text" name="owner" value={dog.owner} onChange={saveName} placeholder='owner' required />
        <input type="number" name="age" value={dog.age} onChange={saveName} placeholder='age' required />
        <input type="text" name="bio" value={dog.bio} onChange={saveName} placeholder='bio' />
        <label>Present: <input type="checkbox" name="present" checked={dog.present} onChange={saveName} /></label>
        <h4>Add friends:</h4>
        {friendList.map((friend) => {
          return <label key={friend._id}><input type="checkbox" name="friends" value={friend._id} onChange={saveName} checked={dog.friends.some((f) => f._id === friend._id)} />{friend.name}</label>   
        })}

        <button type="submit">Save</button>
     
      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default Edit
