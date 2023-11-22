import { Request } from 'express';
import { Collection, Db } from 'mongodb';

export const checkRoles = (requiredRole: string, req: Request, unitID?: string): string[] => {
  let roles: string[] = [];
  const { email, xbot, units, activeUnit: activeUnitID } = req?.session?.user ?? {};

  if (email) {
    if (xbot?.roles?.service !== undefined || xbot?.roles?.admin !== undefined)
      roles = ['xbotService', 'unitAdmin', 'unitProductAdmin', 'unitProductStaff'];
    else {
      const unit = units.find(({ id }: { id: string }) => id === unitID) ?? {};
      const activeUnit = units.find(({ id }: { id: string }) => id === activeUnitID) ?? {};
      if ((unit.admins ?? []).includes(email)) {
        roles = ['unitAdmin', 'unitProductAdmin', 'unitProductStaff'];
      } else if ((unit.products?.[ProductID]?.admins ?? []).includes(email)) {
        roles = ['unitProductAdmin', 'unitProductStaff'];
      } else if (
        (unit.products?.[ProductID]?.staffs ?? []).includes(email) ||
        ['sgd', 'pgd'].includes(activeUnit?.type)
      ) {
        roles = ['unitProductStaff'];
      }
    }
  }
  if (!roles.includes(requiredRole)) {
    throw new Error(`Insufficiennt permission! Expected role: ${requiredRole}`);
  }
  return roles;
};

export default class Service<Type> {
  db: Db;

  // @ts-ignore
  collection: Collection<Type>;

  constructor(db: Db, collectionName: string) {
    this.db = db;
    // @ts-ignore
    this.collection = this.db.collection<Type>(collectionName);
  }
}
