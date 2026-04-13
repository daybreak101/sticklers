export type Availability = {
    startTime: string;
    endTime: string;
}

export type Category = {
    id: string;
    name: string;
    description: string;
    image?: string;
    availability?: Availability;
    items: Item[];
    order: number;
}

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
}