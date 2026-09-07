import margherita from "@/assets/pizza/margherita.jpg";
import pepperoni from "@/assets/pizza/pepperoni.jpg";
import mushroom from "@/assets/pizza/mushroom.jpg";
import vegetarian from "@/assets/pizza/vegetarian.jpg";
import heroPizza from "@/assets/pizza/hero.jpg";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: string[];
};

export const pizzas: MenuItem[] = [
  {
    id: "pizza-margherita",
    name: "ម៉ាហ្ការីតា (Margherita)",
    description: "ប៉េងប៉ោះ San Marzano, ឈីស mozzarella ស្រស់, ស្លឹកជីរអង្កាម (basil), ប្រេងអូលីវ.",
    price: 16,
    image: margherita,
    tags: ["បួស"],
  },
  {
    id: "pizza-pepperoni",
    name: "ប៉េប៉េរ៉ូនី (Pepperoni)",
    description: "សាច់ក្រកប៉េប៉េរ៉ូនីហឹរ, ឈីស mozzarella, ប៉េងប៉ោះ San Marzano, អូរីហ្គាណូ, ម្ទេស.",
    price: 19,
    image: pepperoni,
    tags: ["ហឹរ"],
  },
  {
    id: "pizza-truffle-mushroom",
    name: "ផ្សិតត្រាហ្វល (Truffle Mushroom)",
    description: "ផ្សិតព្រៃ, ប្រេងត្រាហ្វល, ឈីស mozzarella, ថែម (thyme), ឈីស pecorino, ខ្ទឹមសអាំង.",
    price: 22,
    image: mushroom,
    tags: ["បួស"],
  },
  {
    id: "pizza-garden-veggie",
    name: "បន្លែសួន (Garden Veggie)",
    description: "ម្ទេសប្លោកក្រហមអាំង, ហ្ស៊ូគីនី, ប៉េងប៉ោះ cherry, អូលីវ, ស្លឹក arugula, ឈីស mozzarella.",
    price: 20,
    image: vegetarian,
    tags: ["បួស", "ជម្រើសវីហ្គែន (Vegan)"],
  },
  {
    id: "pizza-harvest-special",
    name: "ភីហ្សាពិសេស Harvest",
    description: "គ្រឿងផ្សំតាមរដូវកាលពីកសិដ្ឋានក្នុងស្រុក។ សូមសួរអ្នកបម្រើសម្រាប់ជម្រើសប្រចាំសប្តាហ៍នេះ។",
    price: 23,
    image: heroPizza,
    tags: ["តាមរដូវកាល"],
  },
];

export const extras: MenuItem[] = [
  {
    id: "extra-garlic-knots",
    name: "នំប៉័ងខ្ទឹម (Garlic Knots)",
    description: "នំប៉័ងខ្ទឹមធ្វើដោយផ្ទាល់ជាមួយប័រខ្ទឹមសអាំង និងឈីស parmesan",
    price: 8,
  },
  {
    id: "extra-caesar-salad",
    name: "សាឡាដស៊ីសា (Caesar Salad)",
    description: "សាឡាដ Little gem, ឈីស parmesan, នំប៉័ងក្រៀម sourdough, ទឹកសាឡាដ Caesar",
    price: 12,
  },
  {
    id: "extra-arancini",
    name: "Arancini (បាយបំពង)",
    description: "បាយរីសូតូ (risotto) បំពងស្រួយ, ស្នូលឈីស mozzarella, ទឹកជ្រលក់ marinara",
    price: 10,
  },
  {
    id: "extra-tiramisu",
    name: "ធីរ៉ាមីស៊ូ (Tiramisu)",
    description: "នំ ladyfingers ជ្រលក់កាហ្វេអេសប្រេសសូ, ឈីស mascarpone, ម្សៅកាកាវ",
    price: 9,
  },
];

export const featuredPizzaIds = [
  "pizza-margherita",
  "pizza-pepperoni",
  "pizza-truffle-mushroom",
  "pizza-garden-veggie",
];

export const menuItems = [...pizzas, ...extras];

export function getMenuItem(id: string): MenuItem | undefined {
  return menuItems.find((item) => item.id === id);
}

export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2).replace(/\.00$/, "")}`;
}
