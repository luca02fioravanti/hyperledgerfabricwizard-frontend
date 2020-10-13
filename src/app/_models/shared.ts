import {User} from './user';
import {NetworkZip} from './networkZip';

export interface Shared {
  id: number;
  networkZip: NetworkZip;
  user: User;
}
