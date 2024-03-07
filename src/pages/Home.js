import React, { useEffect } from 'react'
import { useFetchBlogsQuery,useDeleteBlogMutation } from '../services/blogsApi';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBIcon, MDBRow,MDBCardTitle,MDBCardText,MDBCol } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import Spinner from "../components/Spinner"
import { toast } from 'react-toastify';

const Home = () => {
    const {data,isLoading,isError,error} = useFetchBlogsQuery();
    const [ deleteBlog ] = useDeleteBlogMutation();

    useEffect(()=>{
        isError && toast.error(error);
    },[isError]);

    if(isLoading){
        return <Spinner/>
    }

    const excerpt = (str,count) => {
        if(str.length > count){
            return str.substring(0,count) + "...";
        }
        return str;
    };

    const handleDelete = async(id) => {
        if(window.confirm("Are you sure you want to delete")){
           await deleteBlog(id);
           toast.success("Blog deleted successfully")
        }
    }
    return (
        <div style = {{ margin:"auto",padding:"15px",maxWidth:"1200px",alignContent:"center"}}>
            <MDBRow className ="row-cols-1 row-cols-md-3 g-4">
                {data?.map((item) => (
                    <MDBCol key={item.id}>
                        <MDBCard className ="h-100">
                            <MDBCardImage src={item.imgURL} alt={item.title} position="top"/>
                            <MDBCardBody>
                                <MDBCardTitle className ="text-start">{item.title}</MDBCardTitle>
                                <MDBCardText className ="text-start">
                                    {excerpt(item.description,80)}
                                    <Link to={`/detail/${item.id}`}>Read More</Link>
                                    </MDBCardText>
                                <div style={{ marginLeft: '5px', float: 'right' }}>
                                    <button
                                        className="btn btn-danger mt-1"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/update/${item.id}`}>
                                        <button
                                            className="btn btn-primary mt-1"
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                ))}
            </MDBRow>
        </div>
    )
}

export default Home