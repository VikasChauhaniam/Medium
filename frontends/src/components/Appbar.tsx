
import {AvatarName} from './BlogCard'
import {Link} from 'react-router-dom'

export const Appbar = () =>{

    return <div className="flex justify-between px-10 bg-slate-200 mb-24 p-4">
            <div className='my-auto text-2xl font-bold'>
                <Link to={'/'}>
                    <div onClick={()=>localStorage.removeItem("token")}>
                        Medium
                    </div>
                </Link>
            </div>
       
        <div className='flex flex-row'>
        <div className='mr-10'>
                <Link to={'/signup'}>
                    <button onClick={()=>localStorage.removeItem("token")} className="bg-gray-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded">
                        <span>Log out</span>
                    </button>
                </Link>
            </div>
            <div className='mr-10'>
                <Link to={'/publish'}>
                    <button className="bg-gray-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded">
                        <span>Write a Blog</span>
                    </button>
                </Link>
            </div>
        
            <div>
                <Link to={'/blogs'}>
                    <AvatarName name='Vikas Chauhan'></AvatarName>
                </Link>
            </div>
        </div>
        
    </div>
}

