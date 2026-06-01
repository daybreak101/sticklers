import { Timestamp } from "firebase/firestore";

export type SelectedModifiers = {
    [groupId: string]: string[]
}

export type NonDefaultModifier = {
    option: string;
    price: number;
}

export type NonDefaultModifiers = {
    [groupId: string]: NonDefaultModifier[]
}

export type CartItem = {
    cartItemId: string;
    categoryId: string;
    itemId: string;
    name: string;
    image: string;
    category: string;
    basePrice: number;
    modifierGroupIds?: string[];
    defaults?: any;
    selectedModifiers: SelectedModifiers;
    nonDefaultModifiers: NonDefaultModifiers;
    quantity: number;
    finalPrice: number;
    specialRequests?: string;
}

export type Cart = {
    items: CartItem[];
    totalPrice: number;
    totalItems: number;
}

export type TimeSlot = {
    id: string;
    label: string;
    start: Date;
    end: Date;
}

//NO DELIVERIES!
export type Order = {
    id: string;
    customerInfo: CustomerInfo;
    cart: Cart;
    timeSlot: TimeSlot;
    status: "pending" | "ready" | "fulfilled" | "cancelled";
    createdAt: Timestamp;
    updatedAt: Timestamp;
    specialRequests?: string;
}

export type CustomerInfo = {
    name: string;
    email: string;
    phone: string;
}