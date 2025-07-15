import { Product } from '@/types/product';
import serumImage from '@/assets/serum-product.jpg';
import hairOilImage from '@/assets/hair-oil-product.jpg';
import moisturizerImage from '@/assets/moisturizer-product.jpg';
import shampooImage from '@/assets/shampoo-product.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'سيروم فيتامين سي المركز',
    description: 'سيروم مركز بفيتامين سي لإشراق البشرة وتوحيد لونها، يحتوي على مضادات الأكسدة الطبيعية',
    price: 299,
    originalPrice: 399,
    image: serumImage,
    category: 'skincare',
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'زيت الأرغان للشعر',
    description: 'زيت أرغان طبيعي 100% لترطيب الشعر وإعطائه لمعان طبيعي ونعومة فائقة',
    price: 249,
    originalPrice: 299,
    image: hairOilImage,
    category: 'haircare',
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'كريم الترطيب اليومي',
    description: 'كريم مرطب يومي للوجه بتركيبة خفيفة، يناسب جميع أنواع البشرة ويوفر ترطيب يدوم 24 ساعة',
    price: 199,
    image: moisturizerImage,
    category: 'skincare',
    inStock: true,
  },
  {
    id: '4',
    name: 'شامبو الكيراتين الطبيعي',
    description: 'شامبو غني بالكيراتين الطبيعي لتقوية الشعر وحمايته من التلف، مناسب للاستخدام اليومي',
    price: 179,
    originalPrice: 229,
    image: shampooImage,
    category: 'haircare',
    inStock: true,
  },
  {
    id: '5',
    name: 'كريم العين المضاد للتجاعيد',
    description: 'كريم متخصص لمنطقة العين يقلل من ظهور التجاعيد والهالات السوداء',
    price: 349,
    image: serumImage,
    category: 'skincare',
    inStock: true,
  },
  {
    id: '6',
    name: 'ماسك الشعر المغذي',
    description: 'ماسك عميق التغذية للشعر الجاف والتالف، يحتوي على زبدة الشيا والزيوت الطبيعية',
    price: 159,
    image: hairOilImage,
    category: 'haircare',
    inStock: false,
  },
];