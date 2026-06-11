import type { User } from "#/types/user";
import { ChevronsUpDown, Home, LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { authClient } from "#/lib/auth-client";
import { useState } from "react";

export default function UserMenu( { user, onNavigate } : { user: User; onNavigate?: () => void }){
    const router = useRouter();
    const [open, setOpen] = useState(false);

    async function handleLogout() {
        setOpen(false);
        onNavigate?.();
        await authClient.signOut();
        router.navigate({ to: "/" });
    }

    function handleNavigate() {
        setOpen(false);
        onNavigate?.();
    }

    return(
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button className="w-full" variant="ghost">
                    { user.name }
                    <ChevronsUpDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                <DropdownMenuGroup>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarFallback>{ user.name.slice(0,2).toUpperCase() }</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                            <p className="font-bold">{ user.name }</p>
                            <p>{ user.email }</p>
                        </div>
                    </div>
                </DropdownMenuGroup>
                <DropdownMenuGroup className="mt-2">
                    <DropdownMenuItem asChild>
                        <Link to="/admin" onClick={handleNavigate} className="flex items-center gap-2 cursor-pointer">
                            <Home className="size-4" />Dashbaord
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link to="/admin/settings" onClick={handleNavigate} className="flex items-center gap-2 cursor-pointer">
                            <Settings className="size-4" />Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup className="mt-2">
                    <DropdownMenuItem variant="destructive" onClick={handleLogout} className="cursor-pointer">
                        <LogOut className="size-4" />Log out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}