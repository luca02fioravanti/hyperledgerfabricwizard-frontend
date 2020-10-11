import {Network} from './fabric/network';
import {User} from './user';

export interface NetworkConfig {
  id: number;
  author: User;
  network: Network;
  timestamp: string;
}
