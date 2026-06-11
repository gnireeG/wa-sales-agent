import UserMenu from "#/components/user-menu";
import { Link } from "@tanstack/react-router";
import type { User } from "better-auth";

export default function Navbar({ user } : { user: User | null}){
    return(
        <nav className="w-full p-2 sm:p-4 bg-slate-900 text-gray-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link to="/">Logo</Link>
                <div>
                    { user && (
                        <UserMenu user={user} />
                    )}
                    { !user && (
                        <Link to="/login">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    )
}