"use client";
import React, { useEffect, useState, useCallback } from 'react';
import Filter from '@/components/FilterCats';
import Card from '@/components/Card';
import { animalType } from '@/types/animalType';
import axios from 'axios';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Loader from '@/components/Loader';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Cats = () => {
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState('date'); // Default sort option
  const [animals, setAnimals] = useState<animalType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch animals from the server
  const getAnimals = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...filters, sortBy: sortOption, species: "Cat" });
      const response = await axios.get(`https://api-withdrizzle-orm-bmua-git-master-yassinekacems-projects.vercel.app/api/animals?${params.toString()}`);
      setAnimals(response.data); 
      console.log (response.data);
    } catch (error) {
      console.error("Error fetching animals:", error);
    } finally {
      setLoading(false);
    }
  }, [filters, sortOption]);

  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  // Pagination logic
  const items = 6;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(animals.length / items);

  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = animals.slice(startIndex, endIndex);

  const handleChange = (page: number) => {
    setCurrent(page);
  };

  return (
    <div className='flex flex-row mt-[20px]'>
      <div className='flex-1'>
        <Filter onFilterChange={setFilters} />
      </div>

      <div className='flex flex-col flex-2 gap-8 flex-wrap w-full'>
        <div className='w-[80%] flex items-center justify-between'>
          <div className='flex items-center border border-gray-200 rounded-lg'>
            <Input placeholder='search by breed' className='border-none outline-none' />
            <Search className='bg-customPink text-white w-9 h-12 rounded-r-lg' />
          </div>

          <div className='flex items-center gap-3'>
  <label htmlFor="sort-select" className='font-medium text-gray-700 whitespace-nowrap'>
    Sort by:
  </label>
  <Select
    value={sortOption}
    onValueChange={(value) => setSortOption(value)}  >
    <SelectTrigger >
      <SelectValue placeholder="Sort by" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="rate">Rate</SelectItem>
      <SelectItem value="date">Announcement Date</SelectItem>
    </SelectContent>
  </Select>
</div>

        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className='flex gap-8 flex-wrap w-full'>
            {dataPerPage
              .map((item: animalType) => <Card item={item} key={item.id} />)}
          </div>
        )}

        <div className='flex items-center justify-center gap-4'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (current > 1) handleChange(current - 1);
                  }}
                />
              </PaginationItem>
              {[...Array(nbPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={index + 1 === current}
                    onClick={(e) => {
                      e.preventDefault();
                      handleChange(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (current < nbPages) handleChange(current + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default Cats;
