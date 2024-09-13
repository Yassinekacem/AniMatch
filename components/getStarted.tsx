import React, { useEffect, useState } from 'react'
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
import { getCurrentUserWithDetails } from '@/actions/userActions';

import { Label } from "@/components/ui/label"
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'
import axios from 'axios'
import { dataAnimal } from '@/types/animalType'
import UploadWidget from './UploadWidget'
import Image from 'next/image'
import { Input } from './ui/input'


const Checkbox = ({ id, onChange }: { id: string; onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
    <input type="checkbox" id={id} onChange={onChange} />
);

const cityOptions = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Beja", "Jendouba", "Kef", "Siliana", "Kairouan", "Sousse", "Mahdia",
    "Monastir", "Sfax", "Gabes", "Mednine", "Tozeur", "Gafsa", "Kasserine",
    "Sidi Bouzid", "Tataouine", "Gbelli"
];

const DogsBreedsOptions = [
    "Labrador", "Rottweiler", "Berger Allemand", "Berger noir",
    "Malinois", "Husky", "Caniche", "Chihuahuah", "Dobermann", "Pitbull", "Bichon", "Others"
];

const CatsBreedsOptions = [
    "Persan", "Siamois", "Sphynx", "Maine Coon", "British Shorthair", "Bengal", "Ragdoll", "Birman", "Savannah", "Scottish Fold", "Others"
]

function GetStarted({ data }: { data: dataAnimal }) {
    const [images, setImages] = useState<string[]>([]);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        receiverId: data.receiverId,
        animalId: data.animalId,
        animalName: '',
        animalSpecies: data.animalSpecies,
        senderName: '',
        senderPhoto: '',
        senderId: '',
        status: 'pended',
        animalBreed: '',
        animalGender: data.animalGender === 'male' ? 'female' : 'male',
        animalAge: 10,
        animalCity: '',
        NumTel: "",
        animalVaccinated: false,
        animalTrained: false,
        animalFriendly: false,
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await getCurrentUserWithDetails();
            setUserDetails(userDetails);
        };
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (userDetails) {
            setFormData(prevState => ({
                ...prevState,
                senderName: `${userDetails.lastName} ${userDetails.firstName}`,
                senderPhoto: userDetails.photo,
                senderId: userDetails.id,

            }));
        }
    }, [userDetails]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            images: images,
        }));
    }, [images]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                type === 'number' ? Number(value) : value,
        }));
    };

    const SendInvitation = async () => {
        console.log(formData);
        try {
            await axios.post(`http://localhost:3000/api/invitations`, formData);
            toast.success('Invitation sent successfully');
        } catch (error: any) {
            console.error("Error sending invitation:", error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Error sending invitation');
            }
        }
    };

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
                {/* <DialogContent className="sm:max-w-[425px] p-6"> */}
                <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-y-auto bg-white">
                    <DialogHeader>
                        <DialogTitle>Send Invitation</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to send an invitation to the owner of this animal.
                            Make sure to include a relevant description.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="animalBreed" className="text-left">
                                Animal Breed
                            </Label>
                            <select
                                id="animalBreed"
                                name="animalBreed"
                                className="w-full"
                                value={formData.animalBreed}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select a breed</option>
                                {(data.animalSpecies === 'Dog' ? DogsBreedsOptions : CatsBreedsOptions).map((breed) => (
                                    <option key={breed} value={breed}>
                                        {breed}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="animalCity" className="text-left">
                                Animal City
                            </Label>
                            <select
                                id="animalCity"
                                name="animalCity"
                                className="w-full"
                                value={formData.animalCity}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select a city</option>
                                {cityOptions.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="age" className="text-left">
                                Animal Age
                            </Label>
                            <Input
                                type="number"
                                id="animalAge"
                                name="animalAge"
                                className="w-full"
                                onChange={handleChange}
                                placeholder="Your animal Age"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="name" className="text-left">
                            Animal Name
                            </Label>
                            <Input
                                id="animalName"
                                name="animalName"
                                className="w-full"
                                onChange={handleChange}
                                placeholder="Your animal name"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="age" className="text-left">
                                Num Tel
                            </Label>
                            <Input
                                type="number"
                                id="NumTel"
                                name="NumTel"
                                className="w-full"
                                onChange={handleChange}
                                placeholder="Your telephone number"
                            />
                        </div>
                        <Label htmlFor="animalBreed" className="text-left">
                            Traits
                        </Label>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="vaccinated" className="text-right">Vaccinated? </Label>
                            <Checkbox id="animalVaccinated" onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="trained" className="text-right">Trained? </Label>
                            <Checkbox id="animalTrained" onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="friendly" className="text-right">Friendly? </Label>
                            <Checkbox id="animalFriendly" onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <Label htmlFor="description" className="text-left">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                className="w-full"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your animal here..."
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
