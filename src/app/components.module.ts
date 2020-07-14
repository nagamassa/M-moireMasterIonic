import {NgModule} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AnywhereComponent } from './anywhere/anywhere.component';


@NgModule({
    declarations:[AnywhereComponent],
    imports:[IonicModule],
    exports:[AnywhereComponent]
})

export class ComponentsModule{}