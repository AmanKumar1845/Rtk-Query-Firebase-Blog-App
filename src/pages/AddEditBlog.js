import { MDBTextArea, MDBBtn ,MDBCard,MDBCardBody,MDBValidation,MDBValidationItem,MDBInput} from 'mdb-react-ui-kit';
import React ,{useState, useEffect}from 'react';
import {storage} from "../firebase"
import { ref ,uploadBytesResumable ,getDownloadURL} from "firebase/storage"; 
import { useNavigate } from 'react-router-dom';
import { useAddBlogMutation ,useFetchBlogQuery ,useUpdateBlogMutation} from '../services/blogsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query';

const initialStore = {
    title: " ",
    desription:" "
}

const AddEditBlog = () =>{
    const [data, setData] = useState(initialStore);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [ addBlog ] = useAddBlogMutation()
    const navigate = useNavigate();
    const {id} = useParams();
    const {data:blog} = useFetchBlogQuery(id ? id:skipToken);
    const [ updateBlog ] =useUpdateBlogMutation()

    const {title, description} = data;

    useEffect(() => {
        if(id && blog){
            setData({...blog})
        }
    },[id,blog])

    useEffect(() => {
        const uploadFile =() => {
            const storageRef = ref(storage,file.name)
            const uploadTask = uploadBytesResumable(storageRef,file)
     
            uploadTask.on(
                "state_changed", 
                (snapshot) => {
                const progress = 
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log("Upload is " + progress + "% done")
                setProgress(progress)
                switch(snapshot.state){
                    case "paused":
                        console.log("Upload is paused")
                        break;
                    case "running":
                        console.log("Upload is running")
                        break;
                        default:
                        break
                }
    
        },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    toast.info("Image Upload Successfully...")
                    setData((prev) => ({...prev,imgURL:downloadURL}))
    
                })
            })
        }
        file && uploadFile()
    },[file])
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title && description && description){
            if(!id){
            await addBlog(data);
            toast.success("Blogs Added Successfully")
            navigate("/")
            }else{
                await updateBlog({id,data});
                toast.success("Blogs Updated Successfully")
                navigate("/")
            }
        }
    }
    
    return (
        <div style={{
            margin:"auto",
            padding:"20px",
            maxWidth:"450px",
            alignContent:"center",
            marginTop:"120px",
        }} className ="container">
            <MDBCard alignment="center">
                <h4 className="fw-bold">Create Blog</h4>
                <MDBCardBody>
                    <MDBValidation className ="row g-3" noValidate onSubmit={handleSubmit}>
                        <MDBValidationItem 
                        className='col-md-12' 
                        feedback="please provide title"
                        invalid
                        >
                            <MDBInput
                                label="Title"
                                type="text"
                                value={title}
                                name="title"
                                onChange={handleChange}
                                className="form-control"
                                rows={4}
                                required
                                />
                        </MDBValidationItem>

                        <MDBValidationItem 
                        className='col-md-12' 
                        feedback="please provide description"
                        invalid
                        >
                            <MDBTextArea
                                label="Description"
                                type="text"
                                value={description}
                                name="description"
                                onChange={handleChange}
                                className="form-control"
                                required
                               />
                            
                        </MDBValidationItem>
                        <div className="col-md-12">
                            <MDBInput
                            type="file" onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className='col-12'>
                            <MDBBtn style ={{ width:"100%" }} 
                            disabled ={progress !== null && progress <100}
                            >
                                Submit
                            </MDBBtn>
                        </div>

                    </MDBValidation>
                </MDBCardBody>

            </MDBCard>
        </div>
    )
}

export default AddEditBlog
