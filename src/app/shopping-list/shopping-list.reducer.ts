import { Action } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.actions';

const
  initialState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ]
  };

export function shoppingListReducer(state = initialState, action: Action) {

  switch (action.type) {
    case ADD_INGREDIENT:
      //// todo нкльзя редактировать существующее или предыдущее состояние. Возвращаем новый объект
      return {
        ...state, // копируем все старые состояния (добавляем к новому объекту)
        ingredients: [
          ...state.ingredients,
          action,
        ]
      };

  }
}
