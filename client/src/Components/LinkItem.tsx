import React from 'react'
import { Link } from "../Types/Link"

const LinkItem = ({link}: {link: Link}) => {
    return (
        <div className='w-full cursor-pointer px-2 py-0.5'>
            <a className="underline text-neutral-500" 
                href={link.url} 
                target="_blank">
                {link.title || link.url}
            </a>
        </div>
    )
}

export default LinkItem