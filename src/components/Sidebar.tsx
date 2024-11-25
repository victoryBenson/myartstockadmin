'use client'
import { useState,React } from "react";
import { usePathname } from "next/navigation"; // For active state checking
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Example icons
import Image from "next/image";
import Logo from '@/shared/Logo'
import icon1 from '../../public/assets/dashboardIcon.png'
import icon2 from '../../public/assets/orderIcon.png'
import icon3 from '../../public/assets/wallet-02.png'
import icon4 from '../../public/assets/store-03.png'
import icon5 from '../../public/assets/user-group.png'
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";


const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: <Image src={icon1} alt='image'/>,
  },
  {
    label: "Order Management",
    children: [
        { label: 'Digital Product', path: '/' },
        { label: 'Physical Product', path: '/' },
      ],
      icon: <Image src={icon2} alt='image'/>
  },
  {
    label: 'Wallet', 
    path: '/', 
    icon: <Image src={icon3} alt='image'/>
  },
  {   label: 'Assets Management', 
    path: '/',
    icon: <Image src={icon4} alt='image'/> },
{
    label: 'Account Management',
    children: [
      { label: 'Customer Management', path: '/dashboard/account_settings' },
      { label: 'Contributor Management', path: '/dashboard/account_settings/contributor' },
      { label: 'Vendor Management', path: '/dashboard/account_settings/vendor' },
    ],
    icon: <Image src={icon5} alt='image'/>
  },
];

export default function Sidebar() {
  const pathname = usePathname(); 
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  
  const toggleSubmenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  
  const isActive = (path: string) => pathname === path;

  
  const isParentActive = (children: { path: string }[]) =>
    children.some((child) => isActive(child.path));

  return (
    <div className="w-[350px]">
      <nav className="flex flex-col justify-between text-[#818181] text-base p-4 border shadow h-screen ">
        <div>
            <Logo/>
            <div className="pt-8">
            {menuItems.map((item) => (
                <div key={item.label} className="mb-2">
                {!item.children ? (
                    // Single-level menu item
                    <a
                    href={item.path}
                    className={`flex items-center p-2 rounded hover:bg-gray-100/40 hover:shadow ${
                        isActive(item.path) ? "bg-gray-700" : ""
                    }`}
                    >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                    </a>
                ) : (
                    // Menu with submenu
                    <div className="">
                    <button
                        onClick={() => toggleSubmenu(item.label)}
                        className="flex items-center w-full p-2 rounded hover:bg-gray-100/40 hover:shadow"
                    >
                        <span className="mr-3">{item.icon}</span>
                        <span className="text-base">{item.label}</span>
                        <span className="ml-auto">
                        {openMenus.includes(item.label) || isParentActive(item.children)
                            ? <FaChevronUp />
                            : <FaChevronDown />}
                        </span>
                    </button>
                    {openMenus.includes(item.label) || isParentActive(item.children) ? (
                        <div className="ml-6 mt-2 text-sm">
                        {item.children?.map((subItem) => (
                            <a
                            key={subItem.label}
                            href={subItem.path}
                            className={`block p-2 rounded hover:bg-gray-100/40 hover:shadow ${
                                isActive(subItem.path) ? "#EAEAEA" : ""
                            }`}
                            >
                            {subItem.label}
                            </a>
                        ))}
                        </div>
                    ) : null}
                    </div>
                )}
                </div>
            ))}
            </div>
        </div>
        <div>
            {/*  */}
            <ul className="border-t t-40">
                <li className="flex justify-between items-center pt-4">
                    <span className="flex items-center gap-1"><FaRegCircleUser /> Tolu Adebayo</span>
                    <span> <RiLogoutCircleRLine /></span>
                </li>
            </ul>
        </div>
      </nav>
    </div>
  );
}
