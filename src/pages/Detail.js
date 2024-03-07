import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBCardTitle, MDBTypography } from 'mdb-react-ui-kit';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useFetchBlogQuery } from '../services/blogsApi';
import { toast } from 'react-toastify';
import { skipToken } from '@reduxjs/toolkit/query';

const Detail = () => {
    const {id} =useParams();
    const { data:blog, error, isError} = useFetchBlogQuery(id ? id : skipToken);

    useEffect(() => {
        isError && toast.error(error);
    },[isError]);

    return (
        <>
        <MDBCard className='md-3 '>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <MDBCardImage 
                position='top' 
                src={blog?.imgURL} 
                alt={blog?.title} 
                style={{ height:'700px', width:'600px' }}
                />
            </div>

            <MDBCardBody>
                <MDBCardTitle className="h3 fw-bold">{blog?.title}</MDBCardTitle>
                <MDBCardText className='text-start'>
                    <span className='fw-bold'>Created at - &nbsp;</span>
                    <small className='text-muted h6'>
                        {blog?.timestamp.toDate().toLocaleString()}
                    </small>
                </MDBCardText>
                <MDBTypography blockquote className="text-start md-0">
                    {blog?.description}
                </MDBTypography>
            </MDBCardBody>
        </MDBCard>
        </>
    )
}

export default Detail
