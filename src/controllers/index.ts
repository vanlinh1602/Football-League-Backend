import { UsersService } from 'services/user';

export default (): {} => {
  const leaguesManagerDB = Databases.Leagues_Management.db('leaguesManager');

  global.Services = {
    users: new UsersService(leaguesManagerDB),
  };

  return {};
};
