"use client";
import React, { useEffect, useState } from 'react';
import Filter from '@/components/Filter';
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
} from "@/components/ui/pagination"


const Announcement = () => { 
  // fetch animals from the server
  const [animals, setAnimals] = useState([]); 
  const getAnimals = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/animals");
      setAnimals(response.data); 
    } catch (error) {
      console.error("Error fetching animals:", error);
    }
  };
  useEffect(() => {
    getAnimals();
  }, []);   

  // pagination 
  const items = 6;
  const [current, setCurrent] = useState(2); 
  const nbPages = Math.ceil(animals.length / items);  

  const startIndex = (current - 1) * items;  
  const endIndex = startIndex + items; 
  const dataPerPage = animals.slice(startIndex, endIndex);  

  const handleChange = (page: number) => {
    setCurrent(page);
  }

  return (
    <div className='flex flex-row mt-[20px]'>
      <div className='flex-1'>
        <Filter />
      </div>

      <div className='flex flex-col flex-2 gap-8 flex-wrap w-full'>
        <div className='flex gap-8 flex-wrap w-full'>
          {dataPerPage.map((item: animalType) => <Card item={item} key={item.id} />)}
        </div>
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
}

export default Announcement;
