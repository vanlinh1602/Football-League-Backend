import { LeaguesService } from 'services/leagues';
import { PlayersService } from 'services/players';
import { TeamsService } from 'services/teams';
import { UsersService } from 'services/user';

export default (): {} => {
  const leaguesManagerDB = Databases.Leagues_Management.db('Leagues_Management');

  global.Services = {
    users: new UsersService(leaguesManagerDB),
    teams: new TeamsService(leaguesManagerDB),
    players: new PlayersService(leaguesManagerDB),
    leagues: new LeaguesService(leaguesManagerDB),
  };

  return {};
};
