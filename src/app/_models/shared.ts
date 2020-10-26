import {NetworkZip} from './networkZip';
import {User} from './user';

export interface Shared {
  id: number;
  networkZip: NetworkZip;
  user: User;
}
