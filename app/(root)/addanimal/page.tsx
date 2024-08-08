"use client";

import React from "react";
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

// Define the schema using Zod
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  species: z.enum(["dog", "cat"], { message: "Species is required" }),
  age: z.coerce.number().min(0, "Age must be a non-negative number"),
  breed: z.string().min(1, "Breed is required"),
  description: z.string().min(25, "Description must be at least 25 characters"),
  traits: z.object({
    vaccinated: z.boolean(),
    trained: z.boolean(),
    friendly: z.boolean(),
  }),
});

type FormData = z.infer<typeof schema>;

const AddAnimal = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      species: undefined, // Ensure this matches the expected enum values
      age: 0, // Default age to a number
      breed: "",
      description: "",
      traits: {
        vaccinated: false,
        trained: false,
        friendly: false,
      },
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle form submission logic
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
                  className="w-full border border-gray-300 rounded-md"
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
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  className="w-full border border-gray-300 rounded-md"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Breed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="germanShepherd">German Shepherd</SelectItem>
                    <SelectItem value="bulldog">Bulldog</SelectItem>
                    <SelectItem value="labradorRetriever">Labrador Retriever</SelectItem>
                  </SelectContent>
                </Select>
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
                  className="w-full border border-gray-300 rounded-md"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">male</SelectItem>
                    <SelectItem value="female">female</SelectItem>
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
                  type="string"
                  placeholder="City of pet"
                  className="w-full border border-gray-300 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                  value={field.value}
                />
                {errors.species && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.species.message}
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
            <div className="w-[60%] mx-auto justify-center ">
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
                        vaccinated: e.target.checked,
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
                        trained: e.target.checked,
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
                        friendly: e.target.checked,
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
