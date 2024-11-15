import React, { useState } from 'react';
import { Team } from '../types';
import { AnimatePresence, motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div 
        className="bg-gray-800 text-white p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-2xl font-semibold">{team.name}</h2>
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.ul 
            className="p-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {team.players.map((player) => (
              <li key={player.id} className="mb-2 last:mb-0">
                <span className="font-semibold">{player.lastName}, {player.firstName}</span>
                <span className="text-gray-600 ml-2">- {player.position}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeamCard;