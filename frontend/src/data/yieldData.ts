export interface CropData {
    name: string;
    duration: string;
    interval: string;
    rate: string;
    notes?: string;
    seasons?: {
        early?: string;
        main?: string;
    };
}

export interface CropCategory {
    id: string;
    name: string;
    crops: CropData[];
}

export const YIELD_DATA: CropCategory[] = [
    {
        id: "cash-crops",
        name: "Cash Crops",
        crops: [
            {
                name: "Coffee",
                duration: "10 Months",
                interval: "14 Days",
                rate: "5.5KG/ACRE/YEAR",
                seasons: {
                    early: "December",
                    main: "July"
                }
            },
            {
                name: "Tea",
                duration: "Continuous",
                interval: "Monthly",
                rate: "1KG/ACRE",
                notes: "Based on general recommendations"
            }
        ]
    },
    {
        id: "vegetables",
        name: "Vegetables",
        crops: [
            {
                name: "Kales/Spinach & Leafy Veg",
                duration: "3 Months",
                interval: "Weekly",
                rate: "1KG/ACRE"
            },
            {
                name: "Cabbage",
                duration: "3 Months",
                interval: "Weekly",
                rate: "1KG/ACRE"
            },
            {
                name: "Tomatoes/Water Melon",
                duration: "4 Months",
                interval: "Weekly",
                rate: "1KG/ACRE"
            },
            {
                name: "Potatoes",
                duration: "3 Months",
                interval: "14 Days",
                rate: "1KG/ACRE"
            },
            {
                name: "Bulb Onions",
                duration: "4 Months",
                interval: "14 Days",
                rate: "1KG/ACRE"
            }
        ]
    },
    {
        id: "cereals",
        name: "Cereals",
        crops: [
            {
                name: "Maize",
                duration: "4 Months",
                interval: "14 Days",
                rate: "1KG/ACRE"
            },
            {
                name: "Rice",
                duration: "4 Months",
                interval: "14 Days",
                rate: "1KG/ACRE"
            },
            {
                name: "Legumes",
                duration: "2 Months",
                interval: "Weekly",
                rate: "1KG/ACRE"
            }
        ]
    },
    {
        id: "floriculture",
        name: "Floriculture",
        crops: [
            {
                name: "Flowers",
                duration: "Continuous",
                interval: "Weekly",
                rate: "2KG/HA",
                notes: "Based on standard foliar application cycles"
            }
        ]
    },
    {
        id: "fruits",
        name: "Fruits",
        crops: [
            {
                name: "Avocado",
                duration: "Seasonal",
                interval: "Monthly",
                rate: "1KG/ACRE",
                notes: "Apply during flowering and fruit set"
            },
            {
                name: "Mangoes",
                duration: "Seasonal",
                interval: "Monthly",
                rate: "1KG/ACRE"
            }
        ]
    }
];
