import React, { useState } from 'react';
import { Edit, Home, Heart, Clock, MapPin } from 'react-feather';

const Profile = () => {
  const [name] = useState('Dexon');
  const [isGuest] = useState(true);

  const navItems = [
    {
      id: 'about',
      label: 'About me',
      icon: 'D',
      isInitial: true,
    },
    {
      id: 'listings',
      label: 'Listings',
      icon: <Home size={20} />,
    },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart size={20} />,
    },
    {
      id: 'history',
      label: 'History Trips',
      icon: <Clock size={20} />,
    },
  ];

  const [activeNav, setActiveNav] = useState('about');

  return (
    <main className="max-container py-12 font-cereal-Bk mt-9">
      <div className="flex justify-start gap-20 ml-19">
        {/* Left Sidebar */}
        <div className="w-[300px] flex-shrink-0 border-r-[0.5px] border-[#D8D8D8] pt-10 pr-10">
          <h1 className="text-[32px] font-cereal-Md text-[#222222] mb-6">Profile</h1>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all 
                  ${activeNav === item.id 
                    ? 'bg-gray-100' 
                    : 'hover:bg-gray-50'}`}
              >
                {item.isInitial ? (
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-cereal-Md">
                    {item.icon}
                  </div>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center text-[#222222]">
                    {item.icon}
                  </div>
                )}
                <span className={`${activeNav === item.id ? 'font-cereal-Md' : ''} text-[#222222]`}>
                  {item.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-[850px] pt-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-[32px] font-cereal-Md text-[#222222]">About me</h2>
            <button className="px-5 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center gap-2 transition-all font-cereal-Md">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-[#DDDDDD]">
            <div className="flex flex-col items-center text-center">
              <div className="w-[100px] h-[100px] bg-black text-white rounded-full flex items-center justify-center text-[42px] font-cereal-Md mb-6">
                D
              </div>
              <h3 className="text-[28px] font-cereal-Md text-[#222222] mb-1">{name}</h3>
              <p className="text-[#717171] font-cereal-Bk">{isGuest ? 'Guest' : 'Host'}</p>
            </div>
          </div>

          {/* Complete Profile Section */}
          <div className="mt-12">
            <h3 className="text-[24px] font-cereal-Md text-[#222222] mb-3">Complete your profile</h3>
            <p className="text-[#717171] mb-6 max-w-[480px]">
              Your Rental Alley profile is an important part of every reservation. Complete yours to help other hosts and guests get to know you.
            </p>
            <button className="bg-[#0DB2A9] text-white px-6 py-3 rounded-lg hover:bg-[#0c9e96] transition-colors font-cereal-Md">
              Get started
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mt-14 border-t border-[#DDDDDD] pt-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center text-[#222222]">
                <MapPin size={20} />
              </div>
              <span className="font-cereal-Md text-[#222222]">Reviews I've written</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;