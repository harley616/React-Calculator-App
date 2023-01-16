import Calculator from './Calculator';
import React from 'react';
import './App.css';

function App() {
  return (
    <div className='bg-blue-300 h-[100vh]'>
      <div className='text-center'>
        <div className='bg-red-500 h-10 text-white font-bold pt-1 w-[700px] m-auto rounded'>
          Welcome to my super cool Calculator app
        </div>
        <div className='w-[600px] m-auto mt-20'>
          <Calculator></Calculator>
        </div>
      </div>
    </div>
  );
}

export default App;
