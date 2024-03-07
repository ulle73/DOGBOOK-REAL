import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { id } = useParams();
  const [dog, setDog] = useState({
    name: '',
    nickname: '',
    owner: '',
    age: 0,
    bio: '',
    present: false
  });

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchDog() {
      try {
        const response = await axios.get(`http://localhost:3000/dogs/${id}`);
        setDog(response.data);
        console.log(dog)
      } catch (error) {
        console.error('Failed to fetch dog:', error);
      }
    }
    
    fetchDog();
  }, [id]);

  function saveName(event) {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setDog({
      ...dog,
      [event.target.name]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/dogs/${id}`, dog);
      console.log('Dog updated:', response.data);
      navigate("/")
    } catch (error) {
      console.error('Failed to update dog:', error);
    }
  };

  return (
    <div>
      <h2>Edit Dog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={dog.name} onChange={saveName} required />
        <input type="text" name="nickname" value={dog.nickname} onChange={saveName} />
        <input type="text" name="owner" value={dog.owner} onChange={saveName} required />
        <input type="number" name="age" value={dog.age} onChange={saveName} required />
        <textarea name="bio" value={dog.bio} onChange={saveName} />
        <label>Present: <input type="checkbox" name="present" checked={dog.present} onChange={saveName} /></label>
        <button type="submit">Save</button>
      </form>
      <Link to="/">Back</Link>
    </div>
  );
}

export default Edit;
