import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

interface CartState {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, actions: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === actions.payload.id);
      if (existingItem) {
        existingItem.quantity += actions.payload.quantity
      } else {
        state.items.push(actions.payload)
      }
    },
    removeItem: (state, actions: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== actions.payload);
    },
    clearCart: state => {
      state.items = [];
    }

  },
});

export const { addToCart, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
