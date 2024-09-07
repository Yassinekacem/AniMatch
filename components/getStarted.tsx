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
import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { dataAnimal } from '@/types/animalType'
import UploadWidget from './UploadWidget'
import Image from 'next/image'

function GetStarted({ data }: { data: dataAnimal }) {
    const [images, setImages] = useState<string[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                toast.error(error.response.data.message); // Show backend error message
            } else {
                toast.error('Error sending invitation');
            }
        }
    }

    return (
        <div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger>
                    <div className='my-6 flex items-center justify-center bg-white shadow-xl'>
                        <div className='w-[350px] h-[150px] border border-slate-400 flex flex-col items-center justify-center p-2 rounded-lg gap-2 shadow-md shadow-slate-400'>
                            <span className='font-bold'>Interested in a match?</span>
                            <Button className='bg-customPink text-white hover:bg-customPink'>Get started</Button>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] p-6">
                    <DialogHeader>
                        <DialogTitle>Send Invitation</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to send an invitation to the owner of this animal. 
                            Make sure to include a relevant description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="description" className="text-left">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="w-full"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Write your message here..."
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="images" className="text-left">
                                Images
                            </Label>
                            <div className='flex flex-col gap-2'>
                                <UploadWidget 
                                    uwConfig={{
                                        multiple: true,
                                        cloudName: "dxurkrqmb",
                                        uploadPreset: "animatch"
                                    }} 
                                    setState={setImages}
                                    setIsDialogOpen={setIsDialogOpen}
                                />
                                <div className="flex gap-3 flex-wrap">
                                    {images.map((image, index) => (
                                        <Image
                                            key={index}
                                            src={image}
                                            alt="Uploaded image"
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-xl object-cover"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-end gap-2">
                        <Button 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" onClick={SendInvitation}>
                            Send Invitation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default GetStarted
