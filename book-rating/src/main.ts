import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));



//////////


export class Customer {
  /*private id: number;

  constructor(id: number) {
    this.id = id;
  }*/

  constructor(private id: number) {}

  fooBar(arg: string): boolean {


    setTimeout(() => {
      console.log('Die ID ist', this.id);
    }, 2000);

    return true;
  }
}


const myCustomer = new Customer(5);
myCustomer.fooBar('dfgdfg');



const foo = function (arg: number) {
  return arg + 1;
}


const foo2 = (arg: number) => arg + 1;
