import React from 'react';
import GradientBar from './common/GradientBar';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const AppShell = ({ children }) => {
  return (
    <>
      <GradientBar />
      <div className="flex">
        <div className="sm:w-64 px-4 sm:px-8 pt-6">
          <Sidebar />
        </div>
        <div className="flex flex-col w-full border-l border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <Navbar />
          </div>
          <div className="px-4 sm:px-8 py-2">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppShell;
