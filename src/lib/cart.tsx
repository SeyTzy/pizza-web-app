import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getMenuItem, type MenuItem } from "@/lib/menu-data";

export type CartLine = {
  item: MenuItem;
  qty: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "harvest-pizza-cart";

function loadStoredQtyMap(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const qtyMap: Record<string, number> = {};
    for (const [id, qty] of Object.entries(parsed)) {
      if (typeof qty === "number" && qty > 0 && getMenuItem(id)) {
        qtyMap[id] = Math.floor(qty);
      }
    }
    return qtyMap;
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [qtyMap, setQtyMap] = useState<Record<string, number>>(loadStoredQtyMap);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(qtyMap));
    } catch {
      // storage unavailable (private mode etc.) — cart stays in memory
    }
  }, [qtyMap]);

  const addItem = useCallback((id: string, qty = 1) => {
    setQtyMap((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + qty }));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setQtyMap((prev) => {
      const next = { ...prev };
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setQtyMap((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setQtyMap({});
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = Object.entries(qtyMap)
      .map(([id, qty]) => {
        const item = getMenuItem(id);
        return item ? { item, qty } : null;
      })
      .filter((line): line is CartLine => line !== null);

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.qty, 0),
      subtotal: lines.reduce((sum, line) => sum + line.qty * line.item.price, 0),
      addItem,
      setQty,
      removeItem,
      clearCart,
    };
  }, [qtyMap, addItem, setQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
