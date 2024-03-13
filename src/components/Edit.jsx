import React, { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DogBookContext } from './context'
import axios from 'axios'

function Edit() {

  const { id } = useParams()

  const {  dog,  saveName, friendList  } = useContext(DogBookContext)


  const navigate = useNavigate()

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
    <div className="container">
      <h1 className="center">Edit Dog</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={dog.name} onChange={saveName} placeholder='name' required />
        <input type="text" name="nickname" value={dog.nickname} onChange={saveName} placeholder='nicknam' />
        <input type="text" name="owner" value={dog.owner} onChange={saveName} placeholder='owner' required />
        <input type="number" name="age" value={dog.age} onChange={saveName} placeholder='age' required />
        <input type="text" name="bio" value={dog.bio} onChange={saveName} placeholder='bio' />
        <label>Present: <input type="checkbox" name="present" checked={dog.present} onChange={saveName} /></label>
        <h4>Add friends:</h4>
        {friendList
          .filter(self => self._id !== dog._id)
          .map((friend) => {
            return <label key={friend._id}><input type="checkbox" name="friends" value={friend._id} onChange={saveName} checked={dog.friends.some((f) => f._id === friend._id)} />{friend.name}</label>
          })}


        <button type="submit">Save</button>

      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default Edit
