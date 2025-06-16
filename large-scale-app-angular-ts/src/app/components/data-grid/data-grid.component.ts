import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common'; // Added import for NgIf, NgFor, etc.
import { Observable } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { ProductDto } from '../../models/product.model';
import { OrderDto } from '../../models/order.model';
import { CustomerDto } from '../../models/customer.model';
import { InventoryDto } from '../../models/inventory.model';
import { SupplierDto } from '../../models/supplier.model';

interface ColumnDef {
  field: string;
  headerName: string;
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, CommonModule] // Added CommonModule
})
export class DataGridComponent implements OnInit, OnChanges {
  @Input() entity: string = 'Products';
  dataSource = new MatTableDataSource<ProductDto | OrderDto | CustomerDto | InventoryDto | SupplierDto>([]);
  displayedColumns: string[] = [];
  columnDefs: ColumnDef[] = [];
  pageSize = 1000;
  currentPage = 1;
  totalRows = 0;
  minPage = 1;
  maxPage = 1;
  loading = false;
  error: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.setInitialState();
    this.fetchData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['entity']) {
      this.setInitialState();
      this.fetchData();
    }
  }

  setInitialState() {
    this.currentPage = this.entity === 'Products' ? 3 : 1;
    this.error = null;
    this.loading = false;

    switch (this.entity) {
      case 'Products':
        this.minPage = 3;
        this.maxPage = 5;
        this.totalRows = 3000;
        this.columnDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'productName', headerName: 'Product Name' },
          { field: 'category', headerName: 'Category' },
          { field: 'price', headerName: 'Price' },
          { field: 'stock', headerName: 'Stock' },
          { field: 'createdDate', headerName: 'Created Date' },
          { field: 'lastUpdated', headerName: 'Last Updated' },
          { field: 'description', headerName: 'Description' },
          { field: 'discount', headerName: 'Discount' },
          { field: 'supplierId', headerName: 'Supplier ID' },
          { field: 'batchNumber', headerName: 'Batch Number' },
          { field: 'expiryDate', headerName: 'Expiry Date' },
          { field: 'countryOfOrigin', headerName: 'Country of Origin' },
          { field: 'isFeatured', headerName: 'Is Featured' },
          { field: 'maxOrderQuantity', headerName: 'Max Order Quantity' },
          { field: 'leadTimeDays', headerName: 'Lead Time Days' }
        ];
        break;
      case 'Orders':
        this.minPage = 1;
        this.maxPage = 1;
        this.totalRows = 600;
        this.columnDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'orderDate', headerName: 'Order Date' },
          { field: 'customerId', headerName: 'Customer ID' },
          { field: 'totalAmount', headerName: 'Total Amount' },
          { field: 'status', headerName: 'Status' },
          { field: 'shippingAddress', headerName: 'Shipping Address' },
          { field: 'billingAddress', headerName: 'Billing Address' },
          { field: 'paymentMethod', headerName: 'Payment Method' },
          { field: 'orderNumber', headerName: 'Order Number' },
          { field: 'expectedDelivery', headerName: 'Expected Delivery' },
          { field: 'actualDelivery', headerName: 'Actual Delivery' },
          { field: 'isDelivered', headerName: 'Is Delivered' },
          { field: 'taxAmount', headerName: 'Tax Amount' },
          { field: 'discountAmount', headerName: 'Discount Amount' },
          { field: 'shippingCost', headerName: 'Shipping Cost' },
          { field: 'orderNotes', headerName: 'Order Notes' },
          { field: 'createdBy', headerName: 'Created By' },
          { field: 'modifiedBy', headerName: 'Modified By' },
          { field: 'createdDate', headerName: 'Created Date' },
          { field: 'modifiedDate', headerName: 'Modified Date' },
          { field: 'customerEmail', headerName: 'Customer Email' },
          { field: 'customerPhone', headerName: 'Customer Phone' },
          { field: 'orderPriority', headerName: 'Order Priority' },
          { field: 'shippingMethod', headerName: 'Shipping Method' },
          { field: 'trackingNumber', headerName: 'Tracking Number' },
          { field: 'couponCode', headerName: 'Coupon Code' },
          { field: 'isGift', headerName: 'Is Gift' },
          { field: 'giftMessage', headerName: 'Gift Message' },
          { field: 'salesChannel', headerName: 'Sales Channel' },
          { field: 'orderWeight', headerName: 'Order Weight' }
        ];
        break;
      case 'Customers':
        this.minPage = 1;
        this.maxPage = 13;
        this.totalRows = 13000;
        this.columnDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'firstName', headerName: 'First Name' },
          { field: 'lastName', headerName: 'Last Name' },
          { field: 'email', headerName: 'Email' },
          { field: 'phone', headerName: 'Phone' },
          { field: 'addressLine1', headerName: 'Address Line 1' },
          { field: 'addressLine2', headerName: 'Address Line 2' },
          { field: 'city', headerName: 'City' },
          { field: 'state', headerName: 'State' },
          { field: 'zipCode', headerName: 'Zip Code' },
          { field: 'country', headerName: 'Country' },
          { field: 'createdDate', headerName: 'Created Date' },
          { field: 'lastUpdated', headerName: 'Last Updated' },
          { field: 'isActive', headerName: 'Is Active' },
          { field: 'dateOfBirth', headerName: 'Date of Birth' },
          { field: 'gender', headerName: 'Gender' },
          { field: 'occupation', headerName: 'Occupation' },
          { field: 'companyName', headerName: 'Company Name' },
          { field: 'annualIncome', headerName: 'Annual Income' },
          { field: 'customerType', headerName: 'Customer Type' },
          { field: 'loyaltyPoints', headerName: 'Loyalty Points' },
          { field: 'lastPurchaseDate', headerName: 'Last Purchase Date' },
          { field: 'newsletterSubscribed', headerName: 'Newsletter Subscribed' },
          { field: 'preferredContactMethod', headerName: 'Preferred Contact Method' },
          { field: 'accountStatus', headerName: 'Account Status' },
          { field: 'creditLimit', headerName: 'Credit Limit' },
          { field: 'billingAddress', headerName: 'Billing Address' },
          { field: 'shippingAddress', headerName: 'Shipping Address' },
          { field: 'taxId', headerName: 'Tax ID' },
          { field: 'customerSegment', headerName: 'Customer Segment' },
          { field: 'registrationDate', headerName: 'Registration Date' },
          { field: 'lastLoginDate', headerName: 'Last Login Date' },
          { field: 'preferredLanguage', headerName: 'Preferred Language' },
          { field: 'timeZone', headerName: 'Time Zone' },
          { field: 'notes', headerName: 'Notes' },
          { field: 'emergencyContact', headerName: 'Emergency Contact' },
          { field: 'emergencyPhone', headerName: 'Emergency Phone' },
          { field: 'referralSource', headerName: 'Referral Source' },
          { field: 'socialMediaHandle', headerName: 'Social Media Handle' },
          { field: 'website', headerName: 'Website' },
          { field: 'fax', headerName: 'Fax' },
          { field: 'isVerified', headerName: 'Is Verified' },
          { field: 'verificationDate', headerName: 'Verification Date' },
          { field: 'lastContacted', headerName: 'Last Contacted' },
          { field: 'customerRating', headerName: 'Customer Rating' }
        ];
        break;
      case 'Inventory':
        this.minPage = 1;
        this.maxPage = 15;
        this.totalRows = 15000;
        this.columnDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'productId', headerName: 'Product ID' },
          { field: 'warehouseId', headerName: 'Warehouse ID' },
          { field: 'quantity', headerName: 'Quantity' },
          { field: 'lastUpdated', headerName: 'Last Updated' },
          { field: 'stockStatus', headerName: 'Stock Status' },
          { field: 'reorderLevel', headerName: 'Reorder Level' },
          { field: 'damageNotes', headerName: 'Damage Notes' },
          { field: 'lastAuditDate', headerName: 'Last Audit Date' },
          { field: 'auditStatus', headerName: 'Audit Status' },
          { field: 'inventoryType', headerName: 'Inventory Type' }
        ];
        break;
      case 'Suppliers':
        this.minPage = 1;
        this.maxPage = 10;
        this.totalRows = 10000;
        this.columnDefs = [
          { field: 'id', headerName: 'ID' },
          { field: 'companyName', headerName: 'Company Name' },
          { field: 'contactName', headerName: 'Contact Name' },
          { field: 'email', headerName: 'Email' },
          { field: 'phone', headerName: 'Phone' },
          { field: 'addressLine1', headerName: 'Address Line 1' },
          { field: 'addressLine2', headerName: 'Address Line 2' },
          { field: 'city', headerName: 'City' },
          { field: 'state', headerName: 'State' },
          { field: 'zipCode', headerName: 'Zip Code' },
          { field: 'country', headerName: 'Country' },
          { field: 'createdDate', headerName: 'Created Date' },
          { field: 'lastUpdated', headerName: 'Last Updated' },
          { field: 'isActive', headerName: 'Is Active' },
          { field: 'supplierType', headerName: 'Supplier Type' },
          { field: 'leadTimeDays', headerName: 'Lead Time Days' },
          { field: 'minOrderQuantity', headerName: 'Min Order Quantity' },
          { field: 'maxOrderQuantity', headerName: 'Max Order Quantity' },
          { field: 'paymentTerms', headerName: 'Payment Terms' },
          { field: 'taxId', headerName: 'Tax ID' },
          { field: 'website', headerName: 'Website' },
          { field: 'rating', headerName: 'Rating' },
          { field: 'contractStartDate', headerName: 'Contract Start Date' },
          { field: 'contractEndDate', headerName: 'Contract End Date' },
          { field: 'notes', headerName: 'Notes' }
        ];
        break;
    }
    this.displayedColumns = this.columnDefs.map(col => col.field);
  }

  fetchData() {
    this.loading = true;
    this.error = null;

    let observable: Observable<ProductDto[] | OrderDto[] | CustomerDto[] | InventoryDto[] | SupplierDto[]>;
    switch (this.entity) {
      case 'Products':
        observable = this.apiService.getProducts(this.currentPage);
        break;
      case 'Orders':
        observable = this.apiService.getOrders();
        break;
      case 'Customers':
        observable = this.apiService.getCustomers(this.currentPage);
        break;
      case 'Inventory':
        observable = this.apiService.getInventory(this.currentPage);
        break;
      case 'Suppliers':
        observable = this.apiService.getSuppliers(this.currentPage);
        break;
      default:
        this.error = 'Invalid entity';
        this.loading = false;
        return;
    }

    observable.subscribe({
      next: (data: ProductDto[] | OrderDto[] | CustomerDto[] | InventoryDto[] | SupplierDto[]) => {
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = `Failed to fetch ${this.entity}: ${err.message}`;
        this.loading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.fetchData();
  }
}
