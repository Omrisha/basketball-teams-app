export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    position: string;
  }
  
  export interface Team {
    id: number;
    name: string;
    players: Player[];
    logoUrl: string;
  }