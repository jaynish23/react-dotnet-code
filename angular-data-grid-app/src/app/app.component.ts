// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div class="app">
//       <h1>Large Scale App</h1>
//       <div>
//         <button mat-button (click)="setEntity('Products')">Products</button>
//         <button mat-button (click)="setEntity('Orders')">Orders</button>
//         <button mat-button (click)="setEntity('Customers')">Customers</button>
//         <button mat-button (click)="setEntity('Inventory')">Inventory</button>
//         <button mat-button (click)="setEntity('Suppliers')">Suppliers</button>
//       </div>
//       <app-data-grid [entity]="entity"></app-data-grid>
//     </div>
//   `,
//   styles: [`
//     .app {
//       padding: 20px;
//     }
//     button {
//       margin-right: 10px;
//     }
//   `]
// })
// export class AppComponent {
//   entity = 'Products';

//   setEntity(entity: string) {
//     this.entity = entity;
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-data-grid [entity]="entity"></app-data-grid>
  `
})
export class AppComponent {
  entity = 'Products';
}