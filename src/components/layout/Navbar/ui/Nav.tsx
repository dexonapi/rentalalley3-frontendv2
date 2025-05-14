import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { icon_name, profile_icon, menu } from '../../../../assets/icons';
import { SearchForm } from '../../../../components/SearchForm';

const Nav = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('place');
  const location = useLocation(); // Get current location
  const isHomePage = location.pathname === '/'; // Check if we're on home page
  const isProfilePage = location.pathname === '/profile'; // Check if we're on profile page


  const switchTab = (activeSwitch: string) => {
    if (activeSwitch === activeTab) {
      return 'text-[#222222] switch-effect';
    }

    return 'switch-effect-after font-cereal-Bk text-slate-gray switch-effect';
  };

  return (
    <header className={`py-2 z-10 fixed top-0 left-0 right-0 bg-white ${isProfilePage ? 'border-b-[0.5px] border-[#D8D8D8]' : ''}`}>
      <nav className="flex justify-between items-center max-container font-cereal-Md">
        <a href="/"><img src={icon_name} alt="icon" width={164} height={164} /></a>

        <section className="flex gap-4">
          <span className={switchTab('place')} onClick={() => setActiveTab('place')}>
            {isHomePage ? 'Place to stay' : ''}
          </span>

          <span className={switchTab('experiences')} onClick={() => setActiveTab('experiences')}>
            {isHomePage ? 'Experiences' : ''}
          </span>
        </section>
        <section className={`flex gap-3 justify-between items-center ${isHomePage ? 'border-[0.5px] border-[#D8D8D8] py-2 px-3' : ''}  rounded-3xl min-w-20 hover:custom-shadow`}>
          {/* Menu */}
          {isHomePage && <img src={menu} alt="menu" width={20} height={20} className="cursor-pointer" />}
          {/* Profile */}
          {isProfilePage ? <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-cereal-Md">
            D
          </div> : <img 
            src={profile_icon} 
            alt="profile_icon" 
            width={26} 
            height={26} 
            className="cursor-pointer" 
            onClick={() => navigate('/profile')} 
          />}
        </section>
      </nav>

      {isHomePage && <SearchForm />}
    </header>
  )
}

export default Nav