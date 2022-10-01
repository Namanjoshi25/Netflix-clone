import { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import "./newList.css";
import {storage} from '../../firebase'
import { useContext } from "react";
import {MovieContext} from "../../context/movieContext/MovieContext"
import {createMovies, getMovies} from "../../context/movieContext/ApiCalls"
import { uploadBytesResumable ,ref, getDownloadURL} from "firebase/storage";
import { ListsContext } from "../../context/listContext/ListsContext";
import { createLists } from "../../context/listContext/ApiCalls";

export default function NewList() {
  const [list,setList]= useState(null)
  const history = useHistory()
  const {dispatch} = useContext(ListsContext)
   const {movies,dispatch:dispatchMovie} = useContext(MovieContext)


   useEffect(()=>{
    getMovies(dispatchMovie)
   },[dispatchMovie])

  const handleChange = (e)=>{
    const value = e.target.value;
    setList({...list,[e.target.name]:value})
  }
  const handleSelect = (e)=>{
    
    let value = Array.from(e.target.selectedOptions,(option)=> option.value)
    setList({...list,[e.target.name]:value})
    
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    createLists(list,dispatch);
    history.push("/lists")
    

   
  }
 


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        
        <div className="addProductItem">
          <label> Title</label>
          <input type="text" placeholder="" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label> Type</label>
          <select name='type' onChange={handleChange}>
            <option >Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
          <div className="addProductItem">
          <label>Content</label>
          <select multiple name='content' onChange={handleSelect} style={{height:"250px"}}>
            {
              movies.map(movie=>(
                <option key={movie._id} value={movie._id}>{movie.title}</option>
              ))
            }
           
          
          </select>
        </div>
        </div>
      
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
          
      </form>
    </div>
  );
}
