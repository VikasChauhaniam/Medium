import {Link} from 'react-router-dom'

interface BlogCardProps{
    authorName : string;
    title  : string;
    content : string;
    publishedDate : string;
    id              : string;
}

export const BlogCard = ({id, authorName,title,content,publishedDate} : BlogCardProps) =>{

    
    return <Link to={`/blog/${id}`}>
        <div className="my-4 mx-4 cursor-pointer">

            <div className="flex flex-row space-x-4 mx-4">
                <div>
                    <AvatarName name={authorName}/> 
                </div>
                <div className="my-2 text-gray-400 flex flex-row ">
                    <div>
                    {authorName}
                    </div>
                    <div className="my-2 mx-2"> 
                        <CircleComponent/>
                    </div> 
                    <div>
                    {publishedDate}
                    </div>
                </div>
                
            </div>
            <div className="text-xl font-semibold mt-4">
                {title}
            </div>
            <div className="text-md font-thin mt-2 mb-8">
                {content.length > 100 ? content.slice(0,100) + "..." : content}
            </div>
            <div className="text-slate-400 text-sm font-thin">
                {`${Math.ceil(content.length/100)} minutes`}
            </div>
            <div className="bg-slate-200  h-1 w-full mt-4">

            </div>

        </div>
    </Link>
}


export function AvatarName({name}:{name: string}){

    return <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{name.split(' ')[0][0] }</span>
        {/* + name.split(' ')[1][0] */}
    </div>
    
}

function CircleComponent(){
    return <div className="h-1 w-1 rounded-full bg-slate-400">

    </div>
}

