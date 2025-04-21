import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useProfile } from "@/hooks/useAuth";
import { TvMinimal, Dot, UserRound, LogOut, TrendingUp, TrendingDown, ChartLine} from "lucide-react";
import { useLocation, Link } from "react-router-dom";


const Aside = () => {
  const { data, isLoading } = useProfile()
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      id: 1,
      icon: <TvMinimal size={20} fill="black" />,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      icon: <TrendingUp  size={20}  />,
      name: "Income",
      path: "/income",
    },
    {
      id: 3,
      icon: <TrendingDown  size={20} />,
      name: "Expense",
      path: "/about",
    },
    {
      id: 4,
      icon: <ChartLine size={20} />,
      name: "Budget",
      path: "/about",
    },
    {
      id: 5,
      icon: <UserRound size={20} fill="black" />,
      name: "About",
      path: "/about",
    },
  ];
  if (isLoading) return <p>Loading...</p>
  return (
    <div className="fixed left-6 top-9 w-[280px] h-[calc(100vh-4.5rem)] rounded-2xl shadow-xl border bg-white p-6 z-10 max-lg:w-fit max-lg:p-3 flex flex-col">
      {/* Top: Avatar + Menu */}
      <div className="flex flex-col gap-12">
        {/* Head */}
        <div className="flex w-full gap-4 items-center">
          <Avatar className="w-12 h-12">
            <AvatarImage src="https://github.com/shadcn.png" alt="username" />
          </Avatar>
          <div className="flex flex-col gap-1 max-lg:hidden">
            <h1 className="font-bold">{data.username}</h1>
            <p className="text-sm text-muted-foreground">Description</p>
          </div>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isSelected = currentPath === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex justify-between items-center rounded-md p-3 pl-4 ${
                  isSelected ? "bg-black/10 font-semibold" : "hover:bg-black/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="max-lg:hidden">{item.name}</span>
                </div>
                {isSelected && (
                  <Dot
                    color={isSelected ? "#000000" : "#00000030"}
                    className="max-lg:hidden"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom: Logout */}
      <button
        onClick={() => {
          // ทำ logout logic ที่นี่ เช่น clearToken แล้ว navigate
          console.log("Logging out...");
        }}
        className="flex mt-auto w-full rounded-md p-3 pl-4 bg-[red]/10 items-center justify-between hover:bg-[red]/20"
      >
        <div className="flex gap-4 items-center">
          <LogOut />
          <span className="max-lg:hidden">Logout</span>
        </div>
        <Dot className="max-lg:hidden" />
      </button>
    </div>
  );
};

export default Aside;
