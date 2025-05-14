import { useState } from 'react';
import { icon_name, profile_icon, menu } from '../../../../assets/icons';
import { SearchForm } from '../../../../components/SearchForm';

const Nav = () => {
  const [activeTab, setActiveTab] = useState('place');

  const switchTab = (activeSwitch: string) => {
    if (activeSwitch === activeTab) {
      return 'text-[#222222] switch-effect';
    }

    return 'switch-effect-after font-cereal-Bk text-slate-gray switch-effect';
  };

  return (
    <header className="py-2 z-10 fixed top-0 left-0 right-0">
      <nav className="flex justify-between items-center max-container font-cereal-Md">
        <img src={icon_name} alt="icon" width={164} height={164} />

        <section className="flex gap-4">
          <span className={switchTab('place')} onClick={() => setActiveTab('place')}>
            Place to stay
          </span>

          <span className={switchTab('experiences')} onClick={() => setActiveTab('experiences')}>
            Experiences
          </span>
        </section>
        <section className="flex gap-3 justify-between items-center border-[0.5px] border-[#D8D8D8] py-2 px-3 rounded-3xl min-w-20 hover:custom-shadow">
          <img src={menu} alt="menu" width={20} height={20} className="cursor-pointer" />
          <img src={profile_icon} alt="profile_icon" width={26} height={26} className="cursor-pointer" />
        </section>
      </nav>

      <SearchForm />
    </header>
  )
}

export default Nav