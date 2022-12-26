import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { AuthContext } from '../../contexts/AuthProvider';

const Header = () => {
	const { user, logoutUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const navLinkClassName = ({ isActive }) => isActive ? 'btn gray' : 'btn white';

	const onLogout = () => {
		logoutUser()
			.then(() => {
				toast('User logged out!');
				navigate('/logout');
			});
	}

	const menu = <>
		<li><NavLink className={navLinkClassName} to='/'>Home</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/appointment'>Appointment</NavLink></li>
		{user?.uid ? <>
			<li><NavLink className={navLinkClassName} to='/dashboard'>Dashboard</NavLink></li>

			{user?.displayName ? <li>
				<button className='btn white hover:gray'>
					{user.displayName}
				</button>
				<ul className='p-1 bg-base-100'>
					<li><button className='btn gray' onClick={onLogout}>Logout</button></li>
				</ul>
			</li> : <li><button className='btn white hover:gray' onClick={onLogout}>Logout</button></li>}
		</> :
			<li><NavLink className={navLinkClassName} to='/login'>Login</NavLink></li>}
	</>;

	return <header className='mainHeader'>
		<div className='navbar justify-between container'>
			<div className='flex justify-between w-full lg:w-auto'>
				<Link className='text-lg'>Doctors Portal</Link>

				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' /></svg>
					</label>

					<ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
						{menu}
					</ul>
				</div>
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