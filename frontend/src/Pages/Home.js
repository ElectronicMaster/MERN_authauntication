import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

function Home() {
  const [loggedInUser,setLoggedUser] = useState("")
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    setLoggedUser(localStorage.getItem("loggedInUser"))
  },[])

  const handlelogout = (e) => {
    localStorage.removeItem('token')
    localStorage.removeItem('loggedInUser')
    
    handleSuccess("Logged out")

    setTimeout(() => {
      navigate("/login")
    },1000)
  }
  
  const fetchProduct = async() => {
    try{
      const response = await fetch("http://localhost:5000/products",{
        method: "GET",
        headers: {
          'Authorization' : localStorage.getItem('token')
        }
      })

      const result = await response.json()
      console.log(result)
      setProducts(result)

    }catch(err){
      handleError(err)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handlelogout}>Logout</button>
      <div>
        {
          products.map((element) => (
            <li key={element.name}>Name: {element.name} Price: {element.price}</li>
          ))
        }
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Home