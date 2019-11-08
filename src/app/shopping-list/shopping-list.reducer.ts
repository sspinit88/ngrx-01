import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

const
  initialState = {
    ingredients: [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredient: -1,
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
        ingredients: [
          ...state.ingredients,
          ...action.payload,
        ]
      };
    case ShoppingListActions.UpdateIngredient:
      //// берем ингредиент по переданному индексу
      const
        ingredient = state.ingredients[action.payload];
      const
        updatedIngredient = {
          //// копирую старые ингредиенты
          ...ingredient,
          //// записываем то, что нужно изменить
          ...action.payload.ingredient,
        };
      //// получаем новый массив
      const
        updatedIngredients = [
          ...state.ingredients,
        ];
      //// меняем позицию по указанному индексу
      updatedIngredients[action.payload.index] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case ShoppingListActions.DeleteIngredient:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex != action.payload;
        }),
      };
    default:
      return state;
  }
}


