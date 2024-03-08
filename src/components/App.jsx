import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Start from './Start'
import Create from './Create'
import Profile from './Profile'
import Edit from './Edit'
import axios from 'axios'

function App() {
  const[friendList, setFriendList] = useState([])

  const [dogs, setDogs] = useState([])

  useEffect(() => {
      async function getDataBackEnd() {
          try {
              const response = await axios.get('http://localhost:3000/dogs')
              setDogs(response.data)
              setFriendList(response.data)
          } catch (error) {
              console.error('Failed to fetch dogs:', error)
          }
      }

      getDataBackEnd()
  }, [])




  return (
    <Router>
   

        <Routes>
          <Route path="/" element={<Start dogs={dogs} setDogs={setDogs} friendList={friendList} setFriendList={setFriendList}/>} />
          <Route path="/create" element={<Create dogs={dogs} setDogs={setDogs} friendList={friendList} setFriendList={setFriendList}/>} />
          <Route path="/profile/:id" element={<Profile dogs={dogs}/>} />
          <Route path="/edit/:id" element={<Edit friendList={friendList} setFriendList={setFriendList}/>} />
        </Routes>
   
    </Router>
  )
}

export default App
