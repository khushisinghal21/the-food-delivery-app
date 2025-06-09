import React, { useReducer, useEffect, useCallback, useContext } from 'react';

const cartContext = React.createContext();

// Cart reducer to handle cart state actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { item, quantity } = action.payload;
      const existingItem = state.find(i => i.id === item.id);
      if (existingItem) {
        return state.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...state, { ...item, quantity }];
    }
    case 'REMOVE_ITEM': {
      return state.filter(i => i.id !== action.payload.id);
    }
    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter(i => i.id !== itemId);
      }
      return state.map(i =>
        i.id === itemId ? { ...i, quantity } : i
      );
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
};

// Initialize cart with empty array (removed localStorage dependency)
const initializer = () => {
  return [];
};

export const CardProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializer);

  // Calculate total price and item count
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const formatTotalItems = num => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num;
  };

  // Action dispatchers
  const addToCart = useCallback((item, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { item, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  return (
    <cartContext.Provider value={{
      cartItems: cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      totalItems: formatTotalItems(totalItems),
      rawTotalItems: totalItems, // Added raw total for cases where you need the actual number
    }}>
      {children}
    </cartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error('useCart must be used within a CardProvider');
  }
  return context;
};