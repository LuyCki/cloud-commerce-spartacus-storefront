import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService, OccEndpointsService, Order, Cart } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-aplied-coupons',
  templateUrl: './aplied-coupons.component.html',
  styleUrls: ['./aplied-coupons.component.css'],
})
export class ApliedCouponsComponent implements OnInit {
  userId: string;

  @Input()
  readonly = false;
  @Input()
  cart: Cart | Order;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private occEndpoints: OccEndpointsService
  ) {}

  ngOnInit() {
    this.authService
      .getUserToken()
      .pipe(map(token => token.userId))
      .subscribe(userId => {
        this.userId = userId;
        console.log(userId);
      });
  }

  getVouchers(userId: string, cartId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getEndpoint(userId, cartId), { headers });
  }

  removeVoucher(voucherId: string) {
    this.http
      .delete(this.getEndpoint(this.userId, this.cart.code, voucherId))
      .subscribe(() => {});
  }

  getEndpoint(userId: string, cartId: string, voucherId?: string): string {
    const endpoint = voucherId
      ? `/users/${userId}/carts/${cartId}/vouchers/${voucherId}`
      : `/users/${userId}/carts/${cartId}/vouchers`;
    return this.occEndpoints.getEndpoint(endpoint);
  }
}
