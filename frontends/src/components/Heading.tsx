interface Headingprops{
    label : string
}
export function Heading({label}:Headingprops){
    return <div className="font-bold text-4xl pt-6">
        {label}
    </div>
}

