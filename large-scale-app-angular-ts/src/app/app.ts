import { Component } from '@angular/core';
import { DataGridComponent } from './components/data-grid/data-grid.component';
import { AppComponent } from './app.component';

@Component({
  selector: 'app-root',
  imports: [AppComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'large-scale-app-angular-ts';
}
