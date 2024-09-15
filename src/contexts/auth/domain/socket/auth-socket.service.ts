import { Observable } from 'rxjs';

export abstract class AuthSocketService {
  abstract login(token: string): void;
}
