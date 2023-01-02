import { Outlet } from 'react-router-dom';

const Sidebar = ({ children }) => {
	return <div className='drawer drawer-mobile'>
		<input id='sidebarDrawer' type='checkbox' className='drawer-toggle' />

		<div className='drawer-content bg-[#f1f5f9]'>
			<Outlet />
		</div>

		<div className='drawer-side lg:-z-10'>
			<label htmlFor='sidebarDrawer' className='drawer-overlay'></label>
			<ul className='menu py-4 w-80 bg-white gap-3'>{children}</ul>
		</div>
	</div>
}
export default Sidebar;