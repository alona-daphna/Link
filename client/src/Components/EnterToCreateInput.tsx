import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react'
import { Category } from '../Types/Category';
import { Link } from '../Types/Link';

type Props = {
    currentCategory: Category | null, 
    setCategoryList: Dispatch<SetStateAction<Category[]>>, 
    setCurrentCategory: Dispatch<SetStateAction<Category | null>>
    setLinkList: Dispatch<SetStateAction<Link[]>>
}

const EnterToCreateInput = ({currentCategory, setCategoryList, setCurrentCategory, setLinkList}: Props) => {
    const [input, setInput] = useState('');
    const [showMenu, setShowMenu] = useState(false)
    const [selectedItem, setSelectedItem] = useState('')
    const [showCategoryInput, setShowCategoryInput] = useState(false)
    const [showLinkInput, setShowLinkInput] = useState(false);
    const categoryInputRef = useRef<HTMLInputElement | null>(null)
    const linkInputRef = useRef<HTMLInputElement | null>(null)
    const menuItems = [{name: 'Link', create: () => setShowLinkInput(true)}, {name: 'Category', create: () => setShowCategoryInput(true)}]
    
    const createLink = async () => {
        if (linkInputRef.current!.value)
        {        
            const response = await fetch('http://localhost:3000/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: null, url: linkInputRef.current!.value, category: currentCategory?.id || null})
            })
            const link: Link = await response.json()
            setLinkList(x => {return [...x, link]})
        }
        setShowLinkInput(false)
    }
    
    const createCategory = async () => {
        const response = await fetch('http://localhost:3000/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: categoryInputRef.current!.value || 'Untitled', parentId: currentCategory?.id || null})
        })
        const category: Category = await response.json();
        setCategoryList(x => {return [...x, category]});
        setShowCategoryInput(false)
        setCurrentCategory(category)
    }

    useEffect(() => {
        if (showCategoryInput){
            categoryInputRef.current?.focus()
        }
    }, [showCategoryInput])

    useEffect(() => {
        if (showLinkInput) {
            linkInputRef.current?.focus()
        }
    }, [showLinkInput])

    useEffect(() => {
        setShowMenu(false),
        setInput('')
    }, [currentCategory])

    const handleEnter = () => {
        if (selectedItem) {
            setShowMenu(false)   
            setInput('')  
            menuItems.find(item => item.name === selectedItem)?.create()
        }
    }

    const handleInputChange = (value: string) => {
        const matchingItem = menuItems.find(x => x.name.toLowerCase().startsWith(value.slice(1)))
        
        if(value === '/' || value.startsWith('/') && matchingItem) {
            setShowMenu(true)
            setSelectedItem(matchingItem?.name || '')
        } else {
            setSelectedItem('')
            setShowMenu(false)
        }
        setInput(value)
    }

    return (
        <>{!showCategoryInput && !showLinkInput &&
            <input className="placeholder-neutral-600 py-1 px-2 focus:placeholder-transparent focus:outline-0 bg-inherit w-full" 
            type="text"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') handleEnter()}}
            placeholder="Create a new category or link"/>}
            {showMenu &&
            <div className='border-neutral-800 border py-2 rounded-md'>
                {menuItems.filter(x => x.name.toLowerCase().startsWith(input.slice(1).toLowerCase())).map((item, index) => (
                    <div>
                        {index > 0 && <hr className='my-1 border-neutral-800'></hr>}
                        <p className={`${item.name === selectedItem ? 'text-teal-500' : ''} px-2`}>{item.name}</p>
                    </div>
                ))}
            </div>
            }
            {showCategoryInput && 
                <div>
                    <input className='px-2 placeholder-neutral-600 focus:outline-0 bg-inherit w-full' 
                        ref={categoryInputRef} 
                        type="text" 
                        placeholder='Category name'
                        onKeyDown={(e) => {if (e.key === 'Enter') createCategory()}} />
                </div>}
            {showLinkInput && 
                <div>
                    <input className='px-2 placeholder-neutral-600 focus:outline-0 bg-inherit w-full'
                        ref={linkInputRef}
                        type="text" 
                        placeholder='Paste link'
                        onKeyDown={(e) => {if (e.key === 'Enter') createLink()}}/>
                </div>
            }
        </>
    )
}

export default EnterToCreateInput; 