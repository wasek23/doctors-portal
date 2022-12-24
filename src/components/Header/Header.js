import { Link, NavLink } from 'react-router-dom';

const Header = () => {
	const navLinkClassName = ({ isActive }) => isActive ? 'btn gray' : 'btn white'

	const menu = <>
		<li><NavLink className={navLinkClassName} to='/'>Home</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/appointment'>Appointment</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/login'>Login</NavLink></li>
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