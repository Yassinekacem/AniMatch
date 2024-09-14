import React, { useEffect, useState , useCallback } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "./ui/button";
import { invitationType } from "@/types/invitationType";
import axios from "axios";
import { animalType } from "@/types/animalType";
import toast from "react-hot-toast";

function InvitationSection({ item , removeInvitation }: { item: invitationType , removeInvitation: (wishId: number) => void }) {
  const [animal, setAnimal] = useState<animalType | null>(null); 
  const [status, setStatus] = useState(item.status);
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const animalInvited = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api-withdrizzle-orm-9e8n-jq5l35l9g-yassinekacems-projects.vercel.app/api/animals/${item.animalId}`
      );
      setAnimal(response.data[0] || null);
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  }, [item.animalId]);
  


  const handleAccept = async () => {
    try {
      await axios.patch(`https://api-withdrizzle-orm-9e8n-jq5l35l9g-yassinekacems-projects.vercel.app/api/invitations/${item.id}`, {
        status: "accepted",
      }); 
      setStatus("accepted"); 
      toast.success("Invitation accepted successfully");
    } catch (error) {
      toast.error("Error updating invitation status");
      console.error("Error updating invitation status:", error);
    }
  };  


  const deleteInvitation = async () => { 
    try {
      await axios.delete(`https://api-withdrizzle-orm-9e8n-jq5l35l9g-yassinekacems-projects.vercel.app/api/invitations/${item.id}`);  
      removeInvitation(item.id) 
      setIsDialogOpen(false);
      toast.success("Invitation deleted successfully");
    } catch (error) {
      console.error("Error deleting invitation:", error);
      toast.error("Error deleting invitation");
    }
  } 


  useEffect(() => {
    animalInvited();
  }, [animalInvited]);

  return (
    <div>
      <div className="flex flex-col gap-3 items-center justify-center p-3">
        <h1 className="text-3xl font-bold text-customGreen">Invitations</h1>

        <Table className="rounded-xl">
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg text-black font-medium text-center">
                Sender
              </TableHead>
              <TableHead className="text-lg text-black font-medium text-center">
                Your Animal
              </TableHead>
              <TableHead className="text-lg text-black font-medium text-center">
                Your Match Animal
              </TableHead>
              <TableHead className="text-lg text-black font-medium text-center">
                Status
              </TableHead>
              <TableHead className="text-lg text-black font-medium text-center">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-b-2 border-b-gray-200">
              <TableCell className="font-medium text-center w-1/5">
                <div className="flex gap-1 items-center justify-center">
                  <Image
                    src={item.senderPhoto}
                    alt="profile image"
                    width={50}
                    height={50}
                    className="rounded-full w-[40px] h-[40px]"
                  />
                  <span className="text-lg font-bold">{item.senderName}</span>
                </div>
              </TableCell>
              <TableCell className="w-1/5">
                <div className="flex gap-1 items-center justify-center">
                  {animal?.image[0] && (
                    <Image
                      src={animal.image[0]}
                      alt="animal image"
                      width={50}
                      height={50}
                      className="rounded-full w-[40px] h-[40px]"
                    />
                  )}
                  <span className="text-lg font-bold">{animal?.name}</span>
                </div>
              </TableCell>
              <TableCell className="w-1/5">
                <div className="flex gap-1 items-center justify-center">
                  {animal?.image[0] && (
                    <Image
                      src={item.images[0]}
                      alt="animal image"
                      width={50}
                      height={50}
                      className="rounded-full w-[40px] h-[40px]"
                    />
                  )}
                  <span className="text-lg font-bold">{item.animalName}</span>
                </div>
              </TableCell>
              <TableCell className="flex items-center justify-center">
              <h2 className={`border p-1 text-center text-slate-100 rounded-lg ${status === 'accepted' ? 'bg-green-500' : 'bg-orange-400'}`}>
                  {status === 'accepted' ? 'Accepted' : 'Pending ...'}
                </h2>
              </TableCell>
              <TableCell className="w-1/6 ">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
                  <DialogTrigger>
                  <Button className="bg-customBlue relative left-[45px]">View Details</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-y-auto bg-white ">
                    <DialogHeader>
                      <DialogTitle>Invitation Info</DialogTitle>
                      <DialogDescription>
                        Here you can see the details of the invitation
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="name" className="font-medium">Name:</Label>
                        <span>{item.animalName}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="age" className="font-medium">Age:</Label>
                        <span>{item.animalAge} Months</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="gender" className="font-medium">Gender:</Label>
                        <span>{item.animalGender}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="breed" className="font-medium">Breed:</Label>
                        <span>{item.animalBreed}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="city" className="font-medium">Lives in:</Label>
                        <span>{item.animalCity}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="vaccinated" className="font-medium">Vaccinated:</Label>
                        <span>{item.animalVaccinated ? "Yes" : "No"}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="friendly" className="font-medium">Friendly:</Label>
                        <span>{item.animalFriendly ? "Yes" : "No"}</span>
                      </div>
                      {item.animalSpecies === "Dog" && (
                        <div className="grid grid-cols-2 gap-4">
                          <Label htmlFor="trained" className="font-medium">Trained:</Label>
                          <span>{item.animalTrained ? "Yes" : "No"}</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Label htmlFor="description" className="font-medium">Content:</Label>
                        <p className="bg-gray-100 p-2 rounded-md">{item.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Label htmlFor="numTel" className="font-medium">Num Tel:</Label>
                        <span>{item.NumTel}</span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="images" className="font-medium">Images:</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {item.images.map((image, index) => (
                          <Image
                            key={index}
                            src={image}
                            alt="Image"
                            width={150}
                            height={150}
                            className="rounded-xl object-cover"
                          />
                        ))}
                      </div>
                      </div>
                    </div>
                    <DialogFooter className="">
                      <Button onClick={deleteInvitation} className="bg-red-500 rounded-xl">Refuse</Button>
                      <Button onClick={handleAccept} className="bg-green-500 rounded-xl">Accept</Button>
                    </DialogFooter>
                  </DialogContent>
                  </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default InvitationSection;
