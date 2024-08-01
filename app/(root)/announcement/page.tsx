import React from 'react';
import Filter from '@/components/Filter';
import Card from '@/components/Card';

const Announcement = () => {
  return (
    <div className='flex flex-row mt-[20px]'>
        <div className='flex-1'>
        <Filter />
        </div>
      
      <div className='flex flex-2  gap-8 flex-wrap'>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
      
    </div>
  );
}

export default Announcement;
