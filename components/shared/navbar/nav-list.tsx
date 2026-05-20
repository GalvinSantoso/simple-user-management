"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import cn from "@/libs/cn";
import { NavLink } from "./schema";

interface NavListProps {
  items: NavLink[];
}

const NavList = ({ items }: NavListProps) => {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-x-2 md:gap-x-4">
      {items.map(({ link, name }) => {
        const isActive = link == "/" ? pathname == "/" : pathname.startsWith(link);

        return (
          <li key={name} className="relative z-10 px-4 py-1">
            <Link
              href={link}
              className={cn(
                "text-sm font-semibold",
                isActive
                  ? "text-secondary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {name}
            </Link>
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 -z-10 rounded-full bg-secondary"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;
