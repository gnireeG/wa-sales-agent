import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar"
import UserMenu from "@/components/user-menu"
import type { User } from "#/types/user"
import type { LinkProps } from "@tanstack/react-router";
import { Edit3Icon, HomeIcon, LocateIcon, PersonStanding, Settings } from "lucide-react";
import MenuButton from "./menu-button";

type NavLink = {
    href: LinkProps["to"];
    label: string;
    icon: React.ReactNode;
};

const settingsLinks: NavLink[] = [
    {
        href: '/admin',
        label: 'General',
        icon: <Settings />
    },
    {
        href: '/admin',
        label: 'Address',
        icon: <LocateIcon />
    },
]

export function AppSidebar({ user } : { user: User | null }) {
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        header
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                    <MenuButton href="/admin" icon={<HomeIcon />} label="Dashboard" />
                    <MenuButton href="/admin/customers" icon={<PersonStanding />} label="Customers" />
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
            <SidebarGroupContent>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarMenu>
                    {settingsLinks.map(link =>(
                        <MenuButton href={link.href} icon={link.icon} label={link.label} key={link.label} />
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        { user && <UserMenu user={ user } onNavigate={() => setOpenMobile(false)} /> }
      </SidebarFooter>
    </Sidebar>
  )
}