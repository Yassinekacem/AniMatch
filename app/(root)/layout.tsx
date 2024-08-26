import Image from "next/image";

export default function RootLayout({ children }:Readonly<{ children: React.ReactNode }>) {
  return (
   <main > 
    <div className="background-container w-full">
    {children}

    </div>
   </main> 
  )
}
