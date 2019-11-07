import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const
  initialState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ]
  };

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.ShoppingListActions) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
//// todo нкльзя редактировать существующее или предыдущее состояние. Возвращаем новый объект
      return {
        ...state, // копируем все старые состояния (добавляем к новому объекту)
        ingredients: [
          ...state.ingredients,
          action.payload,
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingridients: [
          ...state.ingredients,
          ...action.payload,
        ]
      };
    default:
      return state;
  }
}


