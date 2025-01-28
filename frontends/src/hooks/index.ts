import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config';

export interface BlogType{
    id: string;
    title: string;
    content: string;
    published: boolean,
    author: {
        name: string;
        email: string;
    }
}

export const useBlog = ({ id } : { id:string }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<BlogType>();

    const navigate = useNavigate();


    // const token = localStorage.getItem('token');
    // if(!token){
    //     console.log("login first plx")
    //     alert("Please Login first")
    //     return { loading, blog };
    // }

    // console.log("ID HAI" + id)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please Login first single blog");
          navigate("/signin"); // Navigate only when the component is mounted
        }

        const fetchBlog = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBlog(response.data.blog); // Update blogs state
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchBlog(); // Call the async function
    }, [id]); // Empty dependency array ensures the effect runs only once

    // console.log(loading)
    // console.log(blog)
    return { loading, blog };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [blogs, setBlogs] = useState<BlogType[]>([]);
    const navigate = useNavigate();

    


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please Login first BLOGS");
          navigate("/signin"); // Navigate only when the component is mounted
        }

        const fetchBlogs = async () => {
            try {

                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setBlogs(response.data.blogs); // Update blogs state
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        fetchBlogs(); // Call the async function
    }, []); // Empty dependency array ensures the effect runs only once

    return { loading, blogs };
};
