import { Appbar } from "../components/Appbar"
import axios from 'axios'
import { CreateBlogInput } from '@iamviky/medium-common'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from "../config"

export const Publish = () =>{

    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<CreateBlogInput>({
        title: "",
        content: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please Login first");
          navigate("/signin"); // Navigate only when the component is mounted
        }
      }, [navigate]);


    return <div>
        <Appbar></Appbar>
        <div className="">
            
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label  className="sr-only">Your Title</label>
                    <textarea onChange={(e)=>{setPostInputs(c => ({...c, title : e.target.value}))}} id="title" className="px-3 pt-3 text-4xl w-full text-gray-900 bg-white border-0 font-extrabold dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a Title..."></textarea>
                </div>

                <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                    <label  className="sr-only">Your comment</label>
                    <textarea onChange={(e)=>{setPostInputs(c => ({...c, content : e.target.value}))}} id="comment" rows={16}  className="w-full px-3  pt-3 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
                </div>

                <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                    <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    onClick={async ()=>{
                        console.log("1x")
                        
                        // navigate(`/blog/ca5d0077-6ab1-484a-bf95-087007a9177f`)
                        try{
                            const token = localStorage.getItem("token");
                            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, postInputs,{
                                headers : {
                                    Authorization: `Bearer ${token}`,
                                }
                            });
                            console.log("3x")
                            console.log(response)
                            console.log(response.data.blog.id)
                            console.log("4x")
                            console.log(`/blog/${response.data.id}`)
                            navigate(`/blog/${response.data.blog.id}`)
                            console.log("5x")
                        }
                        catch(e){
                            console.log("6x")
                            alert("Please Provide data for post")
                        }
                    }}>
                        Publish Post
                    </button>  
                </div>
            </div>
        </div>

    </div>
}