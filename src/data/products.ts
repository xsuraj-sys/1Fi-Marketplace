import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'p_iphone17',
    brand: 'Apple',
    name: 'iPhone 17',
    category: 'Smartphones',
    description: 'The latest iPhone with advanced camera system and A19 chip.',
    variants: [
      { id: 'v_ip17_128_black', storage: '128GB', color: 'Midnight Black', price: 79900, images: ['/images/iphone17.jpg'] },
      { id: 'v_ip17_256_black', storage: '256GB', color: 'Midnight Black', price: 89900, images: ['/images/iphone17.jpg'] },
      { id: 'v_ip17_128_white', storage: '128GB', color: 'Starlight', price: 79900, images: ['/images/iphone17-white.jpg'] }
    ]
  },
  {
    id: 'p_iphone17pro',
    brand: 'Apple',
    name: 'iPhone 17 Pro',
    category: 'Smartphones',
    description: 'Titanium design with pro camera system and A19 Pro chip.',
    variants: [
      { id: 'v_ip17p_256_titanium', storage: '256GB', color: 'Natural Titanium', price: 129900, images: ['/images/iphone17pro.jpg'] },
      { id: 'v_ip17p_512_titanium', storage: '512GB', color: 'Natural Titanium', price: 149900, images: ['/images/iphone17pro.jpg'] }
    ]
  },
  {
    id: 'p_pixel10',
    brand: 'Google',
    name: 'Pixel 10',
    category: 'Smartphones',
    description: 'The magic of Google AI in your pocket.',
    variants: [
      { id: 'v_px10_128_obsidian', storage: '128GB', color: 'Obsidian', price: 69999, images: ['/images/pixel10.jpg'] },
      { id: 'v_px10_256_obsidian', storage: '256GB', color: 'Obsidian', price: 79999, images: ['/images/pixel10.jpg'] }
    ]
  },
  {
    id: 'p_s25ultra',
    brand: 'Samsung',
    name: 'Galaxy S25 Ultra',
    category: 'Smartphones',
    description: 'Epic camera, epic performance, with S Pen.',
    variants: [
      { id: 'v_s25u_256_titanium', storage: '256GB', color: 'Titanium Black', price: 129999, images: ['/images/s25ultra.jpg'] },
      { id: 'v_s25u_512_titanium', storage: '512GB', color: 'Titanium Black', price: 139999, images: ['/images/s25ultra.jpg'] }
    ]
  },
  {
    id: 'p_macbookpro',
    brand: 'Apple',
    name: 'MacBook Pro 14"',
    category: 'Laptops',
    description: 'M4 Pro chip. Mind-blowing performance.',
    variants: [
      { id: 'v_mbp_512_silver', storage: '512GB SSD', color: 'Silver', price: 169900, images: ['/images/macbookpro.jpg'] },
      { id: 'v_mbp_1tb_spaceblack', storage: '1TB SSD', color: 'Space Black', price: 189900, images: ['/images/macbookpro.jpg'] }
    ]
  }
];
