import React from 'react';
import Sidebar from "../components/Sidebar";
import RegistrationNavigate from "../components/RegistrationNavigate";
import Header from "../components/Header";
const CourseRegistration = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />

        <div className="flex mt-4 px-6">
          <RegistrationNavigate />
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
