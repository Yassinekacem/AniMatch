import React, { useState } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { dataAnimal } from '@/types/animalType'



function GetStarted({ data }: { data: dataAnimal }) {
    const [formData, setFormData] = useState({
        description: '',
        images: [],
        senderId: data.senderId,
        receiverId: data.receiverId,
        animalId: data.animalId,
        senderName: data.senderName,
        senderPhoto: data.senderPhoto,
        animalName: data.animalName,
        status: 'pended',
        date: new Date()

    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const SendInvitation = async () => {
        try {
            await axios.post(`http://localhost:3000/api/invitations`, formData)
            toast.success('Invitation sent successfully');
            console.log(formData)
        } catch (error: any) {
            console.error("Error sending invitation:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); // Affiche le message d'erreur du backend
            } else {
                toast.error('Error sending invitation');
            }
        }
    }


    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='my-6 flex items-center justify-center bg-white shadow-xl'>
                        <div className='w-[350px] h-[150px] border border-slate-400 flex flex-col items-center justify-center p-2 rounded-lg gap-2 shadow-md shadow-slate-400'>
                        <span className='font-bold'>Interested in a match?</span>                        <Button className='bg-customPink text-white hover:bg-customPink'>Get started</Button>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Send Invitation</DialogTitle>
                        <DialogDescription>
                        Fill out the form below to send an invitation to the owner of this animal. 
                        Make sure to include a relevant description                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="col-span-3"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Images
                            </Label>
                        </div>
                    </div>
                    <DialogFooter>
                    <Button type="submit" onClick={SendInvitation}>Send Invitation</Button>                    </DialogFooter>
                </DialogContent>
            </Dialog>


        </div>
    )
}

export default GetStarted
