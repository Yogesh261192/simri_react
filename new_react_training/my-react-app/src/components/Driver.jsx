import React from 'react';

const drivers = [
  {
    id: 1,
    name: 'Atul Rawat',
    experience: '5 years',
    car: 'Ertica',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Rakesh',
    experience: '15 years',
    car: 'Scorpio',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    id: 3,
    name: 'Mohit',
    experience: '10 years',
    car: 'Maruti Ertiga',
    image: 'https://randomuser.me/api/portraits/men/55.jpg',
  },
  {
    id: 4,
    name: 'Golu',
    experience: '4 years',
    car: 'Mahindra XUV500',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
];

export default function DriverList() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Drivers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:-translate-y-2">
              <div className="h-48 overflow-hidden">
                <img
                  src={driver.image}
                  alt={driver.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-medium text-gray-800 text-lg">{driver.name}</h3>
                <p className="text-sm text-gray-600">Experience: {driver.experience}</p>
                <p className="text-sm text-gray-600">Car: {driver.car}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
