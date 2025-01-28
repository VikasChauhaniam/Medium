
import { Link } from 'react-router-dom';

export function BottomWarning({label, buttonText, to}){
    return <div className="text-sm py-2 flex justify-center ">
        <div>
            {label}
        </div>
        <div>
            <Link className="cursor-pointer underline pl-1 " to={to}>
                {buttonText}
            </Link>
        </div>
    </div>
}

