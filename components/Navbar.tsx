"use client";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Heart } from 'lucide-react';

import React from 'react';
import { Button } from "./ui/button";
import Image from "next/image";

const NavBar = () => {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();
    return (
        <nav className="w-[95%] mx-auto border-b h-[8vh] flex items-center justify-between px-4 rounded-bl-3xl rounded-br-3xl shadow-md shadow-slate-200">
            <div className="flex items-center">
                <Link href="/home">
                    <Image src="/images/Logo2.png" alt="logo" width={250} height={20} className="w-[150px] h-[50%]" />
                </Link>
            </div>
            <div className="flex-grow flex justify-center">
                <div className=" flex flex-row items-center gap-6 px-4">
                    <h3 className="font-semibold text-black  font-sanss">Home</h3>
                    <Link href="/announcement">
                    <h3 className="font-semibold text-black  font-sanss">Dogs announcement</h3> 
                    </Link> 
                    <Link href="/announcement">
                    <h3 className="font-semibold text-black  font-sanss">Cats announcement</h3> 
                    </Link>
                    <Link href="/about-us"> 

                    <h3 className="font-semibold text-black  font-sanss ">About us</h3> 
                    </Link>
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
                            <Button className="bg-blue-400 font-extrabold hover:bg-blue-400">
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/sign-up">
                            <Button className="bg-white text-pink-400 border-2 font-extrabold border-slate-100 hover:bg-white">
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
