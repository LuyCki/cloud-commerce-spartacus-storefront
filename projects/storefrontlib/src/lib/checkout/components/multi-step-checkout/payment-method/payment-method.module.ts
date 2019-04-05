import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PaymentFormModule } from './payment-form/payment-form.module';
import { CardModule } from '../../../../ui/components/card/card.module';
import { PaymentMethodComponent } from './payment-method.component';
import { SpinnerModule } from './../../../../ui/components/spinner/spinner.module';
import { UserService, ConfigModule, CmsConfig } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentFormModule,
    CardModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        MultistepCheckoutPaymentDetails: {
          selector: 'cx-payment-method',
        },
      },
    }),
  ],
  providers: [UserService],
  declarations: [PaymentMethodComponent],
  entryComponents: [PaymentMethodComponent],
  exports: [PaymentMethodComponent],
})
export class PaymentMethodModule {}
