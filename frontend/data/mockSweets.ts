export interface Sweet {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

import chocolateBarfiImg from "../../images/chocolate-burfi-recipe.jpg";
import gulabJamunImg from "../../images/gulab-jamun.webp";
import jalebiImg from "../../images/jelebi.jpeg";
import kajuKatliImg from "../../images/Kaju_katli_sweet.jpg";
import rasmalaiImg from "../../images/rasmalai-recipe-1.jpg";
import sandeshImg from "../../images/Sandesh.avif";
import rasgullaImg from "../../images/Rasgulla.jpg";

// No dedicated Laddu image in repo snapshot; reusing jalebi as placeholder
import ladduImg from "../../images/jelebi.jpeg";

export const mockSweets: Sweet[] = [
  {
    id: "1",
    name: "Chocolate Barfi",
    category: "modern",
    price: 18.99,
    quantity: 20,
    description: "Contemporary twist on traditional barfi with rich chocolate",
    image: chocolateBarfiImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Gulab Jamun",
    category: "traditional",
    price: 12.99,
    quantity: 25,
    description: "Soft, spongy dumplings soaked in fragrant rose-flavored syrup",
    image: gulabJamunImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Jalebi",
    category: "traditional",
    price: 8.99,
    quantity: 40,
    description: "Crispy, spiral-shaped sweets soaked in saffron syrup",
    image: jalebiImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Kaju Katli",
    category: "premium",
    price: 24.99,
    quantity: 15,
    description: "Diamond-shaped cashew fudge with silver leaf",
    image: kajuKatliImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Laddu",
    category: "traditional",
    price: 14.99,
    quantity: 35,
    description: "Round, golden sweets made with gram flour and ghee",
    image: ladduImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "Rasmalai",
    category: "premium",
    price: 16.99,
    quantity: 22,
    description: "Creamy cottage cheese patties in cardamom-scented milk",
    image: rasmalaiImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "7",
    name: "Sandesh",
    category: "traditional",
    price: 13.99,
    quantity: 28,
    description: "Bengali cottage cheese sweet with delicate flavor",
    image: sandeshImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "8",
    name: "Rasgulla",
    category: "traditional",
    price: 10.99,
    quantity: 30,
    description: "Light, airy cottage cheese balls in sweet syrup",
    image: rasgullaImg,
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];