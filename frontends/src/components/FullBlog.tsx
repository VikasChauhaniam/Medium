import { Appbar } from "./Appbar"
import {BlogType} from '../hooks'

export const FullBlog = ({blog} : {blog : BlogType}) =>{

    return <div>
        <Appbar/>
        <div  className="flex justify-center">
            <div className="grid grid-cols-12 w-screen px-24">
                <div className="col-span-8  pr-4">
                    <div className="text-6xl font-extrabold mb-10">
                        {blog.title}
                    </div>
                    <div className="text-slate-300 text-sm">
                        Posted on {"Jan 20, 2030"}
                    </div>
                    <div>
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 bg-slate-300 pl-4">
                    <div className="font-extralight ">
                        {"Email : "}{blog.author.email}
                    </div>
                    <div className="font-bold text-xl ">
                        {"By : "}{blog.author.name || "Anonymous"}
                    </div>
                </div>
            </div>
        </div>
        
        
    </div>
}