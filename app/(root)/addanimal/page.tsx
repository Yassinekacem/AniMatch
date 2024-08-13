"use client";

import React, { useState } from "react";
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

import { UploadButton} from "../../../lib/uploadthing";
import { FileUploader } from "@/components/FileUploader";
import type { FileWithPath } from '@uploadthing/react';


// Define the schema using Zod
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
  image: z.string().url("Must be a valid URL"),
  ownerId: z.string().min(1, "Owner ID is required"),
  gender: z.enum(["male", "female"]),
  city: z.string().min(1, "City is required"),
});

type FormData = z.infer<typeof schema>;

const AddAnimal = () => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]); // Default to empty array

  const handleFieldChange = (urls: string[]) => {
    setImageUrls(urls);
  };

  const {
    control,
    handleSubmit,
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
      image: "",
      ownerId: "",
      gender: undefined,
      city: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:3000/api/animals", {
        ...data,
        vaccinated: data.traits.vaccinated,
        trained: data.traits.trained,
        friendly: data.traits.friendly,
        available: true, // Assuming default value
      });
      console.log("Animal added successfully:", response.data);
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  return (
    <div className="m-8 bg-gray-50 rounded-lg p-6 shadow-md w-[60%] mx-auto">
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
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
                  placeholder="City of pet"
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
            <div className="w-[60%] mx-auto justify-center">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                {...field}
                placeholder="Enter a description"
                className="w-full h-[150px] border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="traits"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center justify-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Traits of your pet
              </label>
              <div className="flex flex-wrap items-start mt-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vaccinated"
                    checked={field.value.vaccinated}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        vaccinated: (e.target as HTMLInputElement).checked,
                      })
                    }
                  />
                  <label
                    htmlFor="vaccinated"
                    className="text-sm font-medium text-gray-700"
                  >
                    Vaccinated
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="trained"
                    checked={field.value.trained}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        trained: (e.target as HTMLInputElement).checked,
                      })
                    }
                  />
                  <label
                    htmlFor="trained"
                    className="text-sm font-medium text-gray-700"
                  >
                    Trained
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="friendly"
                    checked={field.value.friendly}
                    onChange={(e) =>
                      field.onChange({
                        ...field.value,
                        friendly: (e.target as HTMLInputElement).checked,
                      })
                    }
                  />
                  <label
                    htmlFor="friendly"
                    className="text-sm font-medium text-gray-700"
                  >
                    Friendly
                  </label>
                </div>
              </div>
            </div>
          )}
        />

        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col items-center gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <FileUploader
                imageUrls={imageUrls}
                onFieldChange={handleFieldChange}
                setFiles={setFiles}
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          )}
        />

        <Controller
          name="ownerId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-medium text-gray-700">
                Owner ID
              </label>
              <Input
                {...field}
                type="text"
                placeholder="Owner ID"
                className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.ownerId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.ownerId.message}
                </p>
              )}
            </div>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-customPink text-white rounded-lg p-3 font-semibold hover:bg-blue-600 transition"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddAnimal;