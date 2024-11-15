import React from 'react';
import TeamList from './components/team-list';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-12">
          Basketball Teams and Players
        </h1>
        <TeamList />
      </div>
    </div>
  );
};

export default App;