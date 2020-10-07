import { Component, OnInit, ViewChild } from '@angular/core';
import IDistrict from 'src/app/shared/models/IDistrict';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DistrictService } from 'src/app/services/district.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-districts',
  templateUrl: './districts.component.html',
  styleUrls: ['./districts.component.css'],
})
export class DistrictsComponent implements OnInit {
  constructor(
    private districtService: DistrictService,
    private actRoute: ActivatedRoute
  ) {}
  districts: IDistrict[];
  dataSource: MatTableDataSource<IDistrict>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'district',
    'active',
    'confirmed',
    'recovered',
    'deceased',
  ];

  ngOnInit(): void {
    this.districtService.getDistrict().subscribe((data) => {
      this.districts = data.find(
        (row: any) => row.statecode == this.actRoute.snapshot.params.id
      );
      if (this.districts != undefined) {
        this.districts = data.find(
          (row: any) => row.statecode == this.actRoute.snapshot.params.id
        ).districtData;
        this.dataSource = new MatTableDataSource<IDistrict>(this.districts);
        this.dataSource.paginator = this.paginator;
      }
    });
  }
}
