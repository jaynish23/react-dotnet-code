import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { DataGridComponent } from './components/data-grid/data-grid.component';

@Component({
  selector: 'app-root-main',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, DataGridComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  entity: string = 'Products';

  setEntity(entity: string) {
    this.entity = entity;
  }
}
