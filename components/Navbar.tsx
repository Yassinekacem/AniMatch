"use client";
import { SignOutButton, UserButton, useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Heart , MessageCircleMore } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { LayoutGrid , ChartBar } from 'lucide-react';
import { getCurrentUserWithDetails } from "@/actions/userActions";

  

const NavBar = () => {
    const pathname = usePathname();
    const { user, isSignedIn } = useUser();

    const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, []);

    // Helper function to determine if the link is active
    const isActive = (route: string) => pathname === route || pathname.startsWith(`${route}/`);

    return (
        <nav className="w-[95%] mx-auto border-b h-[8vh] flex items-center justify-between px-4 rounded-bl-3xl rounded-br-3xl shadow-md shadow-slate-200">
            <div className="flex items-center">
                <Link href="/">
                    <Image src="/images/Logo2.png" alt="logo" width={250} height={20} className="w-[150px] h-[50%]" />
                </Link>
            </div>
            <div className="flex-grow flex justify-center">
                <div className="flex flex-row items-center gap-10 px-4">
                    <Link href="/">
                        <h3
                            className={`font-semibold font-sanss ${isActive('/') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-black'}`}
                        >
                            Home
                        </h3>
                    </Link>
                    <Link href="/dogs">
                        <h3
                            className={`font-semibold font-sanss ${isActive('/dogs') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-black'}`}
                        >
                            Dogs
                        </h3>
                    </Link>
                    <Link href="/cats">
                        <h3
                            className={`font-semibold font-sanss ${isActive('/cats') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-black'}`}
                        >
                            Cats
                        </h3>
                    </Link>
                    <Link href="/about-us">
                        <h3
                            className={`font-semibold font-sanss ${isActive('/about-us') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-black'}`}
                        >
                            About Us
                        </h3>
                    </Link>
                    <Link href="/contact-us">
                        <h3
                            className={`font-semibold font-sanss ${isActive('/contact-us') ? 'text-blue-500 border-b-2 border-blue-500' : 'text-black'}`}
                        >
                            Contact Us
                        </h3>
                    </Link>
                </div>
            </div> 
           
            <div className="flex items-center gap-x-5">
                {isSignedIn ? (
                    <>
                        <DropdownMenu>
                        <DropdownMenuTrigger className="flex gap-2 ">
                             <Image src="/icons/menu1.png" alt="menu" width={20} height={20} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem >
                                <Link href={`/profile/${userDetails?.id}`} className="flex gap-2 items-center">
                                <ChartBar />
                                <span>Dashboard</span>
                                </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem >
                                <Link href="/wishlist" className="flex gap-2 items-center">
                                <Heart />
                                <span>Wishlist</span>
                                </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem >
                                <Link href="/wishlist" className="flex gap-2 items-center">
                                <MessageCircleMore />
                                <span>Chat</span>
                                </Link>
                                </DropdownMenuItem>

                                
                        </DropdownMenuContent>
                        </DropdownMenu>

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
