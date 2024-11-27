'use client'; // Ensure this component runs on the client side

import React, { useEffect, useState } from 'react';
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
import { useRouter, useSearchParams } from 'next/navigation';

const cityOptions = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Beja", "Jendouba", "Kef", "Siliana", "Kairouan", "Sousse", "Mahdia",
    "Monastir", "Sfax", "Gabes", "Mednine", "Tozeur", "Gafsa", "Kasserine",
    "Sidi Bouzid", "Tataouine", "Gbelli"
];

const CatsBreedsOptions = ["Siamois", "Persan", "Bengal", "Scottish Fold", "Ragdoll", "sphynx", "snowshoe", "himalayan", "Others"];

type FilterProps = {
    onFilterChange: (filters: { breed?: string; city?: string; gender?: string; ageCategory?: string; vaccinated?: boolean; friendly?: boolean }) => void;
};

const Filter = ({ onFilterChange }: FilterProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // State variables initialized from searchParams
    const [selectedBreed, setSelectedBreed] = useState(searchParams.get('breed') || '');
    const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
    const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || '');
    const [selectedAgeCategory, setSelectedAgeCategory] = useState(searchParams.get('ageCategory') || '');
    const [vaccinated, setVaccinated] = useState(searchParams.get('vaccinated') === 'true');
    const [friendly, setFriendly] = useState(searchParams.get('friendly') === 'true');

    // Sync state with URL on initial load and URL changes
    useEffect(() => {
        setSelectedBreed(searchParams.get('breed') || '');
        setSelectedCity(searchParams.get('city') || '');
        setSelectedGender(searchParams.get('gender') || '');
        setSelectedAgeCategory(searchParams.get('ageCategory') || '');
        setVaccinated(searchParams.get('vaccinated') === 'true');
        setFriendly(searchParams.get('friendly') === 'true');
    }, [searchParams]);

    const updateSearchParams = () => {
        const params = new URLSearchParams();

        if (selectedBreed) params.set('breed', selectedBreed);
        if (selectedCity) params.set('city', selectedCity);
        if (selectedGender) params.set('gender', selectedGender);
        if (selectedAgeCategory) params.set('ageCategory', selectedAgeCategory);

        if (vaccinated) params.set('vaccinated', 'true');
        if (friendly) params.set('friendly', 'true');

        router.push(`?${params.toString()}`);
    };

    const applyFilters = () => {
        const filters: { breed?: string; city?: string; gender?: string; ageCategory?: string; vaccinated?: boolean; friendly?: boolean } = {};

        if (selectedBreed) filters.breed = selectedBreed;
        if (selectedCity) filters.city = selectedCity;
        if (selectedGender) filters.gender = selectedGender;
        if (selectedAgeCategory) filters.ageCategory = selectedAgeCategory;

        if (vaccinated) filters.vaccinated = vaccinated;
        if (friendly) filters.friendly = friendly;

        onFilterChange(filters);
        updateSearchParams();
    };

    return (
        <div className='h-[1100px] shadow-xl shadow-slate-400 w-[350px] mr-4 bg-white'>
            <div className='flex items-center justify-between'>
                <Button className='text-pink-400 bg-white hover:bg-white'>
                    Filters
                </Button>
                <Button
                    className='text-gray-400 bg-white hover:bg-white'
                    onClick={() => {
                        router.push('/');
                        setSelectedBreed('');
                        setSelectedCity('');
                        setSelectedGender('');
                        setSelectedAgeCategory('');
                        setVaccinated(false);
                        setFriendly(false);
                    }}
                >
                    Reset Filters
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
                <Select onValueChange={setSelectedCity} value={selectedCity}>
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="City" />
                    </SelectTrigger>
                    <SelectContent>
                        {cityOptions.map(city => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedBreed} value={selectedBreed}>
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="Breed" />
                    </SelectTrigger>
                    <SelectContent className='mb-5'>
                        {CatsBreedsOptions.map(breed => (
                            <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedGender} value={selectedGender}>
                    <SelectTrigger className="w-[90%] mx-auto ">
                        <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={setSelectedAgeCategory} value={selectedAgeCategory}>
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
