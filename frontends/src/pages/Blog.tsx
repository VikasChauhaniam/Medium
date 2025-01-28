import { FullBlog } from '../components/FullBlog'
import {useBlog} from '../hooks'
import {useParams} from 'react-router-dom'
import {BlogType} from '../hooks'


export const Blog = () =>{

    const {id} = useParams()

    const {loading, blog} = useBlog({ id : id || ""})
    // console.log("vj")
        // console.log(blog)
    // console.log("tj")    
        if(loading){
            return <div>
                loading...
            </div>
        }
        if (!blog) {
            return (
                <div className='text-3xl font-extralight w-screen h-screen flex justify-center '>
                    <div className=' flex flex-col justify-center '>
                        Blog not found!
                    </div>
                </div>
            );
        }

    return <div>
        <FullBlog blog = {blog}></FullBlog>
    </div>
}