import { LogOutIcon, Users2 } from "lucide-react";
import { signOut } from "@/lib/sign-out";
const links = [
  {
    label: "Profile",
    icon: <Users2 size={18} />,
    action: () => console.log("Go to profile"),
  },
  {
    label: "Log out",
    icon: <LogOutIcon size={18} />,
    action: async () => {
      try {
        await fetch('/api/auth/logout',{
          method:'POST',
          credentials:"include"
        })
        window.location.href = "/login"; // or "/"
      } catch (error) {
        console.error("Logout failed", error);
      }
    },
  },
];

interface Props {
  isListOpen: boolean;
}

const List = ({ isListOpen }: Props) => {
  return (
    <div
      className={`
        absolute right-0 top-10
        bg-white rounded-2xl p-2 w-40
        overflow-hidden
       animate-rollout
      `}
    >
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li
            key={index}
            onClick={link.action}
            className="flex items-center gap-2 cursor-pointer hover:bg-zinc-200 p-2 rounded"
          >
            {link.icon}
            <span onClick={link.action}>{link.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
