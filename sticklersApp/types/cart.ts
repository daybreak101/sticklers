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
}

export type Order = {
    id: string;
    userId: string;
    cart: Cart;
    status: "pending" | "processing" | "delivered" | "cancelled";
    createdAt: Date;
    updatedAt: Date;
    totalPrice: number;
    numOfItems: number;
    specialRequests?: string;
    deliveryAddress?: string;
    deliveryInstructions?: string;

}
