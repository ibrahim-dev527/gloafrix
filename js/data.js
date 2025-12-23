/**
 * GloAfrix Marketplace - Mock Data (All prices in GHS)
 * 
 * Phase 1: This file contains mock data for development
 * Phase 2: Replace with actual API calls to WordPress/WooCommerce
 * 
 * All prices standardized to Ghanaian Cedis (GHS / ₵)
 */

// Categories
const categories = [
    'Electronics',
    'Fashion',
    'Beauty',
    'Home & Living',
    'Business Supplies',
    'Agriculture',
    'Industrial Machinery'
];

// Mock Products Data (All prices in GHS)
const mockProducts = [
    {
        id: 1,
        name: 'Smartphone X12',
        ghsPrice: 2850.00,
        image: '📱',
        rating: 5,
        category: 'Electronics',
        description: 'Latest flagship smartphone with 6.7" AMOLED display, 108MP camera, and 5000mAh battery. Perfect for both business and personal use.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 2,
        name: 'African Print Dress',
        ghsPrice: 450.00,
        image: '👗',
        rating: 4,
        category: 'Fashion',
        description: 'Beautiful handmade African print dress. Made from 100% cotton with vibrant colors and traditional patterns.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 3,
        name: 'Organic Shea Butter',
        ghsPrice: 45.00,
        image: '🥜',
        rating: 5,
        category: 'Beauty',
        description: 'Pure, unrefined shea butter from Ghana. Rich in vitamins and perfect for skin and hair care.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 4,
        name: 'Wooden Armchair',
        ghsPrice: 980.00,
        image: '🪑',
        rating: 4,
        category: 'Home & Living',
        description: 'Handcrafted solid wood armchair with comfortable cushioning. Perfect for living room or office.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 5,
        name: 'Laptop Pro 15"',
        ghsPrice: 4200.00,
        image: '💻',
        rating: 5,
        category: 'Electronics',
        description: 'High-performance laptop with Intel i7 processor, 16GB RAM, and 512GB SSD. Ideal for professionals.',
        vendor: {
            id: 2,
            name: 'TechAfrica Store',
            avatar: 'TA',
            rating: 4.9
        }
    },
    {
        id: 6,
        name: 'Designer Handbag',
        ghsPrice: 320.00,
        image: '👜',
        rating: 4,
        category: 'Fashion',
        description: 'Elegant leather handbag with multiple compartments. Perfect for everyday use and special occasions.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 7,
        name: 'Face Cream Set',
        ghsPrice: 180.00,
        image: '🧴',
        rating: 5,
        category: 'Beauty',
        description: 'Complete skincare set with day cream, night cream, and serum. Natural ingredients for all skin types.',
        vendor: {
            id: 3,
            name: 'Beauty Essentials',
            avatar: 'BE',
            rating: 4.7
        }
    },
    {
        id: 8,
        name: 'Coffee Table',
        ghsPrice: 650.00,
        image: '🪵',
        rating: 4,
        category: 'Home & Living',
        description: 'Modern minimalist coffee table made from premium wood. Durable and stylish design.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 9,
        name: 'Wireless Earbuds',
        ghsPrice: 290.00,
        image: '🎧',
        rating: 5,
        category: 'Electronics',
        description: 'Premium wireless earbuds with active noise cancellation and 24-hour battery life.',
        vendor: {
            id: 2,
            name: 'TechAfrica Store',
            avatar: 'TA',
            rating: 4.9
        }
    },
    {
        id: 10,
        name: 'Ankara Fabric (6 yards)',
        ghsPrice: 150.00,
        image: '🧵',
        rating: 5,
        category: 'Fashion',
        description: 'High-quality Ankara fabric with beautiful African prints. Perfect for custom tailoring.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    },
    {
        id: 11,
        name: 'Smart Watch',
        ghsPrice: 850.00,
        image: '⌚',
        rating: 5,
        category: 'Electronics',
        description: 'Feature-rich smartwatch with fitness tracking, heart rate monitor, and 7-day battery life.',
        vendor: {
            id: 2,
            name: 'TechAfrica Store',
            avatar: 'TA',
            rating: 4.9
        }
    },
    {
        id: 12,
        name: 'Kente Cloth',
        ghsPrice: 580.00,
        image: '🎨',
        rating: 5,
        category: 'Fashion',
        description: 'Authentic Ghanaian Kente cloth. Handwoven with traditional patterns and vibrant colors.',
        vendor: {
            id: 1,
            name: 'Akosua Mensah',
            avatar: 'AK',
            rating: 4.8
        }
    }
];

// Mock Recommended Products (All prices in GHS)
const mockRecommended = [
    {
        id: 13,
        name: 'Smart Watch Pro',
        ghsPrice: 1200.00,
        image: '⌚',
        badge: 'New',
        category: 'Electronics',
        rating: 5
    },
    {
        id: 14,
        name: 'African Ghana Nuts',
        ghsPrice: 85.00,
        image: '🥜',
        badge: 'Trending',
        category: 'Agriculture',
        rating: 5
    },
    {
        id: 15,
        name: 'Luxury Armchair',
        ghsPrice: 1450.00,
        image: '🛋️',
        badge: 'Hot',
        category: 'Home & Living',
        rating: 4
    },
    {
        id: 16,
        name: 'Fresh Oranges (5kg)',
        ghsPrice: 60.00,
        image: '🍊',
        badge: 'Sale',
        category: 'Agriculture',
        rating: 5
    },
    {
        id: 17,
        name: 'Bluetooth Speaker',
        ghsPrice: 380.00,
        image: '🔊',
        badge: 'New',
        category: 'Electronics',
        rating: 5
    },
    {
        id: 18,
        name: 'Batik Dress',
        ghsPrice: 420.00,
        image: '👗',
        badge: 'Trending',
        category: 'Fashion',
        rating: 5
    }
];

// Mock Services Data (All prices in GHS)
const mockServices = [
    {
        id: 1,
        title: 'Professional Logo Design',
        provider: 'Kwame Designs',
        ghsPrice: 250.00,
        avatar: 'KD',
        description: 'I will create a unique and professional logo for your brand with unlimited revisions. 7+ years experience in graphic design.',
        category: 'Design',
        rating: 5,
        reviews: 234
    },
    {
        id: 2,
        title: 'WordPress Website Development',
        ghsPrice: 1500.00,
        provider: 'Ibratech and Graphix',
        avatar: 'IG',
        description: 'Full-stack WordPress development with custom themes and WooCommerce integration. Responsive design guaranteed.',
        category: 'Development',
        rating: 5,
        reviews: 156
    },


    {
        id: 2,
        title: 'WordPress Website Development',
        ghsPrice: 1500.00,
        provider: 'Ibratech and Graphix',
        avatar: 'IG',
        description: 'Full-stack WordPress development with custom themes and WooCommerce integration. Responsive design guaranteed.',
        category: 'Development',
        rating: 5,
        reviews: 156
    },
    {
        id: 3,
        title: 'Social Media Marketing',
        ghsPrice: 400.00,
        provider: 'Ada Marketing',
        avatar: 'AM',
        description: 'Comprehensive social media management across all platforms. Grow your business online with proven strategies.',
        category: 'Marketing',
        rating: 4,
        reviews: 89
    },
    {
        id: 4,
        title: 'Content Writing & SEO',
        ghsPrice: 180.00,
        provider: 'Chioma Writers',
        avatar: 'CW',
        description: 'SEO-optimized blog posts and web content that ranks. 500+ satisfied clients across Africa.',
        category: 'Writing',
        rating: 5,
        reviews: 412
    },
    {
        id: 5,
        title: 'Mobile App Development',
        ghsPrice: 8000.00,
        provider: 'DevHub Ghana',
        avatar: 'DH',
        description: 'Native iOS and Android app development. From concept to deployment with ongoing support.',
        category: 'Development',
        rating: 5,
        reviews: 67
    },
    {
        id: 6,
        title: 'Video Editing Services',
        ghsPrice: 350.00,
        provider: 'Kofi Productions',
        avatar: 'KP',
        description: 'Professional video editing for commercials, events, and social media content. Quick turnaround time.',
        category: 'Design',
        rating: 4,
        reviews: 178
    }
];

// Mock Blog Posts
const mockBlogPosts = [
    {
        id: 1,
        title: 'How to Start Your Online Business in Africa',
        category: 'Business',
        excerpt: 'Learn the essential steps to launch a successful e-commerce business across African markets. From market research to digital payments...',
        image: '📊',
        author: 'Emmanuel Osei',
        date: 'Dec 15, 2025',
        readTime: '5 min read'
    },
    {
        id: 2,
        title: 'Top 10 Products to Sell in 2025',
        category: 'Marketplace',
        excerpt: 'Discover the most profitable product categories and trending items for African sellers. Data-driven insights from Q4 2024...',
        image: '🛍️',
        author: 'Fatima Hassan',
        date: 'Dec 18, 2025',
        readTime: '7 min read'
    },
    {
        id: 3,
        title: 'Understanding Payment Solutions in Africa',
        category: 'Fintech',
        excerpt: 'A comprehensive guide to mobile money, bank transfers, and digital wallets for merchants. Navigate the payment landscape...',
        image: '💳',
        author: 'Chidi Okoro',
        date: 'Dec 20, 2025',
        readTime: '8 min read'
    },
    {
        id: 4,
        title: 'Success Stories: African Entrepreneurs',
        category: 'Inspiration',
        excerpt: 'Read inspiring stories from vendors who built thriving businesses on GloAfrix. From zero to six-figure revenues...',
        image: '🌟',
        author: 'Amara Diallo',
        date: 'Dec 21, 2025',
        readTime: '6 min read'
    },
    {
        id: 5,
        title: 'Shipping Best Practices for African Sellers',
        category: 'Logistics',
        excerpt: 'Master the art of reliable shipping across African countries. Tips for packaging, carriers, and customer satisfaction...',
        image: '📦',
        author: 'Joseph Kimani',
        date: 'Dec 19, 2025',
        readTime: '5 min read'
    },
    {
        id: 6,
        title: 'Marketing Your Products Effectively',
        category: 'Marketing',
        excerpt: 'Proven strategies to increase product visibility and boost sales on GloAfrix. Social media, SEO, and more...',
        image: '📱',
        author: 'Zainab Mohammed',
        date: 'Dec 17, 2025',
        readTime: '9 min read'
    }
];

// Export data for use in app.js
// In a module environment, use: export { categories, mockProducts, mockRecommended, mockServices, mockBlogPosts };
// For now, data is accessible globally