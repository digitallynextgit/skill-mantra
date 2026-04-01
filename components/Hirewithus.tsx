import React from 'react';
import { hireSectionData } from '@/constants';
import Image from 'next/image';
import Companies from './Home/Companies';

const HireSection: React.FC = () => {
  const { title, description, stats, profiles } = hireSectionData;

  return (
    <main className='overflow-hidden'>
    <section className="flex flex-col max-w-7xl mx-auto items-center pt-40 px-4 md:px-8  lg:flex-row lg:justify-between lg:pt-36 lg:px-16 overflow-clip">
      {/* Text Content */}
      <div className="text-center lg:text-left ">
        <h2 className="text-4xl font-bold text-blue-90 md:text-7xl">{title}</h2>
        <p className="mt-6 md:text-xl text-black">{description}</p>

        {/* Stats */}
        <div  className='flex justify-start flex-col md:flex-row my-8 md:gap-20 gap-10 text-center '>
          {stats.map((stat, index) => (
            <div key={index} className='text-center'>
              <p className='text-4xl font-bold text-[#00E0D3]'>{stat.value}</p>
              <p className='text-xl text-black'>{stat.label}</p>
            </div>
          ))}
        </div>
        {/* <div className=" flex-row  lg:justify-start justify-center my-8 md:space-x-28">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-4xl font-bold text-[#00E0D3]">{stat.value}</p>
              <p className="text-xl text-black">{stat.label}</p>
            </div>
          ))}
        </div> */}
      </div>

      {/* Image and Profile Badges */}
      {/* <div className="relative mt-8 lg:mt-0 lg:flex lg:justify-center">
 
        <div className="absolute rounded-full bg-gradient-to-r from-blue-500 to-teal-500 w-80 h-80 lg:w-96 lg:h-96 -z-10"></div>


        <Image
          src="/path/to/main-image.jpg"
          alt="Main person"
          width={300}
          height={300}
          className="relative z-10 object-cover"
        />


        <div className="absolute top-4 left-4 flex space-x-4">
          {profiles.map((profile, index) => (
            <div key={index} className="bg-white p-2 rounded-lg shadow-lg flex items-center space-x-2">
              <Image
                src="/path/to/profile.jpg"
                alt={profile.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-bold text-gray-800">{profile.name}</p>
                <p className="text-xs text-gray-500">{profile.role}</p>
                <div className="text-yellow-500">
                  {'★'.repeat(profile.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <Image  src="/newgirl.webp" alt="Main person" width={500} height={200} />
      {/* <main>hello</main> */}
    </section>
    <section className='mx-auto max-w-7xl text-center '>
        <Companies/>
    </section>
    </main>

    
  );
};

export default HireSection;
