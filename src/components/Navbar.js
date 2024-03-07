import React from 'react'
import  { useNavigate } from "react-router-dom";
import {
    MDBNavbar,
    MDBNavbarNav, 
    MDBNavbarItem, 
    MDBContainer,
    MDBNavbarBrand } 
    from "mdb-react-ui-kit"

const Navbar =() => {
    const  navigate = useNavigate();
    return(
        <MDBNavbar expand="lg" dark bgColor="dark">
            <MDBContainer fluid>
                <MDBNavbarBrand tag="span" className="mb-0 h1 fw-bold">
                    Rtk-Query Firebase Blog App
                </MDBNavbarBrand>
                <div style={{float:"right",marginRight:"50px"}}>
                    <MDBNavbarNav className="mb-2 mb-lg-0" fullWidth ={false}>
                        <MDBNavbarItem>
                        <p className="header-test" onClick={() =>navigate("/")}>
                            Home
                            </p>
                        </MDBNavbarItem>
                        <MDBNavbarItem>
                        <p className="header-test"onClick={()=>navigate("/create")}>
                            Create
                            </p>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </div>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Navbar
