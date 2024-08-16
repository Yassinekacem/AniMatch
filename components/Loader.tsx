import React from 'react';

const Loader = () => {
  return (
    <div className='flex flex-col h-screen items-center justify-center gap-3'>
      <div className='w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin'></div>
      <p className='text-black text-lg'>Loading...</p>
    </div>
  );
}

export default Loader;
