"use client";

import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UploadWidget from "@/components/UploadWidget";
import { getCurrentUserWithDetails } from "@/actions/userActions";


const schema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.enum(["Dog", "Cat"], { message: "Species is required" }),
  age: z.coerce.number().min(0, "Age must be a non-negative number"),
  breed: z.string().min(1, "Breed is required"),
  description: z.string().min(25, "Description must be at least 25 characters"),
  traits: z.object({
    vaccinated: z.boolean(),
    trained: z.boolean(),
    friendly: z.boolean(),
  }),
  gender: z.enum(["male", "female"]),
  city: z.string().min(1, "City is required"),
  images: z.array(z.string()).max(4, "You can only upload up to 4 images"),
});

type FormData = z.infer<typeof schema>;

const AddAnimal = () => {
  const [images, setImages] = useState<string[]>([]);

  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = await getCurrentUserWithDetails();
      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, []);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      species: undefined,
      age: 0,
      breed: "",
      description: "",
      traits: {
        vaccinated: false,
        trained: false,
        friendly: false,
      },
      gender: undefined,
      city: "",
      images: [], // Ensure default is an empty array
    },
  });



  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/animals", {
        ...data,
        images: images, // Use state value here
        vaccinated: data.traits.vaccinated,
        trained: data.traits.trained,
        friendly: data.traits.friendly,
        available: true,
        ownerId: userDetails?.id,
      });
      console.log("Animal added successfully:", response.data);
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  return (
    <div className="bg-custom-radial-linear pb-1 w-full ">
      <div className="m-9  bg-gray-50 rounded-lg p-6 shadow-md w-[60%] mx-auto relative top-[15px]">
        <h1 className="font-extrabold text-4xl text-center mb-6">Add Animal</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name of pet"
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="species"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Species
                  </label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.species && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.species.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    placeholder="Age of pet"
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.age.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="breed"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Breed
                  </label>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Breed"
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.breed && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.breed.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender
                  </label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <Input
                    {...field}
                    type="text"
                    placeholder="City"
                    className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  {...field}
                  placeholder="Enter at least 25 characters"
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex items-center justify-center space-x-4">
            <label className="block text-sm font-medium text-gray-700">
              Traits
            </label>
            <Controller
              name="traits.vaccinated"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="vaccinated"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="vaccinated">Vaccinated</label>
                </div>
              )}
            />

            <Controller
              name="traits.trained"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="trained"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="trained">Trained</label>
                </div>
              )}
            />

            <Controller
              name="traits.friendly"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="friendly"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <label htmlFor="friendly">Friendly</label>
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-2 items-center justify-center">
            <label >Upload Images</label>
            <UploadWidget uwConfig={{
              multiple: true,
              cloudName: "dxurkrqmb",
              uploadPreset: "animatch"
            }}
              setState={setImages} />
                  
              <div className="flex gap-3">
            {images.map((image, index) => (
             
                <Image
                  key={index}
                  src={image}
                  alt="Uploaded image"
                  width={250}
                  height={200}
                  className="w-[250px] h-[120px] rounded-md"
                />
              ))}
              </div>

            {errors.images && (
              <p className="text-red-500 text-sm mt-1">
                {errors.images.message}
              </p>
            )}
          </div>





          <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-customPink">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddAnimal;