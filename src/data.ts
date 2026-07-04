import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  // South Indian
  {
    id: "si-1",
    name: "Classic Masala Dosa",
    description: "Crispy rice crepes stuffed with spiced mashed potatoes, served with fresh coconut chutney and hot sambar.",
    price: 14.99,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    isVegetarian: true,
    isVegan: false,
    prepTime: "15-20 mins"
  },
  {
    id: "si-2",
    name: "Steamed Ghee Idli (3 Pcs)",
    description: "Soft, fluffy steamed rice cakes drizzled with pure ghee, served with gun powder podi, chutney, and flavorful sambar.",
    price: 11.99,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: false,
    prepTime: "10-15 mins"
  },
  {
    id: "si-3",
    name: "Medu Vada (3 Pcs)",
    description: "Crisp, golden-brown lentil donuts seasoned with pepper and curry leaves, served with rich sambar and coconut chutney.",
    price: 10.99,
    category: "South Indian",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    isVegetarian: true,
    isVegan: true,
    prepTime: "15 mins"
  },

  // North Indian
  {
    id: "ni-1",
    name: "Mughlai Butter Chicken",
    description: "Tender boneless chicken roasted in a tandoor and simmered in a velvety tomato, butter, and cashew cream gravy.",
    price: 18.99,
    category: "North Indian",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    isVegetarian: false,
    isVegan: false,
    prepTime: "20-25 mins"
  },
  {
    id: "ni-2",
    name: "Paneer Butter Masala",
    description: "Fresh cottage cheese cubes cooked in a rich, mildly spiced tomato cashew nut gravy with cream and fenugreek leaves.",
    price: 16.99,
    category: "North Indian",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: false,
    prepTime: "15-20 mins"
  },

  // Biryani
  {
    id: "by-1",
    name: "Hyderabadi Chicken Biryani",
    description: "Fragrant long-grain basmati rice layered with juicy marinated chicken, fresh mint, saffron, and fried onions, slow-cooked in handi.",
    price: 19.99,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80",
    rating: 5.0,
    isVegetarian: false,
    isVegan: false,
    prepTime: "25-30 mins"
  },
  {
    id: "by-2",
    name: "Royal Paneer Biryani",
    description: "A rich basmati rice preparation cooked with spiced paneer, fresh vegetables, aromatic spices, served with raita.",
    price: 17.99,
    category: "Biryani",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    isVegetarian: true,
    isVegan: false,
    prepTime: "20-25 mins"
  },

  // Vegetarian Specials
  {
    id: "vs-1",
    name: "Dal Makhani & Butter Naan",
    description: "Slow-cooked black lentils simmered overnight with cream, butter, and tomatoes. Served with 2 pieces of tandoori butter naan.",
    price: 15.99,
    category: "Vegetarian Specials",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: false,
    prepTime: "20 mins"
  },

  // Vegan Options
  {
    id: "vg-1",
    name: "Alloo Gobi Matar (Vegan)",
    description: "A homestyle preparation of fresh cauliflower, potatoes, and green peas sautéed with ginger, garlic, tomatoes, and dry spices.",
    price: 14.99,
    category: "Vegan Options",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
    rating: 4.6,
    isVegetarian: true,
    isVegan: true,
    prepTime: "15 mins"
  },
  {
    id: "vg-2",
    name: "Chana Masala (Vegan)",
    description: "Plump chickpeas simmered in a tangy onion-tomato masala spiced with roasted cumin, ginger, and green chilies.",
    price: 13.99,
    category: "Vegan Options",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80",
    rating: 4.7,
    isVegetarian: true,
    isVegan: true,
    prepTime: "15 mins"
  },

  // Snacks
  {
    id: "sn-1",
    name: "Crispy Vegetable Samosas (3 Pcs)",
    description: "Flaky pastry crust stuffed with spiced potatoes and peas, served with sweet tamarind and spicy mint chutneys.",
    price: 7.99,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: true,
    prepTime: "10 mins"
  },
  {
    id: "sn-2",
    name: "Gobi Manchurian",
    description: "Crispy cauliflower florets tossed in a sweet, sour, and slightly spicy Indo-Chinese manchurian sauce.",
    price: 12.99,
    category: "Snacks",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=600&auto=format&fit=crop&q=80", // using consistent high quality Unsplash Indian snacks
    rating: 4.7,
    isVegetarian: true,
    isVegan: true,
    prepTime: "15 mins"
  },

  // Desserts
  {
    id: "de-1",
    name: "Warm Gulab Jamun (3 Pcs)",
    description: "Soft milk-solid dumplings fried golden-brown and steeped in cardamon and rosewater flavored sugar syrup.",
    price: 6.99,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1626202378262-f8319696effc?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    isVegetarian: true,
    isVegan: false,
    prepTime: "5 mins"
  },
  {
    id: "de-2",
    name: "Mango Kulfi",
    description: "Traditional Indian slow-reduced milk ice cream flavored with sweet Alphonso mangoes and chopped pistachios.",
    price: 7.49,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: false,
    prepTime: "5 mins"
  },

  // Beverages
  {
    id: "bv-1",
    name: "Mango Lassi",
    description: "Creamy yogurt drink blended with sweet Alphonso mango pulp, a touch of sugar, and ground cardamom.",
    price: 5.49,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=600&auto=format&fit=crop&q=80",
    rating: 4.9,
    isVegetarian: true,
    isVegan: false,
    prepTime: "5 mins"
  },
  {
    id: "bv-2",
    name: "Masala Chai",
    description: "Brewed black tea infused with ginger, cardamom, cinnamon, and cloves, sweetened with milk.",
    price: 3.99,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80",
    rating: 4.8,
    isVegetarian: true,
    isVegan: false,
    prepTime: "5 mins"
  }
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Aman Preet Singh",
    location: "Surrey, BC",
    rating: 5,
    text: "The Chicken Biryani was absolutely top tier! Extremely fragrant basmati rice, perfectly spiced, and the delivery was incredibly fast. Will definitely order from Dakshin Foods regularly!",
    date: "July 2, 2026"
  },
  {
    id: "t-2",
    name: "Sarah Jenkins",
    location: "Vancouver, BC",
    rating: 5,
    text: "Excellent vegan options! The Chana Masala and Gobi Manchurian are packed with authentic spices. The online checkout is so simple, and the packaging was leak-proof and neat.",
    date: "June 28, 2026"
  },
  {
    id: "t-3",
    name: "Karthik Raghavan",
    location: "Burnaby, BC",
    rating: 4,
    text: "Authentic South Indian flavor that is hard to find in BC! The Masala Dosa was still crisp when it arrived, and the coconut chutney was super fresh. Solid 5/5.",
    date: "June 15, 2026"
  }
];

export const DELIVERY_AREAS = [
  { city: "Metro Vancouver", region: "Vancouver, Burnaby, Richmond, Surrey, Coquitlam, New Westminster", fee: 3.99, minOrder: 15.00 },
  { city: "Fraser Valley", region: "Abbotsford, Langley, Chilliwack, Mission", fee: 5.99, minOrder: 25.00 },
  { city: "Capital Region", region: "Victoria, Saanich, Esquimalt, Langford", fee: 4.99, minOrder: 20.00 },
  { city: "Okanagan", region: "Kelowna, West Kelowna, Peachland", fee: 5.99, minOrder: 25.00 },
  { city: "Vancouver Island North", region: "Nanaimo, Parksville, Campbell River", fee: 6.99, minOrder: 30.00 }
];

export const FAQS = [
  {
    question: "What are your delivery hours in British Columbia?",
    answer: "We deliver 7 days a week from 11:00 AM to 10:30 PM. Orders can be scheduled in advance."
  },
  {
    question: "Is there a minimum order requirement for delivery?",
    answer: "Yes, the minimum order ranges from $15.00 to $30.00 depending on your delivery zone. Check our Delivery Areas list for details."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), Apple Pay, and Google Pay through our secure online checkout."
  },
  {
    question: "Can I track my delivery in real-time?",
    answer: "Yes! Once your order is placed, you will be redirected to our Live Order Tracker page where you can see the preparation and driver route details."
  },
  {
    question: "Do you offer contactless delivery?",
    answer: "Absolutely! You can select 'Leave at my door' during checkout and add specific drop-off instructions for the delivery rider."
  },
  {
    question: "What is your refund policy if there is an issue?",
    answer: "If you receive an incorrect or damaged item, please contact our support team at +1 (778) 288-8261 or email Dakshinfoodscanada@gmail.com with your order number. We will issue a refund or a replacement immediately."
  }
];

export const COUPONS: { [code: string]: number } = {
  "DAKSHIN10": 0.10, // 10% discount
  "WELCOMEBC": 5.00,  // $5 off
  "BCEATS": 0.15      // 15% discount
};
