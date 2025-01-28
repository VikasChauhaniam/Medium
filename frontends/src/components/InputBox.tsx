import {ChangeEvent} from 'react'

interface LabelledInputType{
    placeholder : string;
    label       : string;
    onChange    : (e : ChangeEvent<HTMLInputElement>) => void;
    type?       : string;
}

export function InputBox({placeholder, label, onChange, type} : LabelledInputType){
    return <div>
        <div className="text-sm font-medium text-left py-2">    {label} </div>
        <input onChange={onChange} placeholder={placeholder} className="w-full px-2 py-1 border-slate-200" type = {type || 'text'}></input>
    </div>
}

