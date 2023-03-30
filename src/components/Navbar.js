import { Component } from "react";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";
import './NavbarItems.css'


class Navbar extends Component {
  state = {clicked: false};
  handleClick = () => {
    this.setState({clicked: !this.state.clicked})
  }
  render(){
    return (
      <nav className="NavbarItems">
        <a href="/" className="navbar-logo fa-solid fa-house-user">Home</a>
        
        <div className="menu-icons" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.path} className={item.cName} onClick={item.onClick}>
                  <i className={item.icon}></i> {item.title} 
                </a>
              </li>
            )
          })}
          {/* <button>
            <Link to= "/signin"> Sign In</Link>
          </button> */}
        </ul>
      </nav>
    )
  }
}
 
// import React from 'react';
// import {
//   Nav,
//   NavLink,
//   NavMenu,
//   NavBtn,
//   NavBtnLink
// } from './NavbarElements';

// const Navbar = () => {
//   return (
//     <>
//       <Nav>
//         <NavLink to='/'>
//           <i className="fab fa-react"></i>
//         </NavLink>
//         <NavMenu>
//           <NavLink to='/meja' activeStyle>
//             Meja
//           </NavLink>
//           <NavLink to='/menu' activeStyle>
//             Menu
//           </NavLink>
//           <NavLink to='/order' activeStyle>
//             Order
//           </NavLink>
//           {/* Second Nav */}
//           {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
//         </NavMenu>
//         <NavBtn>
//           <NavBtnLink to='/signin'>Sign In</NavBtnLink>
//         </NavBtn>
//       </Nav>
//     </>
//   );
// };

export default Navbar;

// import { Component } from "react"
// import React from 'react'
// import { MenuItems } from "./MenuItems"
// import { Button } from "./Button"
// import "./Navbar.css"

// class Navbar extends Component {
//   state = { clicked: false }

//   handleClick = () => {
//     this.setState({clicked: !this.state.clicked})
//   }

//   render() {
//     return(
//       <nav className="NavbarItems">
//         <h1 className="navbar-logo">
//           React
//           <i className="fab fa-react"></i>
//         </h1>
//         <div className="menu-icon" onClick={this.handleClick}>
//           <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
//         </div>
//         <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
//           {MenuItems.map((item, index) => {
//             return(
//               <li key={index}>
//                 <a className={item.cName} href={item.path}>
//                   {item.title}
//                 </a>
//               </li>
//             )
//         })}
//         </ul>
//         <Button>Sign Up</Button>
//       </nav>
//     )
//   }
// }

// export default Navbar

// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';
// import React, {useState} from 'react';
// import { Link } from 'react-router-dom';
// import { SidebarData } from './SidebarData';
// import DehazeIcon from '@mui/icons-material/Dehaze';

// import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
// import "../js/scripts.js"
// import "../css/styles.css"

// export default function Navbar(){

//     return(
//         <div class="d-flex" id="wrapper">
//             <div class="border-end bg-white" id="sidebar-wrapper">
//                 <div class="sidebar-heading border-bottom bg-light">Start Bootstrap</div>
//                 <div class="list-group list-group-flush">
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Dashboard</a>
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Shortcuts</a>
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Overview</a>
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a>
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a>
//                     <a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
//                 </div>
//             </div>
            
            
//                 <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
//                     <div class="container-fluid">
//                         <button class="btn btn-primary" id="sidebarToggle">Toggle Menu</button>
//                         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
//                         <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                             <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
//                                 <li class="nav-item active"><a class="nav-link" href="#!">Home</a></li>
//                                 <li class="nav-item"><a class="nav-link" href="#!">Link</a></li>
//                                 <li class="nav-item dropdown">
//                                     <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
//                                     <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
//                                         <a class="dropdown-item" href="#!">Action</a>
//                                         <a class="dropdown-item" href="#!">Another action</a>
//                                         <div class="dropdown-divider"></div>
//                                         <a class="dropdown-item" href="#!">Something else here</a>
//                                     </div>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </nav>
//         </div>
    

        // <>
        //     <div className='navbar'>
        //         <Link to="#" className='menu-bars'>
        //             <DehazeIcon onClick={showSidebar}/>
        //         </Link> 
        //     </div>
        //     <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        //         <ul className='nav-menu-items' onClick={showSidebar}>
        //             <li className='navbar-toggle'>
        //             <Link to="#" className='menu-bars'>
        //                 icon
        //             </Link>
        //             </li>
        //             {SidebarData.map((item, index) => {
        //                 return (
        //                     <li key={index} className={item.cName}>
        //                         <Link to={item.path}>
        //                             {item.icon}
        //                             <span>{item.title}</span>
        //                         </Link>
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //     </nav>
        // </>

        // <Nav bg="warning">
        //     <Nav.Item>
        //         <Nav.Link href="/">
        //             Home
        //         </Nav.Link>
        //     </Nav.Item>
        //     <Nav.Item>
        //         <Nav.Link href="/menu">
        //             Menu
        //         </Nav.Link>
        //     </Nav.Item>
        //     <NavDropdown title="Dropdown" id="nav-dropdown">
        //         <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
        //         <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
        //         <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        //     </NavDropdown>
        // </Nav>
//     )

// }
