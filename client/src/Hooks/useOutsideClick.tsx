import React, { RefObject, useEffect } from 'react'

const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>, handler: () => void) => {

    useEffect(() => {
        const handleClickOutside = ((event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                handler()
            }
        })

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref])
}

export default useOutsideClick;