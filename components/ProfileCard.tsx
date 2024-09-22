import Image from 'next/image';
import React, { useState } from 'react';
import { Trash2, FilePenLine } from 'lucide-react';
import { Button } from './ui/button';
import { animalType } from '@/types/animalType';
import axios from 'axios';
import toast from 'react-hot-toast';
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
import { Textarea } from './ui/textarea';
import UploadWidget from './UploadWidget';

const Checkbox = ({ id, checked, onChange }: { id: string; checked: boolean; onChange: React.ChangeEventHandler<HTMLInputElement> }) => (
  <input type="checkbox" id={id} checked={checked} onChange={onChange} />
);

const ProfileCard = ({ animal, onDelete, onUpdate }: { animal: animalType; onDelete: (id: number) => void; onUpdate: () => void }) => {
  const [formData, setFormData] = useState({
    name: animal.name,
    breed: animal.breed,
    gender: animal.gender,
    age: animal.age,
    city: animal.city,
    vaccinated: animal.vaccinated,
    trained: animal.trained,
    friendly: animal.friendly,
    available: animal.available,
    description: animal.description, 
    image: animal.image, 
    ownerId: animal.ownerId 
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target as HTMLInputElement;
    setFormData(prevState => ({
      ...prevState,
      [id]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const updateAnimal = async () => {
    try {
      const updatedData = {
        ...formData,
        image: images.length === 0 ? [...formData.image,] : images, // Ajoute les nouvelles images seulement si elles existent
      };
      
      await axios.put(`http://localhost:3000/api/animals/${animal.id}`, updatedData);
      toast.success('Animal updated successfully');
      onUpdate(); // Call the onUpdate function to refresh data
      setIsDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Error updating animal:", error);
      toast.error('Error updating animal');
    }
  };

  const DeleteAnimal = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/animals/${animal.id}`);
      toast.success('Animal deleted successfully');
      onDelete(animal.id);
    } catch (error) {
      console.error("Error deleting animal:", error);
      toast.error('Error deleting animal');
    }
  };

  return (
    <div className='flex items-center justify-between w-full h-[110px] bg-white rounded-lg border border-gray-200 shadow-md p-4 z-4'>
      <div className='flex gap-4 items-center'>
        <Image src={animal.image[0]} alt="Image" width={150} height={150} className='rounded-full w-20 h-20 object-cover' />
        <div className='flex flex-col'>
          <span className='font-semibold text-lg text-gray-800'>{animal.name}</span>
          <span className='text-gray-500 text-sm'>Age: {animal.age} months , Gender: {animal.gender}</span>
        </div>
      </div>
      <div className='flex gap-3'>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button className='p-2 bg-blue-50 border border-blue-200 hover:bg-blue-100'>
              <FilePenLine className='w-5 h-5 text-blue-500' />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[100vh] overflow-y-auto bg-white">
            <DialogHeader>
              <DialogTitle>Update Animal</DialogTitle>
              <DialogDescription>
                Make changes to your animal details. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-8">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" value={formData.name} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="breed" className="text-right">Breed</Label>
                <Input id="breed" value={formData.breed} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="gender" className="text-right">Gender</Label>
                <Input id="gender" value={formData.gender} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="age" className="text-right">Age (in months)</Label>
                <Input id="age" type="number" value={formData.age} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="city" className="text-right">City</Label>
                <Input id="city" value={formData.city} onChange={handleInputChange} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaccinated" className="text-right">Vaccinated</Label>
                <Checkbox id="vaccinated" checked={formData.vaccinated} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="trained" className="text-right">Trained</Label>
                <Checkbox id="trained" checked={formData.trained} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="friendly" className="text-right">Friendly</Label>
                <Checkbox id="friendly" checked={formData.friendly} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="available" className="text-right">Available</Label>
                <Checkbox id="available" checked={formData.available} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={formData.description} onChange={handleInputChange} className="col-span-3 h-24 " />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="current images" className="text-right">Current images</Label>
                <div className='flex gap-2'>
                  {formData.image.map((img, index) => (
                    <Image src={img} alt="Image" width={150} height={150} key={index} className='rounded-xl w-20 h-20 object-cover' />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="updated images" className="text-right">Updated images</Label>
                <div className='flex flex-col gap-2'>
                <UploadWidget uwConfig={{
                  multiple: true,
                  cloudName: "dxurkrqmb",
                  uploadPreset: "animatch"
                }} setState={setImages}
                  setIsDialogOpen={setIsDialogOpen}
                />
                <div className="flex gap-3">
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt="Uploaded image"
                      width={250}
                      height={200}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ))}
                </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={updateAnimal}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button className='p-2 bg-red-50 border border-red-200 hover:bg-red-100' onClick={DeleteAnimal}>
          <Trash2 className='w-5 h-5 text-red-500' />
        </Button>
      </div>
    </div>
  );
};

export default ProfileCard;