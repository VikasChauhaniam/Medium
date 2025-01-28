
import { Link } from 'react-router-dom';

interface Warningprops{
    label : string,
    buttonText : string,
    to         : string
}

export function BottomWarning({label, buttonText, to}:Warningprops){
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

