export type Availability = {
  startTime: string;
  endTime: string;
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
  basePrice: number;
  modifierGroupIds?: string[];
  defaults?: any;
  order: number;
  status: "available" | "sold-out" | "hidden";
  image?: string;
};

export type ModifierGroupId =
  | "bread"
  | "size"
  | "protein"
  | "cheese"
  | "extras"
  | "greens"
  | "salad_toppings"
  | "salad_protein"
  | "dressing";

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
  priceType?: "add" | "override";
  options: ModifierOption[];
};

export type Effect = {
  groupId: ModifierGroupId;
  allowedOptions?: string[]
  forceOption?: string;
}