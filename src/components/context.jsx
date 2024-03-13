import React, { createContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const DogBookContext = createContext()

export const DogProvider = ({children}) => {
    const { id } = useParams()
    console.log(id)
    console.log("ID:", id, typeof id);
    const navigate = useNavigate()


    const [friendList, setFriendList] = useState([])
    // const [dog, setDog] = useState({})
    const [dog, setDog] = useState({
    name: '',
    nickname: '',
    owner: '',
    age: 0,
    bio: '',
    present: false,
    friends: []
  })
    const [dogs, setDogs] = useState([])
    const [newDog, setNewDog] = useState({})
    const [dogImage, setDogImage] = useState("")
    const [friendDogImage, setFriendDogImage] = useState("")
  
   
    /////////////////////////////////////


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



    useEffect(() => {
      async function getDogImages() {
          try {
              const response = await axios.get("https://dog.ceo/api/breeds/image/random");
              setDogImage(response.data.message);
  
              const friendResponse = await axios.get("https://dog.ceo/api/breeds/image/random");
              setFriendDogImage(friendResponse.data.message);
          } catch (error) {
              console.error(error);
          }
      }
  
      getDogImages();
  }, []);



/// FUNKTIONER ///


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




      function saveDog(event) {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value
        setNewDog({
          ...newDog,
          [event.target.name]: value,
        })
      }
    
      async function saveData(event) {
        event.preventDefault()
        try {
          const resp = await axios.post('http://localhost:3000/dogs', newDog)
          console.log(resp.data)
          setDogs([...dogs, resp.data])
          setFriendList([...friendList, resp.data])
          navigate("/")
        } catch (error) {
          console.error(error)
        }
      }




      const deleteDog = async (id) => {
        setDogs(dogs.filter((dog) => dog._id !== id))

        setFriendList((prevFriendList) => prevFriendList.filter((friend) => friend._id !== id))

        await fetch(`http://localhost:3000/dogs/${id}`, { method: "DELETE" })
        console.log(friendList)
    }


    const props = {
        friendList,
        setFriendList,
        dog,
        setDog,
        dogs,
        setDogs,
        newDog,
        setNewDog,
        dogImage,
        setDogImage,
        friendDogImage,
        setFriendDogImage,
        saveName,
        saveDog,
        saveData,
        deleteDog,
        
      }
    
      return (
        <DogBookContext.Provider value={props}>
          {children}
        </DogBookContext.Provider>
      )




    
}


