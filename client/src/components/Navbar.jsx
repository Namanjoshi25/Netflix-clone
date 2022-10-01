import React,{useContext, useState} from 'react'
import "../styles/navbar.scss"
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import {Link } from "react-router-dom"
import {logout} from "../context/authContext/AuthActions"
import { AuthContext } from '../context/authContext/AuthContext';

function Navbar() {
    const [isScrolled, setisScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext)
    window.onscroll=()=>{
        setisScrolled(window.pageYOffset === 0 ? false:true)
        return()=> (window.onscroll=null);
    }
  return (
    <div className={isScrolled ? 'navbar scrolled':"navbar  "}>
        <div className='container'>
            <div className='left'>
                <img src="/images/netflix-logo.png" alt="" />
                <Link to='/' className='link'>
                <span>Homepage</span>
                </Link>
                <Link to='/series' className='link'>
                <span className='navbar-main'>Series</span>
                </Link>
                <Link to='/movies' className='link'>
                <span className='navbar-main'>Movies</span>
                </Link>
                <span>New and Popular</span>
                <span>My List</span>
            </div>
            <div className='right'>
                <Search  className='icon'/>
                <span>KID</span>
                <Notifications className='icon'/>
                <img src="/images/user.png" alt="" />
                <div className='profile'>
                <ArrowDropDown className='icon'/>
                <div className='options'>
                    <span>Settings</span>
                    <span onClick={() => dispatch(logout())}>Logout</span>
                </div>

                </div>
               
            </div>
           
        </div>
    </div>
  )
}

export default Navbar