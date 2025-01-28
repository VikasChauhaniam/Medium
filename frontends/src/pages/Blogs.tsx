import {Appbar} from '../components/Appbar'
import {useBlogs} from '../hooks'
import {BlogCard} from '../components/BlogCard'
import { BlogSKelton } from '../components/BlogsSkelton'

export const Blogs = () =>{
    const {loading, blogs} = useBlogs()
    // console.log(blogs[0])
    if(loading){
        return <div>
            <Appbar></Appbar>
            <BlogSKelton/>
            <BlogSKelton/>
            <BlogSKelton/>
        </div>
    }
    return (<div>
        
        <Appbar></Appbar>
        <div className='flex flex-col  w-[70%] mx-auto'>

            {blogs.map((blog) => (
                
                <BlogCard 
                    key={blog.id}
                    id={blog.id}
                    authorName = {blog.author.name || "anonymous"} 
                    title = {blog.title}
                    content = {blog.content}
                    publishedDate = {new Date().toLocaleDateString()}

                />))}
            
           
        </div>
    </div>)
}