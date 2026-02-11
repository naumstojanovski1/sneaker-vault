// Run this file once to seed your Firebase database with initial products
// Usage: node src/utils/seedProducts.js

import { addProduct } from '../services/productService.js';

const INITIAL_PRODUCTS = [
    {
        name: "Air Max Pulse",
        price: 160,
        category: "Lifestyle",
        img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
        color: "Phantom/White",
        status: "New Arrival",
        description: "The next generation of Air Max is here."
    },
    {
        name: "Jordan Retro 4",
        price: 210,
        category: "Heritage",
        img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
        color: "Cement Grey",
        status: "Hype Drop",
        description: "Classic silhouette meets modern materials."
    },
    {
        name: "Buzz Edition X",
        price: 145,
        category: "Urban",
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
        color: "Hyper Royal",
        status: "Limited",
        description: "Street-ready design for the bold."
    },
    {
        name: "Dunk Low Retro",
        price: 115,
        category: "Classic",
        img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800",
        color: "Panda Black/White",
        status: "Trending",
        description: "The icon that started it all."
    },
    {
        name: "Zoom Vomero 5",
        price: 175,
        category: "Performance",
        img: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=800",
        color: "Vibrant Orange",
        status: "New",
        description: "Unmatched comfort for the daily run."
    },
    {
        name: "Metcon 9 Pro",
        price: 150,
        category: "Training",
        img: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&q=80&w=800",
        color: "Midnight Blue",
        status: "Stable",
        description: "The gold standard of weightlifting."
    }
];

async function seedProducts() {
    console.log('Starting to seed products...');
    
    try {
        for (const product of INITIAL_PRODUCTS) {
            await addProduct(product);
            console.log(`✅ Added: ${product.name}`);
        }
        console.log('\n🎉 All products seeded successfully!');
    } catch (error) {
        console.error('❌ Error seeding products:', error);
    }
}

seedProducts();
