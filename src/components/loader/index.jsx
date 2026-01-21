import React from 'react';

const Container = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
           style={{ animationDelay: '0ms' }} />
      <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
           style={{ animationDelay: '150ms' }} />
      <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" 
           style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const CustomLoader = () => {
  return <Container />;
};

export default CustomLoader;