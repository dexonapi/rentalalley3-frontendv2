import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { icon_name, profile_icon, menu, support, home } from '../../../../assets/icons';
import { SearchForm } from '../../../../components/SearchForm';
import { motion } from 'framer-motion';

const Nav = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('place');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation(); // Get current location
  const isHomePage = location.pathname === '/'; // Check if we're on home page
  const isProfilePage = location.pathname === '/profile'; // Check if we're on profile page
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const switchTab = (activeSwitch: string) => {
    if (activeSwitch === activeTab) {
      return 'text-[#222222] switch-effect';
    }

    return 'switch-effect-after font-cereal-Bk text-slate-gray switch-effect';
  };

  return (
    <header className={`fixed top-0 left-0 right-0 bg-[#fcfcfc] border-b-[0.5px] border-[#f3f3f3] ${isProfilePage ? 'border-b-[0.5px] border-[#D8D8D8]' : ''} z-100 transition-all duration-300 ${isScrolled ? 'pt-4 pb-4' : 'pt-4 pb-20'}`}>
      <nav className="flex justify-between items-center max-container font-cereal-Md transition-all duration-300">
        <a href="/" className="transition-all duration-300">
          <img src={icon_name} alt="icon" width={156} height={156} />
        </a>

        <section className="flex gap-4 transition-all duration-300 opacity-100">
          <motion.span 
            className={switchTab('place')} 
            onClick={() => setActiveTab('place')}
            initial={{ opacity: 1, y: 0 }}
            animate={isScrolled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isHomePage ? 'Place to stay' : ''}
          </motion.span>

          <motion.span 
            className={switchTab('experiences')} 
            onClick={() => setActiveTab('experiences')}
            initial={{ opacity: 1, y: 0 }}
            animate={isScrolled ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isHomePage ? 'Experiences' : ''}
          </motion.span>
        </section>
        <section className={`flex gap-3 justify-between items-center rounded-3xl min-w-20 hover:custom-shadow`}>
          {/* Menu */}
          {isHomePage && <p className="text-[#6a6a6a] cursor-pointer text-slate-gray switch-effect hover:text-[#222222] hover:bg-[#e9e9e9] rounded-full text-[14px] px-3 py-2">Add Listing</p>}
          {/* Profile */}
          {isProfilePage ? <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-cereal-Md">
            D
          </div> : (
            <div className="relative">
              <div className="w-10 h-10 bg-[#e9e9e9] text-white rounded-full flex items-center justify-center font-cereal-Md cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <img 
                  src={menu} 
                  alt="menu" 
                  width={18} 
                  height={18} 
                />
              </div>
              {isMenuOpen && (
                <motion.div
                  ref={menuRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 top-12 bg-white rounded-lg shadow-lg min-w-[200px] py-2 z-50">
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate('/help-center');
                    setIsMenuOpen(false);
                  }}>
                    <img src={support} alt="help" width={20} height={20} className="text-gray-600" />
                    <span className="font-cereal-Bk text-[14px]">Help Center</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate('/become-host');
                    setIsMenuOpen(false);
                  }}>
                    <img src={home} alt="host" width={20} height={20} className="text-gray-600" />
                    <span className="font-cereal-Bk text-[14px]">Become a Host</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}>
                    <img src={profile_icon} alt="profile" width={20} height={20} className="text-gray-600" />
                    <span className="font-cereal-Bk text-[14px]">Login/Signup</span>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </section>
      </nav>

      {isHomePage && (
        <motion.div 
          className="transition-all duration-300"
          style={{ transform: isScrolled ? 'translateY(-60px)' : 'translateY(0)' }}
        >
          <SearchForm isScrolled={isScrolled} />
        </motion.div>
      )}
    </header>
  )
}

export default Nav