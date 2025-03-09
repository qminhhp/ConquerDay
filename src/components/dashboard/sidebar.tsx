"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar, CheckSquare, LayoutGrid, ListTodo, Tag } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: "Planner",
      href: "/dashboard/planner",
      icon: <CheckSquare className="h-5 w-5" />,
    },
    {
      name: "Boards",
      href: "/dashboard/boards",
      icon: <LayoutGrid className="h-5 w-5" />,
    },
    {
      name: "Tags",
      href: "/dashboard/tags",
      icon: <Tag className="h-5 w-5" />,
    },
  ];

  return (
    <div
      className={`h-full bg-white border-r border-gray-200 transition-all ${className} ${collapsed ? "w-16" : "w-64"}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && (
            <div className="text-xl font-bold text-blue-600">Conquer Day</div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto"
          >
            {collapsed ? "→" : "←"}
          </Button>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start ${collapsed ? "px-2" : "px-3"}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
