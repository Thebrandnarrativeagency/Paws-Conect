
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const EventsView: React.FC = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-lg font-bold text-gray-800">Explore Nearby</h3>
        <button className="text-[#78B2A4] text-xs font-bold uppercase tracking-wider">New Event +</button>
      </div>

      <div className="space-y-6">
        {MOCK_EVENTS.map((event) => (
          <div key={event.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl shadow-sm">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">{event.type}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h4>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <ClockIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPinIcon className="w-4 h-4" />
                  <span className="text-xs font-medium">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <img 
                      key={i} 
                      src={`https://picsum.photos/seed/user${i}/100`} 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                      alt="Attendee"
                    />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gray-500">+{event.attendees - 4}</span>
                  </div>
                </div>
                
                <button className="px-6 py-2 bg-[#78B2A4] text-white rounded-full font-bold text-sm shadow-md shadow-[#78B2A4]/20 hover:scale-105 transition-transform">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsView;
