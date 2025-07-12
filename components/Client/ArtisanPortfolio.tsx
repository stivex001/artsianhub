import React from "react";

// Mock portfolio data - replace with actual data
const mockPortfolioItems = [
  {
    id: 1,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  },
  {
    id: 2,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  },
  {
    id: 3,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  },
  {
    id: 4,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  },
  {
    id: 5,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  },
  {
    id: 6,
    title: "Installed 5-tap kitchen plumbing",
    location: "Chesterfield",
    description: "Ever hovered over a button and felt a satisfying bounce or heard a soft chime...",
    image: "/api/placeholder/350/200",
    services: ["Plumbing", "Carpentry"]
  }
];

type Props = {
  artisanId?: string;
};

export const ArtisanPortfolio = ({ artisanId }: Props) => {
  // In a real app, you would fetch portfolio data by artisan ID
  const portfolioItems = mockPortfolioItems;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Portfolio</h2>
      
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Project Image */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
              <img 
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Project Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              {/* Location */}
              <div className="flex items-center mb-3">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600 text-sm">{item.location}</span>
              </div>
              
              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {item.description}
              </p>
              
              {/* Services Tags */}
              <div className="flex flex-wrap gap-2">
                {item.services.map((service, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Load More Button */}
      {portfolioItems.length > 0 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            Load More Projects
          </button>
        </div>
      )}
      
      {/* Empty State */}
      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No portfolio items yet</h3>
          <p className="text-gray-600">This artisan hasn't uploaded any work samples yet.</p>
        </div>
      )}
    </div>
  );
};