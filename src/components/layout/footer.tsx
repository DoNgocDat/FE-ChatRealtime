import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer () {
    return(
        <div className="bg-cyan-800 text-color2 py-5 px-4">
                    <div className="flex flex-col md:flex-row justify-between space-y-5 md:space-y-0">
                        {/* Điều khoản */}
                        <div className="w-full md:w-1/3 flex flex-col space-y-2">
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaPlayCircle />
                                <span>Terms of use</span>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaPiedPiper />
                                <span>Privacy policy</span>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaLayerGroup />
                                <span>Originally turned off the community</span>
                            </span>
                        </div>

                        {/* Thông tin liên hệ */}
                        <div className="w-full md:w-1/3 flex flex-col space-y-2">
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaUser />
                                <span>Do Ngoc Dat Intern</span>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaListAlt />
                                <span>dongocdat28042003@gmail.com</span>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaLocationArrow />
                                <span>Dong Xuan, Phu Yen, Viet Nam</span>
                            </span>
                        </div>

                        {/* Mạng xã hội */}
                        <div className="w-full md:w-1/3 flex flex-col space-y-2">
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaFacebook />
                                <Link to={"https://www.facebook.com/ongocat.791708/?locale=vi_VN"}>Facebook</Link>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaFacebookMessenger />
                                <Link to={"https://www.facebook.com/ongocat.791708/?locale=vi_VN"}>Messenger</Link>
                            </span>
                            <span className="flex space-x-2 items-center">
                                <FaIcons.FaSkype />
                                <Link to={"live:.cid.ca81e90afda249ea"}>Skype</Link>
                            </span>
                        </div>
                    </div>
                    <hr className="my-5 border-t border-gray-400" />
                    <div className="text-center">
                        <span>© Copyright belongs to Smart Chat</span>
                    </div>
                </div>
    )
}

export default Footer