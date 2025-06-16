// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// import { AppComponent } from './app.component';
// import { DataGridComponent } from './data-grid/data-grid.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @NgModule({
//   declarations: [
//     AppComponent,
//     DataGridComponent  // Make sure this is included here
//   ],
//   imports: [
//     BrowserModule,
//     HttpClientModule,
//     BrowserAnimationsModule,
//     MatButtonModule,
//     MatTableModule,
//     MatPaginatorModule,
//     MatProgressSpinnerModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataGridComponent } from './data-grid/data-grid.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    DataGridComponent // Must be here
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }