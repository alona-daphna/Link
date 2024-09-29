import { MdShare, MdExplore } from 'react-icons/md';
import { CiExport, CiImport } from 'react-icons/ci';

const OptionMenu = () => {

    const exportDirectory = () => {}
    const importDirectory = () => {}

    return (
        <div className="mt-5 w-80 mx-auto flex justify-between items-center">
            <h2 className='text-xl font-semibold text-teal-300'>Home</h2>
            <div className='flex gap-1 justify-end'>
            <div className='bg-neutral-900 hover:bg-neutral-800 cursor-pointer p-3 rounded-md'><MdShare/></div>
            <div className='bg-neutral-900 hover:bg-neutral-800 cursor-pointer p-3 rounded-md'><MdExplore/></div>
            <div className='bg-neutral-900 hover:bg-neutral-800 cursor-pointer p-3 rounded-md'
                onClick={exportDirectory}>
                <CiExport/>
            </div>
            <div className='bg-neutral-900 hover:bg-neutral-800 cursor-pointer p-3 rounded-md'
                onClick={importDirectory}>
                <CiImport/>
            </div>
            </div>
        </div>
    )
}

export default OptionMenu;