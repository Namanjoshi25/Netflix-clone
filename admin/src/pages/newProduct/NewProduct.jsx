import { useState } from "react";
import "./newProduct.css";
import {storage} from '../../firebase'
import { useContext } from "react";
import {MovieContext} from "../../context/movieContext/MovieContext"
import {createMovies} from "../../context/movieContext/ApiCalls"
import { uploadBytesResumable ,ref, getDownloadURL} from "firebase/storage";

export default function NewProduct() {
  const [movie,setMovie]= useState(null)
  const [img,setImg]= useState(null)
  const [imgTitle,setImgTitle]= useState(null)
  const [imgSm,setImgSm]= useState(null)
  const [trailer,setTrailer]= useState(null)
  const [video,setVideo]= useState(null)
  const [Uploaded,setUploaded]=useState(0)


   const {dispatch}  =useContext(MovieContext)

  const handleChange = (e)=>{
    const value = e.target.value;
    setMovie({...movie,[e.target.name]:value})
  }
  const handleSubmit =(e)=>{
    e.preventDefault()
    createMovies(movie,dispatch)
  }
  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: img, label: "img" },
      { file: imgTitle, label: "imgTitle" },
      { file: imgSm, label: "imgSm" },
      { file: trailer, label: "trailer" },
      { file: video, label: "video" },
    ]);
    
  };

 

  
 
  const upload = (items) => {
   
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const storageRef = ref(storage,`/items/${fileName}`);
      console.log(upload);
      
      const uploadTask = uploadBytesResumable(storageRef,item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL( uploadTask.snapshot.ref).then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

 
 

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input 
          type="file" 
          id="file" 
          name="img"
          onChange={(e)=> setImg(e.target.files[0])}
           />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input 
          type="file" 
          id="imgTitle"
           name="imgTitle" 
           onChange={(e)=> setImgTitle(e.target.files[0])}
           />
        </div>
        <div className="addProductItem">
          <label>Thumbnail Image</label>
          <input 
          type="file" 
          id="imgSm"
           name="imgSm" 
           onChange={(e)=> setImgSm(e.target.files[0])}
           />
        </div>
        <div className="addProductItem">
          <label> Movie Title</label>
          <input type="text" placeholder="iron man" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label> Movie Year</label>
          <input type="text" placeholder="year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label> Movie Genre</label>
          <input type="text" placeholder="genre" name="genre" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label> Movie Duration</label>
          <input type="text" placeholder="duration" name="duration" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label> Movie Limit</label>
          <input type="text" placeholder="limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>is Series ?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label> Movie Trailer</label>
          <input 
          type="file" 
          name="trailer" 
          onChange={(e)=> setTrailer(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label> Movie Video</label>
          <input 
          type="file" 
          name="video"
          onChange={(e)=> setVideo(e.target.files[0])}
           />
        </div>{
          Uploaded ===5 ? 
          <button className="addProductButton" onClick={handleSubmit}>Create</button>
          :
          <button className="addProductButton" onClick={handleUpload}>Upload</button>
        }
       
      </form>
    </div>
  );
}
