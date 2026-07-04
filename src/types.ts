export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "South Indian" | "North Indian" | "Biryani" | "Vegetarian Specials" | "Vegan Options" | "Snacks" | "Desserts" | "Beverages";
  image: string;
  rating: number;
  isVegetarian: boolean;
  isVegan: boolean;
  prepTime: string; // e.g. "20-25 mins"
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface SavedAddress {
  id: string;
  label: string; // e.g. "Home", "Office"
  address: string;
}

export interface CustomerProfile {
  name: string;
  email: string;
  phone: string;
  savedAddresses: SavedAddress[];
  favoriteMeals: string[]; // ids of menu items
}

export interface PastOrder {
  id: string;
  items: {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  date: string;
  total: number;
  status: "Delivered" | "Processing" | "Out for Delivery";
}

export interface OrderDetails {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: "Preparing" | "Out for Delivery" | "Delivered" | "Pending";
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  eta: string;
  timestamp: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  message: string;
}
