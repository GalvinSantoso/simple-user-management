import { UserRound } from "lucide-react";

const UserProfile = () => {
  return (
    <div className="flex items-center gap-x-4">
      <p className="text-foreground text-sm">MAMPU.IO technical test</p>
      <div className="relative bg-secondary grid place-content-center w-7 aspect-square overflow-hidden rounded-full transition-transform group-hover:scale-105 group-hover:rotate-3 shrink-0">
        <span className="text-secondary-foreground font-extrabold text-xs">MO</span>
      </div>
    </div>
  );
};

export default UserProfile;
