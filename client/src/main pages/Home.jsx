import React , {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import "../styles/home.scss"
import Feature from "../components/Feature"
import List from '../components/List';
import axios from "axios"


function Home({type}) {
  const [lists,setLists] = useState([])
  const [genre,setGenre] = useState(null)

  useEffect(()=>{
    const getRandomLists= async ()=>{
      try {
        const res = await axios.get(
          `lists${type ? "?type=" + type :'' }${ genre ? "genre="  +genre :"" }`,{
          headers:{
           token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
          }
        })
        setLists(res.data); 
       
      }catch(error) {
        console.log(error)
        
      }
    }
    getRandomLists();
  },[type,genre])
  return (
    <div className='home'>
      <Navbar / >
      <Feature type={type}/>
      {
        lists.map((list)=>(
          <List list={list} />
        ))
      }
    
     
    
    </div>
  )
}

export default Home