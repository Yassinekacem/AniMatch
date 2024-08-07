"use client";
import React, { useEffect, useState } from 'react';
import Filter from '@/components/Filter';
import Card from '@/components/Card';
import { animalType } from '@/types/animalType';
import axios from 'axios';  
const Announcement = () => {
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
  return (
    <div className='flex flex-row mt-[20px]'>
      <div className='flex-1 '>
        <Filter />
      </div>

      <div className='flex flex-2 gap-8 flex-wrap w-full'>
        {animals.map((item : animalType) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
}

export default Announcement;
