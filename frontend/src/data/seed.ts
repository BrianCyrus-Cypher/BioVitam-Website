export const COMPANY_DATA = {
    name: "Nova Gardens Limited",
    brand: "BioVitam",
    tagline: "Cultivating the Future of Organic Productivity",
    about: {
        description: "Biovitam is an organic biofertilizer approved by KEPHIS (Kenya Plant Health Inspectorate Service) and engineered for maximum efficiency. Nova Gardens Limited is the sole distributor of Biovitam Biofertilizers in Kenya.",
        objectives: [
            "Enhance quick recovery from all crop stresses.",
            "Promote foliage growth, massive flowering, and zero abortions.",
            "Improve flower and fruit retention and rapid fruit expansions.",
            "Strengthen resistance against fungal, bacterial, and viral diseases.",
            "Support heat, frost, and water stress management.",
            "Enhance fruit taste and ensures quick, uniform ripening."
        ]
    },
    qualityAssurance: {
        standards: "Our organic fertilizers are produced under the most rigorous standards ensuring consistent purity and efficacy.",
        batchControl: "Every batch is manufactured according to stringent protocols, guaranteeing a contaminant-free, high-quality product for our customers.",
        production: "Through a controlled and standardized production process, we transform raw organic matter into a stable, nutrient-rich fertilizer, consistently batch after batch.",
        safety: "We ensure our products are safe for crops, soil, and the environment, adhering to all relevant regulations.",
        agronomy: "Our high-efficacy organic fertilizers are complemented by the direct, practical support of our agronomists and extension officers across the country ensuring our partners achieve optimal results."
    },
    structure: {
        leadership: [
            { role: "Managing Director / Management", children: ["Head of Marketing"] },
            { role: "Head of Marketing", children: ["Operations Manager"] },
            { role: "Operations Manager", children: ["Manager Coffee", "Accounts & Office Staff", "Manager Horticulture", "Manager Floriculture", "Chief Agronomist"] },
            { role: "Regional County BDAs", children: ["Agronomists", "Distributors", "Technical Staff"] }
        ]
    },
    certifications: [
        {
            body: "KEPHIS",
            name: "KEPHIS Approved",
            logo: "🏛️",
            description: "Kenya Plant Health Inspectorate Service"
        },
        {
            body: "ECOCERT",
            name: "ECOCERT Certified",
            logo: "🌿",
            description: "Organic Certification Authority"
        }
    ]
}

export const PRODUCT_DATA = [
    {
        id: 'all-growth',
        name: 'All Growth',
        formula: 'Premium Bio-Organic NPK',
        npk: '30-9-12',
        focus: 'Overall Vigor',
        description: 'Balanced nutrition for vegetative growth and general health. Formulated for all-round plant development.',
        benefits: [
            'Balanced nutrient content for all growth stages',
            'Enhances foliage growth and massive flowering',
            'Improves soil biological activity',
            'Promotes deep root penetration'
        ],
        usage: 'Apply 2-3 tons per hectare during soil preparation. Side-dress monthly during growing season.',
        packaging: '25kg & 50kg Bags',
        idealFor: ['Coffee', 'Tea', 'Maize', 'Vegetables']
    },
    {
        id: 'strong-plant',
        name: 'Strong Plant',
        formula: 'High-Nitrogen Bio-Fortifier',
        npk: '10-25-15',
        focus: 'Structural Integrity',
        description: 'Fortifies stems and roots for robust, resilient plants. High nitrogen content for maximum biomass.',
        benefits: [
            'Increases stem thickness and strength',
            'Maximizes leaf surface area for photosynthesis',
            'Accelerates vegetative recovery after harvest',
            'Reduces rejection rates in export crops'
        ],
        usage: 'Apply 2.5-3.5 tons per hectare. Best used during early growth and recovery phases.',
        packaging: '25kg Bags',
        idealFor: ['Roses', 'Horticulture', 'Fodder Crops']
    },
    {
        id: 'bloom-booster',
        name: 'Bloom Booster',
        formula: 'High-Phosphate Yield Multiplier',
        npk: '15-10-45',
        focus: 'Reproductive Yields',
        description: 'Maximizes flowering and fruiting for higher market value. Targets reproductive hormones for heavy yields.',
        benefits: [
            'Stimulates heavy flowering and fruit set',
            'Ensures uniform ripening and superior taste',
            'Increases fruit size and weight',
            'Reduces flower and fruit abortion'
        ],
        usage: 'Apply during flowering and fruit development at 1.5-2 tons per hectare.',
        packaging: '25kg Bags',
        idealFor: ['Fruit Trees', 'Tomatoes', 'Export Flowers']
    },
    {
        id: 'calcium-nitrate',
        name: 'Calcium Nitrate',
        formula: 'Cell Strength Fortifier',
        npk: '20-4-6:3',
        focus: 'Cell Strength',
        description: 'Enhances cell wall strength and nutrient balance. Essential for preventing diseases like blossom end rot.',
        benefits: [
            'Strengthens cell walls for better shelf life',
            'Prevents physiological disorders (e.g., Blossom End Rot)',
            'Improves calcium uptake in acidic soils',
            'Enhances overall plant immune system'
        ],
        usage: 'Apply 1-1.5 tons per hectare as a supplement during peak growth.',
        packaging: '25kg Bags',
        idealFor: ['Greenhouse Crops', 'Berries', 'Orchards']
    }
]

export const CLIENTELE_DATA = [
    {
        id: 1,
        name: "Highland Flower Farms",
        location: "Naivasha, Kenya",
        category: "Floriculture",
        feedback: "The stem strength and color intensity of our roses have improved drastically. Our export rejection rate fell to nearly zero.",
        stat: "99% Export Grade"
    },
    {
        id: 2,
        name: "Kiambu Coffee Estate",
        location: "Kiambu, Kenya",
        category: "Coffee",
        feedback: "Since switching to Biovitam, we've seen a consistent yield increase of 30kg per tree on our coffee blocks.",
        stat: "+45% Yield Increase"
    },
    {
        id: 3,
        name: "Rift Valley Horticulture",
        location: "Nakuru, Kenya",
        category: "Vegetables",
        feedback: "Reducing the flush period by 10 days allowed us to hit market windows we previously missed. It's a game changer.",
        stat: "10 Days Faster Cycle"
    },
    {
        id: 4,
        name: "Central Highlands Orchards",
        location: "Nyeri, Kenya",
        category: "Fruit",
        feedback: "The fruit size and sweetness (Brix levels) are noticeably better. Our buyers have increased their orders this season.",
        stat: "+30% Weight Premium"
    }
]

export const TIMELINE_DATA = [
    { year: '2015', event: 'Founded as Nova Gardens Ltd' },
    { year: '2017', event: 'First biofertilizer formulation completed' },
    { year: '2019', event: 'KEPHIS certification achieved' },
    { year: '2021', event: 'ECOCERT organic certification obtained' },
    { year: '2023', event: 'Expanded to regional distribution' },
    { year: '2024', event: 'Launched direct-to-farmer online platform' },
]
