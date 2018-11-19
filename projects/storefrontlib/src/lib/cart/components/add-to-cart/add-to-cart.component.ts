import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';

import { CartService } from '../../facade/cart.service';

import { AddedToCartDialogComponent } from './added-to-cart-dialog/added-to-cart-dialog.component';

@Component({
  selector: 'cx-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddToCartComponent implements OnInit {
  modalInstance;

  @Input()
  iconOnly;

  @Input()
  productCode;
  @Input()
  quantity = 1;

  cartEntry$: Observable<any>;
  loaded$: Observable<boolean>;

  constructor(
    protected cartService: CartService,
    private modalService: NgbModal
  ) {}

  // TODO:#153 - test
  ngOnInit() {
    if (this.productCode) {
      this.loaded$ = this.cartService.getLoaded();
      this.cartEntry$ = this.cartService.getEntry(this.productCode);
    }
  }

  addToCart() {
    if (!this.productCode || this.quantity <= 0) {
      return;
    }
    this.openModal();
    this.cartService.addCartEntry(this.productCode, this.quantity);
  }

  // TODO:#153 test?
  private openModal() {
    this.modalInstance = this.modalService.open(AddedToCartDialogComponent, {
      centered: true,
      size: 'lg'
    }).componentInstance;
    this.modalInstance.entry$ = this.cartEntry$;
    this.modalInstance.entry$ = this.cartService.activeCart$;
    this.modalInstance.loaded$ = this.loaded$;
    this.modalInstance.quantity = this.quantity;
  }
}
