import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import axios from 'axios';
import React , {useState,useEffect} from 'react'
import '../styles/listitem.scss'

import { Link } from 'react-router-dom';

function ListItem({index,item}) {
    const [isHovered,setisHovered] = useState(false)
    const [movie,setMovie] = useState([])
    console.log(movie);
   
    useEffect(() => {
        const getMovie=async ()=>{
            try {
                const res = await axios.get("/movies/find/" + item ,{
                    headers:{
                        token:"Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
                    }
                })
                setMovie(res.data)
            } catch (error) {
                console.log(error)
            }
        }
      getMovie();
    }, [item]);
  return (
    <Link to="/video" state={{ movie:movie }}>
  
    <div className='listItem' 
    onMouseEnter={()=>setisHovered(true)} 
    onMouseLeave={()=>setisHovered(false)}
     style={{left: isHovered && index * 225 - 50 + index*2.5}} 
    >
        <img src={movie.imgSm} alt="" />
        {isHovered && (
            <>
        <video src={movie.trailer} autoPlay={true} type="video/mp4" loop /> 
        <div className="itemInfo">
            <div className="icons">
                <PlayArrow className='icon'/>
                <Add className='icon'/>
                <ThumbUpAltOutlined className='icon'/>
                <ThumbDownAltOutlined className='icon'/>
            </div>
            <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className='limit '>{movie.limit}</span>
                <span>{movie.year}</span>
            </div>
            <div className="desc">
               {movie.desc}
            </div>
            <div className="genre">
                {movie.genre}
            </div>
        </div>
        </>
        )}
        </div>
        </Link>
  )
}

export default ListItem