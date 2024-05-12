
import { create } from 'zustand';

function addItem(set, item) {
    function doAddItem(state) {
        // Manual quantity is empty
        if (state.selectedQuantity === 0) {
            return {
                ...state,
                selectedQuantity: 0,
                items: (state.items || []).concat(item),
            };
        }

        // Manual quantity is fractional so it's a price
        if (state.selectedQuantity !== Math.round(state.selectedQuantity)) {
            return { ...state };
        }

        // Manual quantity is an integer, so it's an item multiplier
        return {
            ...state,
            selectedQuantity: 0,
            items: (state.items || []).concat(Array(state.selectedQuantity).fill(item)),
        };
    }

    return () => set(doAddItem);
}

function addAmount(set, amount) {
    const item = {category: "custom", name: "manual", price: amount};

    function doAddAmount(state) {
        return {
            ...state,
            items: (state.items || []).concat(item),
            selectedQuantity: 0,
        }
    }

    return () => set(doAddAmount);
}

const useStore = create((set) => ({
  items: [],
  addItem: (category, item) => addItem(set, category, item),
  addAmount: (amount) => addAmount(set, amount),

  selectedQuantity: 0,
  setSelectedQuantity: (n) => set({ selectedQuantity: n }),
}));

export { useStore };