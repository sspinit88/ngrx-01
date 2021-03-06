import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const
  initialState = {
    ingredients: [
      new Ingredient('Apples', 15),
      new Ingredient('Tomatoes', 10),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
  };

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions) {

  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
//// todo нельзя редактировать существующее или предыдущее состояние. Возвращаем новый объект
      return {
        ...state, // копируем все старые состояния (добавляем к новому объекту)
        ingredients: [
          ...state.ingredients,
          action.payload,
        ]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state, //// сохраняю старое состояние
        ingredients: [
          ...state.ingredients, //// сохраняю все старые ингредиенты
          ...action.payload, //// сохраняю новые ингредиенты
        ]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      //// берем ингредиент по переданному индексу
      const
        ingredient = state.ingredients[state.editedIngredientIndex];
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
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1,
      };
    default:
      return state;
  }
}


