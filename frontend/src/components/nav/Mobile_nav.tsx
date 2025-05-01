import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LineChartIcon as ChartLineUp, Menu, TrendingDown, TrendingUp, Tv } from "lucide-react"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

const menuItems = [
  {
    id: 1,
    icon: <Tv size={20} />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    id: 2,
    icon: <TrendingUp size={20} />,
    name: "Income",
    path: "/income",
  },
  {
    id: 3,
    icon: <TrendingDown size={20} />,
    name: "Expense",
    path: "/expense",
  },
  {
    id: 4,
    icon: <ChartLineUp size={20} />,
    name: "Budget",
    path: "/budget",
  },
]

const MobileNav = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="fixed top-0 z-50 flex w-full justify-end bg-black/10 py-2 backdrop-blur-sm md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="mr-4 rounded-lg p-2 transition-colors hover:bg-white/20" aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="border-none bg-black/30 backdrop-blur-xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold text-white">Menu</SheetTitle>
          </SheetHeader>
          <nav>
            <ul className="space-y-3 px-4">
              {menuItems.map((item) => {
                const isActive = pathname === item.path
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                        isActive ? "bg-white/20 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      <span className={`${isActive ? "text-white" : "text-white/70"}`}>{item.icon}</span>
                      <span className="font-medium">{item.name}</span>
                      {isActive && <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav
