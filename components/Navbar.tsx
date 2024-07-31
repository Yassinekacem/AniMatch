"use client";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Heart } from 'lucide-react';

import React from 'react';
import { Button } from "./ui/button";

const NavBar = () => {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();
    return (
        <nav className="w-[90%] mx-auto border-b h-[8vh] flex items-center justify-between px-4 rounded-bl-3xl rounded-br-3xl shadow-md shadow-slate-200">
            <div className="flex items-center">
                <Link href="/">
                    <h1 className="font-bold text-3xl text-black"> Ani Match </h1>
                </Link>
            </div>
            <div className="flex-grow flex justify-center">
                <div className=" flex flex-row items-center gap-4 px-4">
                    <h3 className="font-bold text-black text-xl">Home</h3>
                    <h3 className="font-bold text-black text-xl">Dog's announcement</h3>
                    <h3 className="font-bold text-black text-xl">Cat's announcement</h3>
                    <h3 className="font-bold text-black text-xl">About us</h3>
                </div>
            </div>
            <div className="flex items-center gap-x-5">
                {isSignedIn ? (
                    <> 
                        <Heart />
                        <UserButton />
                    </>
                ) : (
                    <div className="flex items-center gap-x-5">
                        <Link href="/sign-in">
                            <Button className="bg-blue-400">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="bg-white text-pink-400 border-2 border-slate-100">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default NavBar;
