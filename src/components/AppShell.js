import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const AppShell = ({ children }) => {
  return (
    <>
      <div>
        <div>
          <Sidebar />
        </div>
        <div>
          <div>
            <Navbar />
          </div>
          <div>
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default AppShell;
