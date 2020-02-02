import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaperRoutingModule } from './paper-routing.module';
import { PaperComponent } from './paper.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [PaperComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaperRoutingModule
  ]
})
export class PaperModule { }
