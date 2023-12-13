import React, { useState } from 'react';
import { fetchUserValue, createUserEntry, updateUserValue, deleteUser } from '../ApiService';

const UserComponent = () => {
  const [userID, setUserID] = useState('');
  const [value, setValue] = useState('');
  const [goal, setGoal] = useState('');
  const [askForValue, setAskForValue] = useState(false);
  const [showForm, setShowForm] = useState(true); // New state to control form visibility

  // Fetch user value
  const handleFetch = async () => {
    try {
      const response = await fetchUserValue(userID);
      if (response.data && response.data.data && typeof response.data.data.value !== 'undefined') {
        setGoal(`Your goal is: ${response.data.data.value}`);
        setShowForm(false); // Hide form after finding the goal
      } else {
        setAskForValue(true);
      }
    } catch (error) {
      console.error('Error fetching user value:', error);
    }
  };

  // Create user entry
  const handleCreate = async () => {
    try {
      const response = await createUserEntry(userID, parseInt(value, 10));
      setGoal(`Your goal is: ${response.data.data}`);
      setShowForm(false); // Hide form after creating the goal
      setAskForValue(false);
    } catch (error) {
      console.error('Error creating user entry:', error);
    }
  };

  // Update user value
  const handleUpdate = async () => {
    try {
      const intValue = parseInt(value, 10);
      if (isNaN(intValue)) {
        console.error('Value must be a number');
        return;
      }
      const response = await updateUserValue(userID, intValue);
      console.log(response)
      setGoal(`Your goal is updated to: ${response.data.data}`);
    } catch (error) {
      console.error('Error updating user value:', error);
    }
  };

  // Delete user value
  const handleDelete = async () => {
    try {
      const response = await deleteUser(userID);
      setGoal('');
      setAskForValue(false);
      setShowForm(true);
      console.log('Goal deleted:', response.data);
    } catch (error) {
      console.error('Error deleting user value:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {showForm && !askForValue && (
        <div className="flex flex-col items-center">
          <input
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
            type="text"
            placeholder="Enter UserID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleFetch}
          >
            Check Goal
          </button>
        </div>
      )}

      {showForm && askForValue && (
        <div className="flex flex-col items-center">
          <input
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
            type="text"
            placeholder="Enter Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={handleCreate}
          >
            Set Goal
          </button>
        </div>
      )}

      {goal && (
        <div className="flex flex-col items-center mt-4">
          <p className="mb-4">{goal}</p>
          <input
            className="border-2 border-gray-300 p-2 rounded-md mb-4"
            type="text"
            placeholder="Update Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-center space-x-2">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-700 w-32"
            onClick={handleUpdate}
          >
            Update Goal
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 w-32"
            onClick={handleDelete}
          >
            Delete Goal
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default UserComponent;