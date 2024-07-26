import React from 'react';
import LogoutIcon from "./icons/LogoutIcon";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import OptionsIcon from "./icons/OptionsIcon";
import ProfileIcon from "./icons/ProfileIcon";

const NavLinkClass = "nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-0 border-b-2 border-transparent pr-5 py-3 hover:border-transparent hover:bg-gray-100 focus:border-transparent"

const Header = () => {
    const dispatch = useAppDispatch()

    return (
        <header className="bg-gray-100 text-gray-500 hover:text-gray-700 shadow-md">
            <div className="container">
                <nav className="flex flex-wrap items-center justify-between py-4 w-full">
                    <div className="flex flex-wrap w-full items-center justify-between relative">
                        <div className="flex-grow items-center">
                            <ul className="nav nav-tabs flex flex-row md:flex-row flex-wrap list-none justify-center sm:justify-start">
                                <li className="nav-item">
                                    <NavLink to="/" className={NavLinkClass}>Search</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/" className={NavLinkClass}>About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/" className={NavLinkClass}>News</NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto">
                            <a className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-5" href="#">
                                <ProfileIcon />
                            </a>
                            <a className="text-gray-500 hover:text-gray-700 focus:text-gray-700 mr-5" href="#">
                                <OptionsIcon />
                            </a>
                            <a className="text-gray-500 hover:text-gray-700 focus:text-gray-700" href="#">
                                <LogoutIcon />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header;