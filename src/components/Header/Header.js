import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';
import { menuIcon } from '../../utils/icons';
import useAdmin from '../../hooks/useAdmin';

const Header = () => {
	const { user, logoutUser } = useContext(AuthContext);
	const { isAdmin } = useAdmin(user?.email);

	const navigate = useNavigate();

	const navLinkClassName = ({ isActive }) => isActive ? 'btn gray menuLink' : 'btn white menuLink';

	const onLogout = () => {
		logoutUser()
			.then(() => {
				toast('User logged out!');
				localStorage.removeItem('accessToken');
				navigate('/login');
			});
	}

	const menu = <>
		<li><NavLink className={navLinkClassName} to='/'>Home</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/appointment'>Appointment</NavLink></li>
		{user?.uid ? <>
			<li><NavLink className={navLinkClassName} to='/dashboard/my-appointments'>Dashboard</NavLink></li>
			{isAdmin && <li><NavLink className={navLinkClassName} to='/admin/all-users'>Admin</NavLink></li>}

			{user?.displayName ? <li>
				<button className='btn white hover:gray'>
					{user.displayName}
				</button>
				<ul className='p-1 bg-base-100 z-10'>
					<li><button className='btn gray' onClick={onLogout}>Logout</button></li>
				</ul>
			</li> : <li><button className='btn white hover:gray' onClick={onLogout}>Logout</button></li>}
		</> :
			<li><NavLink className={navLinkClassName} to='/login'>Login</NavLink></li>}
	</>;

	return <header className='mainHeader'>
		<div className='navbar justify-between container'>
			<div className='flex gap-3 w-full lg:w-auto'>
				<div className='dropdown'>
					<label tabIndex={1} className='btn white lg:hidden'>{menuIcon}</label>

					<ul tabIndex={1} className='menu menu-compact dropdown-content text-left mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
						{menu}
					</ul>
				</div>

				<Link className='text-lg'>Doctors Portal</Link>

				<label htmlFor='sidebarDrawer' className='btn white lg:hidden ml-auto'>{menuIcon}</label>
			</div>

			<div className='hidden lg:flex'>
				<ul className='menu menu-horizontal px-1'>
					{menu}
				</ul>
			</div>
		</div>
	</header>
}
export default Header;