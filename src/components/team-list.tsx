import React, { useState, useEffect, useCallback } from 'react';
import { Team } from '../types';
import TeamCard from './team-card';
import { motion } from 'framer-motion';
import axios from 'axios';

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<Record<number, boolean>>({});

  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:5001/basketball/teams');
      setTeams(response.data);
      setError(null);
    } catch (err) {
      setError('An error occurred while fetching the teams.');
      console.error('Error fetching teams:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  const toggleTeam = (teamId: number) => {
    setExpandedTeams(prev => ({
      ...prev,
      [teamId]: !prev[teamId]
    }));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {teams.map(team => (
        <div key={team.id} className="mb-4 border rounded-lg overflow-hidden">
          <div 
            className="bg-blue-500 text-white p-3 cursor-pointer flex justify-between items-center"
            onClick={() => toggleTeam(team.id)}
          >
          <img src={team.logoUrl} alt={`${team.name} logo`} className="w-10 h-10 mr-2" />
            <h2 className="text-xl font-semibold">{team.name}</h2>
            <span>{expandedTeams[team.id] ? '▼' : '▶'}</span>
          </div>
          {expandedTeams[team.id] && (
            <ul className="p-3 bg-white">
              {team.players.map(player => (
                <li key={player.id} className="mb-2">
                  <span className="font-semibold">{player.lastName}, {player.firstName}</span>
                  <span className="ml-2 text-gray-600">- {player.position}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </motion.div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
  </div>
);

export default TeamList;