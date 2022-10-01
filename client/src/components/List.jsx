import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import React, { useRef,useState } from 'react'
import '../styles/list.scss'
import ListItem from './ListItem'

function List({list}) {
    const [slideNumber, setslideNumber] = useState(0);
    const [clickLimit,setClickLimit] =useState(window.innerWidth/230)
    
    console.log(clickLimit);
    const listRef= useRef()

    const handleClick= (direction )=>{
        let distance = listRef.current.getBoundingClientRect().x -50

        if (direction==="left"&& slideNumber > 0){
            setslideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`

        }if(direction==="right" && slideNumber < 10 - clickLimit){
            setslideNumber(slideNumber +1)
            listRef.current.style.transform =  `translateX(${-230 + distance}px)`
        }

    }


  return (
    <div className='list'>
     <span className='listTitle'>
         {list.title}
     </span>
     <div className='wrapper'>
         { slideNumber===0? "":  <ArrowBackIosOutlined className='sliderArrow left' onClick={()=>{handleClick("left")}} />}
       
         <div className="container" ref={listRef}>
            {
                list.content.map((item,i)=>(
                    <ListItem index={i}  item={item}/>
                ))
            }
         
          
            
             
         </div>
         <ArrowForwardIosOutlined className='sliderArrow right'onClick={()=>{handleClick("right")}} />
     </div>
    </div>
  )
}

export default List