import { NavLink } from 'react-router-dom';

import Header from '../components/Header/Header';
import Sidebar from './Sidebar';

const AdminLayout = () => {
	const navLinkClassName = ({ isActive }) => `text-lg font-bold py-4 focus:bg-[#f1f5f9] menuLink ${isActive ? 'bg-[#f1f5f9]' : 'text-[#898989]'}`;

	const menuItems = <>
		<li><NavLink className={navLinkClassName} to='/admin/all-users'>All Users</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/admin/add-doctor'>Add a Doctor</NavLink></li>
		<li><NavLink className={navLinkClassName} to='/admin/manage-doctors'>Manage Doctors</NavLink></li>
	</>

	return <>
		<Header />
		<Sidebar>{menuItems}</Sidebar>
	</>
}
export default AdminLayout;