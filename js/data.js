/**
 * GloAfrix Marketplace - Mock Data
 * 
 * Phase 1: This file contains mock data for development
 * Phase 2: Replace with actual API calls to WordPress/WooCommerce
 * 
 * API Endpoints for Phase 2:
 * - Products: /wp-json/wc/v3/products
 * - Services: /wp-json/wp/v2/services (custom post type)
 * - Blog: /wp-json/wp/v2/posts
 * - Vendors: /wp-json/wp/v2/vendors (custom post type)
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

// Mock Products Data
// In Phase 2: fetch('/wp-json/wc/v3/products')
const mockProducts = [
    {
        id: 1,
        name: 'Smartphone X12',
        price: 'KOF 173,000',
        numericPrice: 173000,
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
        price: 'NGH 53,000',
        numericPrice: 53000,
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
        price: 'GHS 45.00',
        numericPrice: 45,
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
        price: 'ZAR 1,500',
        numericPrice: 1500,
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
        price: 'NGF 250,000',
        numericPrice: 250000,
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
        price: 'GHS 120.00',
        numericPrice: 120,
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
        price: 'KOF 28,000',
        numericPrice: 28000,
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
        price: 'ZAR 890',
        numericPrice: 890,
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
        price: 'NGN 35,000',
        numericPrice: 35000,
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
        price: 'NGN 18,000',
        numericPrice: 18000,
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
    }
];

// Mock Recommended Products
const mockRecommended = [
    {
        id: 11,
        name: 'Smart Watch Pro',
        price: 'NOF 170,000',
        numericPrice: 170000,
        image: '⌚',
        badge: 'New',
        category: 'Electronics'
    },
    {
        id: 12,
        name: 'African Ghana Nuts',
        price: 'NGH 12,000',
        numericPrice: 12000,
        image: '🥜',
        badge: 'Trending',
        category: 'Agriculture'
    },
    {
        id: 13,
        name: 'Luxury Armchair',
        price: 'ZAR 1,500',
        numericPrice: 1500,
        image: '🛋️',
        badge: 'Hot',
        category: 'Home & Living'
    },
    {
        id: 14,
        name: 'Fresh Oranges (5kg)',
        price: 'ZAR 1,000',
        numericPrice: 1000,
        image: '🍊',
        badge: 'Sale',
        category: 'Agriculture'
    }
];

// Mock Services Data
// In Phase 2: fetch('/wp-json/wp/v2/services')
const mockServices = [
    {
        id: 1,
        title: 'Professional Logo Design',
        provider: 'Kwame Designs',
        price: 'GHS 150',
        numericPrice: 150,
        avatar: 'KD',
        description: 'I will create a unique and professional logo for your brand with unlimited revisions. 7+ years experience in graphic design.',
        category: 'Design',
        rating: 5,
        reviews: 234
    },
    {
        id: 2,
        title: 'WordPress Website Development',
        provider: 'TechAfrica Solutions',
        price: 'NGN 85,000',
        numericPrice: 85000,
        avatar: 'TS',
        description: 'Full-stack WordPress development with custom themes and WooCommerce integration. Responsive design guaranteed.',
        category: 'Development',
        rating: 5,
        reviews: 156
    },
    {
        id: 3,
        title: 'Social Media Marketing',
        provider: 'Ada Marketing',
        price: 'GHS 250/mo',
        numericPrice: 250,
        avatar: 'AM',
        description: 'Comprehensive social media management across all platforms. Grow your business online with proven strategies.',
        category: 'Marketing',
        rating: 4,
        reviews: 89
    },
    {
        id: 4,
        title: 'Content Writing & SEO',
        provider: 'Chioma Writers',
        price: 'NGN 15,000',
        numericPrice: 15000,
        avatar: 'CW',
        description: 'SEO-optimized blog posts and web content that ranks. 500+ satisfied clients across Africa.',
        category: 'Writing',
        rating: 5,
        reviews: 412
    },
    {
        id: 5,
        title: 'Mobile App Development',
        provider: 'DevHub Ghana',
        price: 'GHS 5,000',
        numericPrice: 5000,
        avatar: 'DH',
        description: 'Native iOS and Android app development. From concept to deployment with ongoing support.',
        category: 'Development',
        rating: 5,
        reviews: 67
    },
    {
        id: 6,
        title: 'Video Editing Services',
        provider: 'Kofi Productions',
        price: 'ZAR 2,500',
        numericPrice: 2500,
        avatar: 'KP',
        description: 'Professional video editing for commercials, events, and social media content. Quick turnaround time.',
        category: 'Design',
        rating: 4,
        reviews: 178
    }
];

// Mock Blog Posts
// In Phase 2: fetch('/wp-json/wp/v2/posts')
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