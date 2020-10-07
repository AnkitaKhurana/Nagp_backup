import { Component, OnInit, ViewChild } from '@angular/core';
import IState from 'src/app/shared/models/IState';
import { StatesService } from 'src/app/services/states.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css'],
})
export class StatesComponent implements OnInit {
  constructor(private stateService: StatesService) {}
  states: IState[];
  dataSource: MatTableDataSource<IState>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = [
    'state',
    'active',
    'confirmed',
    'recovered',
    'deaths',
  ];

  ngOnInit(): void {
    this.stateService.getStates().subscribe((data) => {
      this.states = data.statewise;
      this.states  = this.states.filter(row=>{return row.state!='Total'});
      this.dataSource = new MatTableDataSource<IState>(this.states);
      this.dataSource.paginator = this.paginator;
    });
  }
}
