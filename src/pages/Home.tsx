import React from 'react';
import { Link } from 'react-router-dom';
import { Clock as ClockIcon } from 'lucide-react';
import Clock from '../components/Clock';

const Home: React.FC = () => {
  const southAmericanClocks = [
    { country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
    { country: 'Bolivia', timezone: 'America/La_Paz' },
    { country: 'Chile', timezone: 'America/Santiago' },
    { country: 'Ecuador', timezone: 'America/Guayaquil' },
    { country: 'Paraguay', timezone: 'America/Asuncion' },
    { country: 'Peru', timezone: 'America/Lima' },
    { country: 'Uruguay', timezone: 'America/Montevideo' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center text-primary-300">
        Multi-Timezone Clock
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full mb-12">
        <div className="flex flex-col items-center p-8 rounded-xl bg-neutral-800/50 border border-neutral-700">
          <ClockIcon className="w-12 h-12 mb-4 text-primary-400" />
          <h2 className="text-2xl font-semibold mb-6 text-primary-300">
            Brasília
          </h2>
          <Clock timezone="America/Sao_Paulo" />
          <Link 
            to="/brasilia" 
            className="mt-8 px-6 py-2 text-sm font-medium text-primary-300 hover:text-primary-200 border border-primary-700 rounded-full hover:bg-primary-900/40 transition-all duration-300"
          >
            View Fullscreen
          </Link>
        </div>
        
        <div className="flex flex-col items-center p-8 rounded-xl bg-neutral-800/50 border border-neutral-700">
          <ClockIcon className="w-12 h-12 mb-4 text-secondary-400" />
          <h2 className="text-2xl font-semibold mb-6 text-secondary-300">
            St. Louis
          </h2>
          <Clock timezone="America/Chicago" />
          <Link 
            to="/stlouis" 
            className="mt-8 px-6 py-2 text-sm font-medium text-secondary-300 hover:text-secondary-200 border border-secondary-700 rounded-full hover:bg-secondary-900/40 transition-all duration-300"
          >
            View Fullscreen
          </Link>
        </div>
      </div>

      <div className="w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center text-primary-200">
          South American Time Zones
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {southAmericanClocks.map(({ country, timezone }) => (
            <div key={country} className="flex flex-col items-center p-6 rounded-xl bg-neutral-800/30 border border-neutral-800">
              <h3 className="text-xl font-semibold mb-4 text-primary-300">
                {country}
              </h3>
              <Clock timezone={timezone} />
            </div>
          ))}
        </div>
      </div>
      
      <p className="mt-12 text-neutral-500 text-center max-w-lg">
        Click "View Fullscreen" to see each clock in a distraction-free interface.
      </p>
    </div>
  );
};

export default Home;