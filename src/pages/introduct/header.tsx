import { Link } from "react-router-dom";
import Logo from '../../assets/logo.png';

function Header() {

    return (
        <>
            <nav className="bg-cyan-800 p-2 fixed top-0 w-full z-[100] h-[50px] flex">

                {/* left header */}
                <div className="h-full w-[50%] left-0 top-0 ml-5 flex items-center justify-start">
                    <img src={Logo} className="h-[40px] w-[40px]"></img>
                    <Link to={"/"} className="text-color2 text-lg font-bold">Smart Chat</Link>
                </div>

                {/* right header */}
                <div className="h-full w-[50%] right-0 top-0 flex items-center justify-end mr-5 space-x-5">
                    <button className="hover:scale-105 text-color2">
                        <Link to={"/blog"}>Blog</Link>
                    </button>
                    <button className="hover:scale-105 text-color2">
                        <Link to={"/register"}>Register</Link>
                    </button>
                    <button className="hover:scale-105 text-color2">
                        <Link to={"/login"}>Login</Link>
                    </button>
                </div>
                <hr className="absolute bottom-0 left-0 w-full border-t-2 border-gray-500" />
            </nav>
        </>
    );
};

export default Header;