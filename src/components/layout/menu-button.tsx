import type React from "react";

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Link, type LinkProps } from "@tanstack/react-router";

type SidebarMenuButtonProps = {
    href: LinkProps["to"];
    label: string;
    icon: React.ReactNode
}

export default function MenuButton({ href, label, icon } : SidebarMenuButtonProps){

    const { setOpenMobile } = useSidebar()

    return(
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <Link to={href} onClick={() => setOpenMobile(false)}>   
                { icon }
                <span>{label}</span>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}