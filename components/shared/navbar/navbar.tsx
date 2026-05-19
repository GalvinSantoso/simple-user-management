import { Kanban, UserRound } from "lucide-react";
import Link from "next/link";
import { NavLink } from "./schema";
import NavList from "./nav-list";
import UserProfile from "./user-profile";

const NAV_LINKS: NavLink[] = [
  { name: "Home", link: "/" },
  { name: "Users", link: "/users" },
];

const Navbar = () => {
  return (
    <nav className="w-full py-6 bg-background/30 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center gap-4">

      <div className="flex items-center gap-x-10">
        <Link href="/" className="group flex items-center space-x-2 shrink-0">
          <div className="relative bg-primary grid place-content-center w-7 aspect-square overflow-hidden rounded-lg transition-transform  group-hover:scale-105 group-hover:rotate-3 shrink-0">
            <Kanban className="text-accent w-4 aspect-square" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-all duration-200 overflow-hidden whitespace-nowrap group-hover:opacity-80">
            UserOps
          </span>
        </Link>
        <NavList items={NAV_LINKS} />
      </div>
      <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;
