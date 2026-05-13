import Logo from "../assets/logo.png"
import { FaGithub } from "react-icons/fa";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useState } from "react";

function Header({ onToggle, isSidebar }) {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="z-100 w-full h-12.5 bg-main border-border border-b flex justify-center items-center p-2 px-4 relative select-none">
            <div className="lg:hidden absolute left-4 cursor-pointer text-[18px]">
                {isSidebar ? 
                <GoSidebarCollapse onClick={onToggle} />
                : 
                <GoSidebarExpand  onClick={onToggle} />
                }
            </div>
            <img width={160} src={Logo} alt=""/>
            <div className="absolute right-4 cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <a href="https://github.com/pedroparisii/minimal-notes" target="_blank">
                    <FaGithub className="relative text-[18px] opacity-55 hover:opacity-100 transition-all"/>
                
                {isHovered ?
                <div className="absolute text-nowrap p-2 right-4 -top-2.5 animate-in ">
                    <p className="max-sm:hidden text-[14px] opacity-85">Open repository</p>
                </div>
                : ""}
                </a>
            </div>
        </div>
    )
}

export default Header