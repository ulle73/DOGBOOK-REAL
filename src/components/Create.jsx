import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [newDog, setNewDog] = useState({
    name: "",
    nickname: "",
    owner: "",
    age: 0,
    bio: "",
    friends: [],
    present: false,
  });

  const navigate = useNavigate();

  function saveName(event) {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setNewDog({
      ...newDog,
      [event.target.name]: value,
    });
  }

  async function saveData(event) {
    event.preventDefault();
    try {
      const resp = await axios.post('http://localhost:3000/dogs', newDog);
      navigate("/");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  return (
    <div className="container">
      <h1>Create DOG</h1>
      <form onSubmit={saveData}>
        <input onChange={saveName} type="text" placeholder="name" name="name" required />
        <input onChange={saveName} type="text" placeholder="nickename" name="nickname" required />
        <input onChange={saveName} type="number" placeholder="age" name="age" required />
        <input onChange={saveName} type="text" placeholder="owner" name="owner" required />
        <input onChange={saveName} type="text" placeholder="bio" name="bio" required />
        {/* <input onChange={saveName} type="text" placeholder="friends" name="friends"/> */}
        <label>Present: <input onChange={saveName} type="checkbox" name="present" /></label>

        <input className="submit-button" type="submit" name="Submit" value="Save Info" />
      </form>
      <Link to="/">Back</Link>
    </div>
  );
};

export default Create;
