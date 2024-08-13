import React, { useState } from 'react';
import { Button } from './ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from 'next/image';
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';

type FilterProps = {
    onFilterChange: (filters: { breed?: string; city?: string; gender?: string; ageCategory?: string; vaccinated?: boolean; trained?: boolean; friendly?: boolean }) => void;
};

const Filter = ({ onFilterChange }: FilterProps) => {
    const [selectedBreed, setSelectedBreed] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedGender, setSelectedGender] = useState(''); 
    const [selectedAgeCategory, setSelectedAgeCategory] = useState('');


    const [vaccinated, setVaccinated] = useState(false);
    const [trained, setTrained] = useState(false);
    const [friendly, setFriendly] = useState(false);

    const applyFilters = () => {
        const filters: { breed?: string; city?: string; gender?: string; ageCategory?: string; vaccinated?: boolean; trained?: boolean; friendly?: boolean } = {};

        if (selectedBreed) filters.breed = selectedBreed;
        if (selectedCity) filters.city = selectedCity;
        if (selectedGender) filters.gender = selectedGender; 
        if (selectedAgeCategory) filters.ageCategory = selectedAgeCategory;

        if (vaccinated) filters.vaccinated = vaccinated;
        if (trained) filters.trained = trained;
        if (friendly) filters.friendly = friendly;

        onFilterChange(filters);
    };

    return (
        <div className='h-[1000px] shadow-xl shadow-slate-400 w-[350px] mr-4'>
            <div className='flex items-center justify-between'>
                <Button className='text-pink-400 bg-white hover:bg-white'>
                    Fillters
                </Button>
                <Button className='text-gray-400 bg-white hover:bg-white'>
                    Reset Fillters
                </Button>
            </div>
            <hr className='border-1 border-gray-400 w-[90%] mx-auto' />
            <div className='my-2 flex items-center justify-center gap-9'>
                <Link href={"/cats"}>
                    <Image src="/images/cat filter.png" alt='logo' width={150} height={20} className='w-[90px] h-[90px]' />
                </Link>
                <Link href={"/dogs"}>
                    <Image src="/images/dog filter.png" alt='logo' width={150} height={20} className='w-[90px] h-[90px]' />
                </Link>
            </div>
            <div className='flex flex-col gap-4 w-full mt-4'>
                <Select onValueChange={setSelectedCity} >
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="nabeul">nabeul</SelectItem>
                        <SelectItem value="tunis">tunis</SelectItem>
                        <SelectItem value="sousse">sousse</SelectItem>
                        <SelectItem value="gabes">gabes</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedBreed} >
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="Breed" />
                    </SelectTrigger>
                    <SelectContent className='mb-5'>
                        <SelectItem value="berger">Berger</SelectItem>
                        <SelectItem value="pitbull">Pitbull</SelectItem>
                        <SelectItem value="labrador">Labrador</SelectItem>
                        <SelectItem value="Caniche">Caniche</SelectItem>
                        <SelectItem value="malinois">Malinois</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedGender} >
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedAgeCategory}>
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="Age Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="puppy">Puppy</SelectItem>
                        <SelectItem value="young">Young</SelectItem>
                        <SelectItem value="adult">Adult</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                    </SelectContent>
                </Select> 

                
                <div className='w-[85%] mx-auto my-3'>
                    <span className='font-light text-md text-gray-400'>Select the items you want to display in your Filter:</span>
                    <div className='flex flex-col items-start mt-2 gap-3'>
                        <div className="flex items-center justify-center space-x-2">
                            <Checkbox
                                id="vaccinated"
                                checked={vaccinated}
                                onCheckedChange={(checked) => setVaccinated(checked === true)}
                            />
                            <label
                                htmlFor="vaccinated"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Vaccinated
                            </label>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <Checkbox
                                id="trained"
                                checked={trained}
                                onCheckedChange={(checked) => setTrained(checked === true)}
                            />
                            <label
                                htmlFor="trained"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Trained
                            </label>
                        </div>

                        <div className="flex items-center justify-center space-x-2">
                            <Checkbox
                                id="friendly"
                                checked={friendly}
                                onCheckedChange={(checked) => setFriendly(checked === true)}
                            />
                            <label
                                htmlFor="friendly"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Friendly
                            </label>
                        </div>
                    </div>
                </div>

                <Button onClick={applyFilters} className='text-pink-400 w-[50%] mx-auto bg-white border border-pink-400 hover:bg-white'>
                    Apply Your Filter
                </Button>
            </div>
        </div>
    );
};

export default Filter;
