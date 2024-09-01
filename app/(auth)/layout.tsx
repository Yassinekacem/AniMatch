import Image from "next/image";

export default function RootLayout({ children }:Readonly<{ children: React.ReactNode }>) {
  return (
   <main className="relative h-screen w-full">
 
<div className="background-container w-full">    {children} 
</div>
   </main> 
  )
}
