import { TeamsService } from 'services/teams';
import { UsersService } from 'services/user';

export default (): {} => {
  const leaguesManagerDB = Databases.Leagues_Management.db('Leagues_Management');

  global.Services = {
    users: new UsersService(leaguesManagerDB),
    teams: new TeamsService(leaguesManagerDB),
  };

  return {};
};
