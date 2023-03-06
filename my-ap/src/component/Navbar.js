



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout} from '../features/auth/authSlice';




const Navbar = () => {

const dispatch = useDispatch()

    const {user } = useSelector(state=>state.auth)

   



const handleLogOut=()=>{


  dispatch(logout())

}


    return (
        <div className='sticky top-0 bg-white px-12 py-2 flex justify-center md:justify-between'>
            <div className='hidden md:block' >
                <Link to='/' className='font-bold text-2xl text-gray-600'>sohojBook</Link>
            </div>
            <div className='flex gap-4 text-xl '>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Home</NavLink>

                <NavLink to='/register' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Register</NavLink>
                <NavLink to='/scanqr' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Scan </NavLink>



                {/* <NavLink to='/login' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Login</NavLink>

                {
                    user ? <NavLink to='/inventories' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Manage Items</NavLink> : <p></p>
                }

                {
                    user ? <NavLink to='/uploadPd' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>Add Items</NavLink> : <p></p>
                }

                {
                    user ? <NavLink to='/myitems' className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>My Items</NavLink> : <p></p>
                } */}





                {
               user ? <button onClick={handleLogOut}>LogOut</button> : <NavLink to="/login" className={({ isActive }) => isActive ? 'text-emerald-400' : 'black'}>login  </NavLink>
                }





            </div>
        </div>
    );
};

export default Navbar;