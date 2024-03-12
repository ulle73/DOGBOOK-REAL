import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { DogBookContext } from './context'

const Create = () => {


  const { saveData, saveDog } = useContext(DogBookContext)

  

  

  return (
    <div className="container">
      <h1>Create DOG</h1>
      <form onSubmit={saveData}>
        <input onChange={saveDog} type="text" placeholder="name" name="name" required />
        <input onChange={saveDog} type="text" placeholder="nickename" name="nickname" required />
        <input onChange={saveDog} type="text" placeholder="owner" name="owner" required />
        <input onChange={saveDog} type="number" placeholder="age" name="age" required />
        <input onChange={saveDog} type="text" placeholder="bio" name="bio" required />
        <p>Present: <input onChange={saveDog} type="checkbox" name="present" /></p>

        <input className="submit-button" type="submit" name="Submit" value="Save Info" />
      </form>
      <Link to="/">Back</Link>
    </div>
  )
}

export default Create
