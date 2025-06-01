import { navBarLinks } from '../constant/constants'
import Logo from './icons/Logo'
import SidebarLinks from './SidebarLinks'

function Sidebar() {
    return (
        <div>
            <aside className='flex fixed flex-col max-w-[15rem] w-full h-full p-[0_1em] shadow-xl border-r-1 border-[#00000025] bg-white'>
                <div>
                    <div className='flex items-center'>
                        <Logo className="w-18 ml-[-10px]" />
                        <h1 className='font-bold text-xl'>Veltrixu</h1>
                    </div>
                    <nav>
                        {
                            navBarLinks.map((nblink) => (
                                <SidebarLinks to={nblink.path} name={nblink.name} key={nblink.name} />
                            ))
                        }
                    </nav>
                </div>
                <div className="mt-3">
                    <SidebarLinks to="/auth/login" name="Logout" />
                </div>
            </aside>
        </div>
    )
}

export default Sidebar