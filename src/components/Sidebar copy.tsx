'use client'
import { useState } from "react";
import { usePathname } from "next/navigation"; // For active state checking
import { FaHome, FaCog, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Example icons
import Logo from "@/shared/Logo";
import Image from "next/image";
import icon1 from '../../public/assets/dashboardIcon.png'
import icon2 from '../../public/assets/orderIcon.png'
import icon3 from '../../public/assets/wallet-02.png'
import icon4 from '../../public/assets/store-03.png'
import icon5 from '../../public/assets/user-group.png'


const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <Image src={} alt="icon"/>,
  },
  {
    label: "Settings",
    icon: <FaCog />,
    children: [
      { label: "customer", path: "/dashboard/account_settings" },
      { label: "vendor", path: "/dashboard/account_settings/vendor" },
      { label: "contributor", path: "/dashboard/account_settings/contributor" },
    ],
  },
  {
    label: "User Management",
    path: "/users",
    icon: <FaUser />,
  },
];

export default function Sidebar() {
  const pathname = usePathname(); // Get current path
  const [openMenus, setOpenMenus] = useState<string[]>([]); // Track open submenus

  // Toggle the submenu visibility
  const toggleSubmenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  // Check if the menu is active based on the current pathname
  const isActive = (path: string) => pathname === path;

  // Check if the submenu should stay open based on active state
  const isParentActive = (children: { path: string }[]) =>
    children.some((child) => isActive(child.path));

  return (
    <div className="w-80 text-white h-screen p-4">
      <nav>
        <Logo/>
        {menuItems.map((item) => (
          <div key={item.label} className="mb-4">
            {!item.children ? (
              // Single-level menu item
              <a
                href={item.path}
                className={`flex items-center p-2 rounded hover:bg-gray-700 ${
                  isActive(item.path) ? "bg-gray-700" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            ) : (
              // Menu with submenu
              <div>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className="flex items-center w-full p-2 rounded hover:bg-gray-700"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                  <span className="ml-auto">
                    {openMenus.includes(item.label) || isParentActive(item.children)
                      ? <FaChevronUp />
                      : <FaChevronDown />}
                  </span>
                </button>
                {openMenus.includes(item.label) || isParentActive(item.children) ? (
                  <div className="ml-6 mt-2">
                    {item.children?.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.path}
                        className={`block p-2 rounded hover:bg-gray-700 ${
                          isActive(subItem.path) ? "bg-gray-700" : ""
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
      </nav>
    </div>
  );
}
