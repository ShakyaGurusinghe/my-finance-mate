import React from 'react';

const Budget = () => {
  return (
    <div className="p-6 bg-purple-100 rounded-lg shadow-lg mt-10">
      <div className="mb-4">
        <h6 className="text-2xl font-semibold">Budget Goals Vs Savings Overview</h6>
      </div>
      <div>
        <p className="text-xl">Track your budget goals and save!</p>
      </div>

      {/* Buttons Section */}
      <div className="mt-6 flex justify-end"> {/* Right-align the button container */}
  {/* Add Button */}
  <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-400 flex items-center space-x-2">
    <i className="fas fa-plus"></i> 
    <span>Add Budget Goal</span>
  </button>
</div>

<div>
<div className="mt-6 flex justify-end">
    <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-400 flex items-center space-x-2">
    <i className="fas fa-download"></i> 
    <span>Download</span>
  </button></div></div>
      
      <br />
    </div>
  );
};

export default Budget;
