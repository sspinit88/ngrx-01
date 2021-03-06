import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

import { Ingredient } from '../shared/ingredient.model';
import { LoggingService } from '../logging.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Observable<{ ingredients: Ingredient[] }>;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    //// todo shoppingList - соответствует полю в StoreModule.forRoot({...
    // private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>,
    private store: Store<fromApp.AppState>,
  ) {
  }

  ngOnInit() {
    //// todo получение данных
    this.ingredients = this.store.select('shoppingList');
    // this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
