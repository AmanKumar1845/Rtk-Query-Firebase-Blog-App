import {createApi,fakeBaseQuery} from "@reduxjs/toolkit/query/react"
import {addDoc,collection,serverTimestamp,getDocs ,deleteDoc ,doc, getDoc,updateDoc} from "firebase/firestore"
import {db} from "../firebase"

export const blogApi=createApi({
    reducerPath: 'blogApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        fetchBlogs:builder.query({
            async queryFn(){
                try{
                    const blogRef = collection(db,"blogs")
                    const querySnapshot = await getDocs(blogRef)
                    let blogs = []
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id:doc.id,
                            ...doc.data()
                        })
                    });
                    return{data:blogs}
                }catch(err){
                    return {error:err}

                }
            },
            providesTags:["Blog"]

        }),
        fetchBlog:builder.query({
            async queryFn(id){
                try{
                    const decRef = doc(db,"blogs",id)
                    const snapshot = await getDoc(decRef);
                    return {data: snapshot.data() };
                }catch(err){
                    return { error:err }
                }
            }

        }),
        addBlog:builder.mutation({
            async queryFn(data){
                try{
                    await addDoc(collection(db,"blogs"),{
                        ...data,
                        timestamp:serverTimestamp()
                    })
                    return {data:"ok"}
                }catch(err){
                    return{error: err}
                }
               
            },
            invalidatesTags:["Blog"]
        }),
        deleteBlog:builder.mutation({
            async queryFn(id){
                try{
                    await deleteDoc(doc(db,"blogs",id))
                    return {data:"ok"}
                }catch(err){
                    return{error: err}
                }
            },
            invalidatesTags:["Blog"]
        }),
        updateBlog:builder.mutation({
            async queryFn({id, data}){
                try{
                    await updateDoc(doc(db,"blogs",id),{
                    ...data,
                    timestamp:serverTimestamp()
                    });
                    return {data:"ok"}
                }catch(err){
                    return{error:err}
                }
            },
            invalidatesTags:["Blog"]
        })
    })
})
       
export const {useFetchBlogsQuery,useAddBlogMutation ,useDeleteBlogMutation, useFetchBlogQuery ,useUpdateBlogMutation} = blogApi;