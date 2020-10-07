import { Injectable } from '@angular/core';
import IDistrict from '../shared/models/IDistrict';
import { ApiService } from '../shared/services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  district : IDistrict;
  constructor(private apiService: ApiService) { }

  getDistrict() {
    return this.apiService.get('/v2/state_district_wise.json').pipe(
      map((data) => {     
        return data;
      })
    );
  }
}
