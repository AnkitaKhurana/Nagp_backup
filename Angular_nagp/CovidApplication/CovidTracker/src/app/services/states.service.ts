import { Injectable } from '@angular/core';
import IState from '../shared/models/IState';
import { ApiService } from '../shared/services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StatesService {
  state: IState;
  displayedColumns: string[] = ['name'];

  constructor(private apiService: ApiService) {}

  getStates() {
    return this.apiService.get('/data.json').pipe(
      map((data) => {     
        return data;
      })
    );
  }
}
