export type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type IngredientWithId = {
  uniqueId: string;
} & Ingredient;

export type User = {
  email: string;
  name: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type UpdateUserData = {
  name: string;
  email: string;
  password?: string;
};

export type OrderResponse = {
  order: {
    number: number;
  };
  name: string;
};

export type IngredientsResponse = {
  data: Ingredient[];
};

export type BurgerConstructorState = {
  bun: IngredientWithId | null;
  ingredients: IngredientWithId[];
};

export type IngredientsState = {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

export type OrderState = {
  orderNumber: number | null;
  orderName: string | null;
  isLoading: boolean;
  error: string | null;
};

export type SelectedIngredientState = {
  selectedIngredient: Ingredient | null;
};

export type AddIngredientPayload = {
  ingredient: Ingredient;
  uniqueId: string;
};

export type MoveIngredientPayload = {
  dragIndex: number;
  hoverIndex: number;
};

export type DragItem = {
  uniqueId: string;
  index: number;
};

export type BurgerIngredientsCardProps = {
  ingredient: Ingredient;
};

export type BurgerConstructorCardProps = {
  ingredient: IngredientWithId;
  top?: boolean;
  bottom?: boolean;
  index: number;
};

export type RootState = {
  ingredients: IngredientsState;
  selectedIngredients: SelectedIngredientState;
  burgerConstructor: BurgerConstructorState;
  order: OrderState;
  auth: AuthState;
  feed: FeedState;
  profileFeed: FeedState;
};

export type Order = {
  _id: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  status: 'done' | 'pending' | 'created';
  name: string;
  ingredients: string[];
};

export type FeedState = {
  orders: Order[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
};
