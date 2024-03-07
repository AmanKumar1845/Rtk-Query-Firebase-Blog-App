import React from 'react'
import { MDBSpinner } from 'mdb-react-ui-kit'

function Spinner() {
    return (
        <>
        <MDBSpinner className="me-2 mt-5" style={{width:"3rem",height:"3rem"}}>
            <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
        </>
    )
}

export default Spinner
