export type Availability = {
  startTime: number;
  endTime: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  image?: string;
  availability?: Availability;
  items: Item[];
  order: number;
};

export type Item = {
  itemId: string;
  name: string;
  description: string;
  basePrice?: number;
  modifierGroupIds?: string[];
  defaults?: any;
  order: number;
  status: "available" | "sold-out" | "hidden";
  image?: string;
  pricingRules?: any;
};

//defaults structure???
// TODO: write down the structure

//pricing rules structure
// holds any amount of modifiers.
// {
//   [modifierID]: {
//     extraItemPrice?: number;
//     includedCount?: number;
//     unlimited?: boolean
//   }
// }

export type ModifierGroupId =
  | "bread"
  | "size"
  | "protein"
  | "cheese"
  | "extras"
  | "greens"
  | "salad_toppings"
  | "salad_protein"
  | "dressing"
  | "hot_coffee_size";

type BreadOptionId =
  | "french"
  | "wheat"
  | "gluten_free"
  | "spinach_wrap"
  | "croissant"
  | "flatbread";

export type ModifierOption = {
  id: string;
  name: string;
  price: number;
  status: "available" | "unavailable" | "sold-out";
  effects?: Effect[];
};

export type ModifierGroup = {
  id: ModifierGroupId;
  name: string;
  type: "single" | "multi";
  priceType?: "add" | "override" | "define";
  options: ModifierOption[];
};

export type Effect = {
  groupId: ModifierGroupId;
  allowedOptions?: string[]
  forceOption?: string;
}