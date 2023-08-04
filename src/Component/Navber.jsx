import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./Provaider/Authprovaider";


const Navber = () => {
  const { user, logOut } = useContext(AuthContext);
  const handelelogout = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error))
  }
  console.log(user?.photoURL);
  const navItem = (
    <>
      <li>
        <Link>Home</Link>
      </li>
      <li>
        <Link to='/MoneyManagement'>Money Management</Link>
      </li>
      <li>
        <Link to='/MarketCalculation'>Market Calculation</Link>
      </li>

      {
        user ? <> <li>
          <Link onClick={handelelogout} className="bg-red-600" >logout</Link>
        </li>
          <li>
            <Link className="text-blue-950" >{user?.email}</Link>
          </li> </> :
          <> <li>
            <Link to='/login'>Login</Link>
          </li></>
      }
    </>
  );
  return (
    <div>
      <div className="navbar bg-green-300 sm:px-0 md:px-20">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu  menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItem}
            </ul>
          </div>
          <a className=" normal-case md:text-xl sm:font-normal sm:text-sm  md:font-bold ">
            Personal Balance
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">


          {
            user ? <> <img className=" rounded-full h-12 w-12" src={user?.photoURL} alt="Profile image" /> </> : <><img
              className=" rounded-full h-12 w-12"
              src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
              alt=""
            /></> 
          }
        </div>
      </div>
    </div>
  );
};

export default Navber;
