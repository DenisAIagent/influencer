import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Add header/nav here if needed */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
