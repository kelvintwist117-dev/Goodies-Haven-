/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  MessageSquare, 
  MapPin, 
  Phone, 
  Clock, 
  Flame, 
  ShoppingBag, 
  ChevronRight, 
  CheckCircle2, 
  Star,
  Facebook,
  Instagram,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const WHATSAPP_URL = "https://wa.me/27818214395";

const KOTA_ITEMS = [
  { id: 1, name: "Classic Base", desc: "Quarter loaf with polony, signature atchar and seasoned chips", price: "R35", priceNum: 35, tags: ['contains-meat'] },
  { id: 2, name: "Cheesy Classic", desc: "Polony, melted cheese, atchar and chips in a fresh quarter-loaf", price: "R42", priceNum: 42, tags: ['contains-meat', 'contains-dairy'] },
  { id: 3, name: "Morning Kick", desc: "Egg, vienna, cheese, polony, atchar and chips", price: "R55", priceNum: 55, tags: ['contains-meat', 'contains-dairy'] },
  { id: 4, name: "Russian Prince", desc: "Grilled Russian, cheese, polony, atchar and chips", price: "R69", priceNum: 69, tags: ['contains-meat', 'contains-dairy'] },
  { id: 5, name: "Deluxe Russian", desc: "Russian, egg, cheese, polony, lettuce, cucumber, atchar and chips", price: "R79", priceNum: 79, tags: ['contains-meat', 'contains-dairy'] },
  { id: 6, name: "Full House", desc: "Russian, vienna, egg, cheese, polony, lettuce, cucumber, atchar and chips", price: "R95", priceNum: 95, tags: ['contains-meat', 'contains-dairy'] },
  { id: 7, name: "Garden Hero", desc: "Cheese, fried egg, lettuce, cucumber, atchar and seasoned chips (No meat)", price: "R45", priceNum: 45, tags: ['vegetarian', 'contains-dairy'] },
];

const DIETARY_LEGEND = [
  { id: 'vegetarian', label: 'Vegetarian', icon: '🍃' },
  { id: 'contains-meat', label: 'Contains Meat', icon: '🍖' },
  { id: 'contains-dairy', label: 'Contains Dairy', icon: '🧀' },
];

const EXTRA_TOPPINGS = [
  { id: 'egg', name: 'Extra Egg', price: 7 },
  { id: 'cheese', name: 'Extra Cheese', price: 7 },
  { id: 'russian', name: 'Extra Russian', price: 25 },
  { id: 'vienna', name: 'Extra Vienna', price: 15 },
  { id: 'polony', name: 'Extra Polony', price: 10 },
  { id: 'atchar', name: 'Extra Atchar', price: 5 },
];

const EXTRA_SAUCES = [
  { id: 'tomato', name: 'Tomato Sauce', price: 0 },
  { id: 'mustard', name: 'Mustard', price: 0 },
  { id: 'bbq', name: 'BBQ Sauce', price: 0 },
  { id: 'chili', name: 'Chili Sauce', price: 0 },
  { id: 'periperi', name: 'Peri-Peri (Hot)', price: 3 },
  { id: 'garlic_mayo', name: 'Garlic Mayo', price: 5 },
];

const EXTRA_SIDES = [
  { id: 'extra_chips', name: 'Extra Chips', price: 15 },
];

const TESTIMONIALS = [
  { name: "Thabo M.", area: "Rustenburg CBD", text: "Best Kota I've had in a long time. The chips are perfectly seasoned and the portion is massive! ⭐⭐⭐⭐⭐" },
  { name: "Lerato S.", area: "Tlhabane", text: "Goodies Haven is my go-to for breakfast. Their morning sandwiches are a lifesaver. Fast delivery too! ⭐⭐⭐⭐⭐" },
  { name: "Kabelo J.", area: "Waterfall East", text: "The Russian Prince is a beast! Real value for money and the flavor is top-notch. Com hungry for real. ⭐⭐⭐⭐⭐" },
];

const DELIVERY_AREAS = [
  "Rustenburg CBD",
  "Rustenburg North",
  "Geelhoutpark",
  "Noordend",
  "East End",
  "Rustenburg South",
  "Tlhabane West",
  "Protea Park"
];

const FAQ_ITEMS = [
  {
    question: "Where do you deliver?",
    answer: "We deliver within a 5km radius of Rustenburg CBD. This includes areas like Rustenburg North, Geelhoutpark, Noordend, East End, Rustenburg South, Tlhabane West, and Protea Park."
  },
  {
    question: "How can I pay?",
    answer: "We accept Cash, Card, and Instant EFT on delivery or pickup. Our delivery drivers carry mobile card machines for your convenience."
  },
  {
    question: "Are your ingredients fresh?",
    answer: "Absolutely! Our bread is baked daily, and we source all our meats and produce from local Rustenburg suppliers every morning to ensure maximum flavor."
  },
  {
    question: "How long does delivery take?",
    answer: "On average, our delivery takes 30-45 minutes. During peak hours (lunch and dinner), it might take slightly longer, but we always keep you updated via WhatsApp."
  },
  {
    question: "Do you handle bulk orders?",
    answer: "Yes! We cater for office lunches and small events. Please WhatsApp us at least 2 hours in advance for orders containing more than 10 items so we can prepare them fresh."
  },
  {
    question: "Can I customize my Kota?",
    answer: "Definitely. You can use our online customizer (click 'Customize Order' on any menu item) or simply tell us your preferences on WhatsApp."
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const staggerItem = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  
  // Gallery State
  const [galleryPhotos, setGalleryPhotos] = useState<{id: string, url: string, name: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [userProfile, setUserProfile] = useState<{name: string, photo: string | null}>({
    name: "Crave Hunter",
    photo: null
  });
  
  // Customization State
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedSides, setSelectedSides] = useState<string[]>([]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
  const y3 = useTransform(scrollY, [1000, 2500], [-100, 100]);
  const yFlavor = useTransform(scrollY, [2500, 4500], [50, -50]);
  const rotateParallax = useTransform(scrollY, [0, 2000], [0, 15]);

  useEffect(() => {
    const handleScroll = () => {
      // Threshold based on hero height (approx 80-90vh)
      const threshold = window.innerHeight * 0.7;
      setScrolled(window.scrollY > threshold);
      
      // Scroll Spy Logic
      const sections = ['menu', 'delivery', 'about', 'order', 'gallery', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Business Hours Logic (7AM - 9PM)
    const checkStatus = () => {
      const now = new Date();
      const saTime = new Date(now.toLocaleString("en-US", {timeZone: "Africa/Johannesburg"}));
      const hours = saTime.getHours();
      setIsOpen(hours >= 7 && hours < 21);
    };

    // Load from LocalStorage
    const savedGallery = localStorage.getItem('haven_gallery');
    if (savedGallery) {
      try {
        setGalleryPhotos(JSON.parse(savedGallery));
      } catch (e) {
        console.error("Failed to load gallery", e);
      }
    }

    const savedProfile = localStorage.getItem('haven_profile');
    if (savedProfile) {
      try {
        setUserProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error("Failed to load profile", e);
      }
    }

    window.addEventListener('scroll', handleScroll);
    checkStatus();
    const interval = setInterval(checkStatus, 60000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Menu", href: "#menu" },
    { name: "Delivery", href: "#delivery" },
    { name: "About", href: "#about" },
    { name: "Order", href: "#order" },
    { name: "Gallery", href: "#gallery" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const handleOrder = (item: any) => {
    setSelectedItem(item);
    setSelectedToppings([]);
    setSelectedSauces([]);
    setSelectedSides([]);
  };

  const calculateTotal = () => {
    if (!selectedItem) return 0;
    let total = selectedItem.priceNum;
    
    selectedToppings.forEach(id => {
      const topping = EXTRA_TOPPINGS.find(t => t.id === id);
      if (topping) total += topping.price;
    });

    selectedSauces.forEach(id => {
      const sauce = EXTRA_SAUCES.find(s => s.id === id);
      if (sauce) total += sauce.price;
    });

    selectedSides.forEach(id => {
      const side = EXTRA_SIDES.find(s => s.id === id);
      if (side) total += side.price;
    });

    return total;
  };

  const sendWhatsAppOrder = () => {
    const total = calculateTotal();
    const toppingsStr = selectedToppings.length > 0 
      ? `\nExtras: ${selectedToppings.map(id => EXTRA_TOPPINGS.find(t => t.id === id)?.name).join(', ')}` 
      : '';
    const saucesStr = selectedSauces.length > 0 
      ? `\nSauces: ${selectedSauces.map(id => EXTRA_SAUCES.find(s => s.id === id)?.name).join(', ')}` 
      : '';
    const sidesStr = selectedSides.length > 0 
      ? `\nSides: ${selectedSides.map(id => EXTRA_SIDES.find(s => s.id === id)?.name).join(', ')}` 
      : '';

    const message = encodeURIComponent(`Hello Goodies Haven! I'd like to order:\n\n🍔 *${selectedItem.name}* (Base: ${selectedItem.price})${toppingsStr}${saucesStr}${sidesStr}\n\n💰 *Total: R${total}*`);
    window.open(`${WHATSAPP_URL}?text=${message}`, '_blank');
    setSelectedItem(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File too large! Please keep it under 2MB for the gallery.");
        return;
      }
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto = {
          id: Date.now().toString(),
          url: reader.result as string,
          name: userProfile.name
        };
        const updated = [newPhoto, ...galleryPhotos].slice(0, 8);
        setGalleryPhotos(updated);
        localStorage.setItem('haven_gallery', JSON.stringify(updated));
        setIsUploading(false);
        alert("Photo added to the Fan Gallery! 🔥");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedProfile = { ...userProfile, photo: reader.result as string };
        setUserProfile(updatedProfile);
        localStorage.setItem('haven_profile', JSON.stringify(updatedProfile));
        alert("Profile picture updated! Looking good. 😎");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-green text-brand-cream relative">
      {/* Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-gold focus:text-brand-brown focus:px-6 focus:py-3 focus:rounded-md focus:font-bold"
      >
        Skip to main content
      </a>

      {/* 1. Sticky Navigation */}
      <nav 
        aria-label="Main Navigation"
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/60 backdrop-blur-xl py-2 border-b border-white/10' : 'bg-transparent py-4'}`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-tight text-brand-gold">GOODIES HAVEN</span>
            <span className="text-[10px] uppercase font-bold opacity-70 tracking-widest -mt-1">The Craftsmen of Flavor</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                className={`nav-link ${activeSection === link.href.substring(1) ? 'text-brand-gold' : ''}`}
              >
                {link.name}
              </a>
            ))}

            {/* Profile Pic Upload */}
            <label className="relative cursor-pointer group">
              <input type="file" className="hidden" accept="image/*" onChange={handleProfileUpload} />
              <div className="w-10 h-10 rounded-full border-2 border-brand-gold/30 overflow-hidden bg-brand-brown/50 hover:border-brand-gold transition-all shadow-lg flex items-center justify-center">
                {userProfile.photo ? (
                  <img src={userProfile.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-black text-brand-gold/50">YOU</span>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-brand-gold text-brand-brown rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Flame size={8} />
              </div>
            </label>

            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Order on WhatsApp (Opens in a new tab)"
              className="cta-button py-2 px-6 text-xs ring-1 ring-white/10"
            >
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-brand-cream font-bold"
          >
            {isMenuOpen ? <X size={28} aria-hidden="true" /> : <MenuIcon size={28} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/80 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 py-8 max-h-[80vh] overflow-y-auto">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                    className="text-brand-cream text-lg uppercase font-display font-bold"
                  >
                    {link.name}
                  </a>
                ))}
                <a 
                  href={WHATSAPP_URL} 
                  target="_blank" 
                  rel="noreferrer" 
                  aria-label="Order on WhatsApp (Opens in a new tab)"
                  className="cta-button w-4/5 text-center"
                >
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main id="main-content">
        {/* 2. Hero Section */}
        <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-brown to-brand-charcoal z-0" />
          {/* Decorative Elements */}
          <motion.div style={{ y: y1 }} className="absolute top-1/4 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
          <motion.div style={{ y: y2 }} className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 z-10 text-center">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-1/2 text-left">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8 flex flex-col items-start gap-4"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold">
                    <Flame size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-cream">Rustenburg's Best Street Food</span>
                  </div>
                  
                  <div className={`px-4 py-1 rounded-sm text-[10px] uppercase font-black tracking-widest border transition-colors ${isOpen ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
                    {isOpen ? '● Open Now — Order Ready' : '○ Currently Closed — Opens 7AM'}
                  </div>
                </motion.div>
                
                <motion.h1 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-6xl md:text-[7rem] font-display font-black text-brand-cream uppercase leading-[0.8] mb-8 tracking-tighter"
                >
                  Street Flavor,<br />
                  <span className="text-brand-gold">The Haven.</span>
                </motion.h1>
                
                <motion.p 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-brand-cream/90 max-w-xl text-xl md:text-2xl mb-12 font-medium italic opacity-80"
                >
                  Loaded Kotas, Fresh Sandwiches & More. Fast, Fresh & Local. "Come Hungry. Leave Happy."
                </motion.p>
                
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Order on WhatsApp (Opens in a new tab)"
                    className="cta-button w-full sm:w-auto px-10 py-5 text-xl flex items-center justify-center gap-2"
                  >
                    Order on WhatsApp <Flame className="animate-pulse" aria-hidden="true" />
                  </a>
                  <a 
                    href="#menu" 
                    className="w-full sm:w-auto px-10 py-5 border-2 border-brand-cream/50 text-brand-cream font-display font-bold rounded-lg hover:bg-brand-cream hover:text-brand-brown transition-all uppercase tracking-wide text-center"
                  >
                    See Our Menu
                  </a>
                </motion.div>
              </div>

              {/* Featured Card Attraction */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="lg:w-2/5 relative"
              >
                <div className="bg-brand-brown p-4 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-brand-gold/20 rotate-3 transform hover:rotate-0 transition-transform duration-700">
                  <div className="aspect-[4/5] bg-brand-green rounded-[2rem] overflow-hidden relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=1000" 
                      alt="The Full House Kota"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[0.2] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                       <span className="bg-brand-gold text-brand-brown px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Best Seller</span>
                    </div>
                    <div className="absolute bottom-8 left-8 right-8">
                       <h4 className="font-display text-4xl font-black text-brand-gold uppercase leading-none mb-2">The Full House</h4>
                       <p className="text-brand-cream/80 text-xs uppercase tracking-widest font-bold mb-4">Russian • Egg • Cheese • Chips • Atchar</p>
                       <button 
                        onClick={() => handleOrder(KOTA_ITEMS[5])}
                        className="w-full bg-brand-gold text-brand-brown py-3 rounded-xl font-display font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-[1.02] transition-transform"
                       >
                         Customize This Legend
                       </button>
                    </div>
                  </div>
                </div>
                {/* Floating Price Tag */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-brand-cream text-brand-brown flex flex-col items-center justify-center rounded-full shadow-2xl font-display font-black border-4 border-brand-brown -rotate-12 animate-pulse">
                  <span className="text-[10px] uppercase opacity-60">ONLY</span>
                  <span className="text-xl">R95</span>
                </div>
              </motion.div>
            </div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-cream/10 pt-12"
              aria-label="Why choose Goodies Haven"
            >
              {[
                { icon: <Flame size={20} aria-hidden="true" />, text: "Loaded & Satisfying" },
                { icon: <Timer size={20} aria-hidden="true" />, text: "Fast Delivery" },
                { icon: <MapPin size={20} aria-hidden="true" />, text: "Rustenburg CBD" },
                { icon: <ShoppingBag size={20} aria-hidden="true" />, text: "Fresh Daily" }
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 text-brand-cream/70">
                  <span className="text-brand-gold">{badge.icon}</span>
                  <span className="text-[11px] md:text-xs font-bold uppercase tracking-wider">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 3. Referral Promo Banner */}
        <section className="bg-brand-gold py-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-brand-brown relative z-10">
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-display font-black text-2xl md:text-3xl leading-tight uppercase italic">GET R5 OFF YOUR NEXT MEAL!</h3>
              <p className="font-bold opacity-90 text-sm">Simply have your friend place an order!</p>
            </div>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Share with a friend on WhatsApp (Opens in a new tab)"
              className="bg-brand-brown text-brand-gold font-display font-black py-3 px-8 rounded-lg shadow-xl hover:scale-105 transition-transform uppercase tracking-wider text-sm flex items-center gap-2"
            >
              Share with a Friend <ChevronRight size={18} aria-hidden="true" />
            </a>
          </div>
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Flame size={120} />
          </div>
        </section>

        {/* 4. Kota Range Menu Section */}
        <section id="menu" className="py-24 bg-brand-green/20 relative">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div {...fadeIn} className="text-center mb-12 px-4">
              <h2 className="text-5xl md:text-7xl font-display font-black text-brand-gold uppercase mb-4 tracking-tighter">
                🔥 Kota Range
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto mb-6"></div>
              <p className="text-brand-cream/60 font-bold uppercase tracking-widest text-xs mb-8">
                Rustenburg Local • Loaded Every Time
              </p>

              {/* Dietary Legend */}
              <div className="flex flex-wrap justify-center gap-4 py-4 px-6 bg-white/5 border border-white/10 rounded-full max-w-2xl mx-auto mb-8">
                {DIETARY_LEGEND.map(item => (
                  <div key={item.id} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-cream/60">
                    <span className="text-lg">{item.icon}</span> {item.label}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {KOTA_ITEMS.map((item) => (
                <motion.article 
                  key={item.id}
                  variants={staggerItem}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className="card-dark group cursor-default"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div 
                      className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center font-display font-black text-2xl text-brand-gold shrink-0"
                      aria-hidden="true"
                    >
                      0{item.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl font-display font-black text-brand-cream uppercase leading-none group-hover:text-brand-gold transition-colors">
                            {item.name}
                          </h3>
                          <div className="flex gap-1">
                             {item.tags?.map(tagId => {
                              const tag = DIETARY_LEGEND.find(t => t.id === tagId);
                              return tag ? (
                                <span key={tagId} title={tag.label} className="text-sm cursor-help">{tag.icon}</span>
                              ) : null;
                            })}
                          </div>
                        </div>
                        <span className="price-badge scale-90 origin-right whitespace-nowrap" aria-label={`Price: ${item.price}`}>{item.price}</span>
                      </div>
                      <p className="text-brand-cream/60 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleOrder(item)} 
                    aria-label={`Customize and Order ${item.name}`}
                    className="w-full py-4 rounded-md bg-white/5 border border-white/10 text-brand-gold font-display font-black uppercase tracking-wider text-xs hover:bg-brand-gold hover:text-brand-brown transition-all flex items-center justify-center gap-2"
                  >
                    Customize Order <ShoppingBag size={14} aria-hidden="true" />
                  </button>
                </motion.article>
              ))}
            </motion.div>

            <div className="mt-16 flex justify-center">
              <div className="inline-flex items-center gap-3 bg-brand-brown text-brand-gold px-6 py-2 rounded-full font-display font-black uppercase text-sm tracking-widest animate-bounce">
                <Flame size={16} />
                NEW ITEM — Street Flavor Done Right 🔥
              </div>
            </div>
          </div>
        </section>

        {/* 5. Morning Sandwiches Section */}
        <section className="bg-brand-brown py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div {...fadeIn} className="text-center mb-16 text-brand-cream">
              <h2 className="text-5xl md:text-6xl font-display font-black uppercase mb-4 tracking-tighter">
                ☀️ Morning Sandwiches
              </h2>
              <p className="text-brand-gold font-bold text-lg">
                Start your morning the Goodies Haven way
              </p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
              <motion.article 
                {...fadeIn}
                className="bg-brand-green p-8 rounded-3xl shadow-2xl border border-brand-gold/20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
              >
                <div className="w-40 h-40 bg-brand-gold flex items-center justify-center rounded-2xl shrink-0 shadow-inner" aria-hidden="true">
                  <Timer size={80} className="text-brand-brown" />
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-3xl font-display font-black text-brand-gold uppercase">Morning Sandwich</h3>
                    <span className="price-badge text-lg md:ml-4" aria-label="Price: R30">R30</span>
                  </div>
                  <p className="text-brand-cream/80 text-lg mb-6">Cheese, Vienna, Egg — The ultimate breakfast combo on fresh bread.</p>
                  <a 
                    href={WHATSAPP_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Order Breakfast on WhatsApp (Opens in a new tab)"
                    className="cta-button inline-flex items-center gap-2"
                  >
                    Order Breakfast on WhatsApp <MessageSquare size={18} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            </div>
          </div>
          {/* Background Circles */}
          <motion.div style={{ y: y3, rotate: rotateParallax }} className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        </section>

        {/* 5.5 Delivery Section */}
        <section id="delivery" className="py-20 bg-brand-green/10 border-y border-white/5 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-gold text-brand-brown rounded-sm text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  <Timer size={14} /> Local Delivery Experts
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black text-brand-gold uppercase mb-6 leading-none tracking-tighter">
                  Hot & Fresh Delivery<br />
                  <span className="text-brand-cream opacity-90">In Rustenburg CBD</span>
                </h2>
                <p className="text-brand-cream/70 text-lg mb-8 max-w-lg italic">
                  "We don't just deliver food; we deliver satisfaction at speed. Our local drivers know every corner of the CBD to ensure your Kota arrives hot."
                </p>
                
                <div className="bg-black/20 p-6 rounded-xl border border-white/5">
                  <h4 className="font-display font-bold uppercase text-brand-gold text-sm tracking-widest mb-4 flex items-center gap-2">
                    <MapPin size={16} /> Delivery Zones (5km Radius)
                  </h4>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {DELIVERY_AREAS.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-brand-cream/60 uppercase tracking-wide">
                        <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="bg-brand-brown/80 p-8 rounded-2xl border border-brand-gold/20 flex flex-col items-center text-center">
                  <span className="text-3xl font-display font-black text-brand-gold mb-1">R20</span>
                  <span className="text-[10px] font-black text-brand-cream/50 uppercase tracking-widest">Delivery Fee</span>
                </div>
                <div className="bg-brand-brown/80 p-8 rounded-2xl border border-white/10 flex flex-col items-center text-center">
                  <span className="text-3xl font-display font-black text-brand-gold mb-1">30-45</span>
                  <span className="text-[10px] font-black text-brand-cream/50 uppercase tracking-widest">Mins Avg</span>
                </div>
                <div className="col-span-2 bg-brand-gold p-6 rounded-2xl text-brand-brown shadow-xl hover:scale-[1.02] transition-transform">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-black text-xl uppercase leading-none">Free Delivery</p>
                      <p className="text-[10px] font-bold uppercase opacity-80 mt-1">On all orders over R250</p>
                    </div>
                    <ShoppingBag size={32} />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. About / Story Section */}
        <section id="about" className="py-24 bg-brand-green overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-6xl font-display font-black text-brand-gold uppercase mb-8 leading-none tracking-tighter">
                  Made on the Streets,<br />
                  <span className="text-brand-cream">Crafted with Skill</span>
                </h2>
                <div className="space-y-6 text-brand-cream/80 text-lg leading-relaxed">
                  <p>
                    At Goodies Haven, we don't just make food; we engineer flavor. Born in the heart of Rustenburg, our kitchen is dedicated to the legends of the street—the hungry, the hard-working, and the flavor-seekers.
                  </p>
                  <p>
                    Every Kota we stack and every sandwich we toast follows our "Craftsmen Philosophy": Premium local ingredients, generous portions that actually satisfy, and that signature secret atchar that keeps you coming back.
                  </p>
                  <p className="font-bold text-brand-gold">
                    We're proud to be Rustenburg CBD's go-to spot for street food that respects your hunger. Come Hungry. Leave Happy.
                  </p>
                </div>
                
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { title: "Craftsmen of Flavor", icon: <CheckCircle2 className="text-brand-gold" size={18} aria-hidden="true" /> },
                    { title: "Loaded Every Time", icon: <CheckCircle2 className="text-brand-gold" size={18} aria-hidden="true" /> },
                    { title: "Proudly Rustenburg", icon: <CheckCircle2 className="text-brand-gold" size={18} aria-hidden="true" /> }
                  ].map((prop, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      {prop.icon}
                      <span className="font-display font-bold uppercase text-xs tracking-widest text-brand-cream/80">{prop.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                {...fadeIn} 
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="bg-brand-brown rounded-2xl p-4 shadow-2xl rotate-3">
                   <div className="aspect-[4/5] bg-brand-green rounded-xl overflow-hidden relative group">
                      <img 
                        src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=1000" 
                        alt="Loaded Street Food"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-brown to-transparent" />
                      <div className="absolute bottom-8 left-8">
                        <Flame size={48} className="text-brand-gold mb-2" aria-hidden="true" />
                        <span className="font-display text-4xl font-black text-brand-cream uppercase leading-none block">Our Kitchen,<br />Your Haven.</span>
                      </div>
                   </div>
                </div>
                {/* Float elements */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-brand-gold text-brand-brown flex flex-col items-center justify-center rounded-full shadow-2xl font-display font-black text-center -rotate-12 border-4 border-brand-brown">
                  <span className="text-2xl">100%</span>
                  <span className="text-[10px]">HANDMADE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 7. How to Order Section */}
        <section id="order" className="py-24 bg-brand-charcoal text-brand-cream relative">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <motion.div {...fadeIn} className="mb-16">
              <h2 className="text-5xl font-display font-black uppercase text-brand-gold mb-4 tracking-tighter">How To Order</h2>
              <p className="text-brand-cream/60">Hungry? We've made it simple.</p>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 relative" 
              aria-label="Steps to place an order"
            >
              {/* Connector lines (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 border-t-2 border-dashed border-brand-gold/30 -z-0" aria-hidden="true" />
              
              {[
                { step: "01", title: "Browse", desc: "Check out our loaded menu above and pick your flavor." },
                { step: "02", title: "WhatsApp Us", desc: "Send your order details & delivery address to +27 81 821 4395." },
                { step: "03", title: "Swift Delivery", desc: "Our local drivers deliver hot food to your door in 30-45 mins. Cash or Card on delivery!" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ scale: 1.05 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div 
                    className="w-16 h-16 bg-brand-gold text-brand-brown rounded-full flex items-center justify-center font-display font-black text-2xl mb-6 shadow-[0_0_20px_rgba(212,160,23,0.3)]"
                    aria-hidden="true"
                  >
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-display font-black mb-3 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-brand-cream/70 text-sm max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeIn} className="mt-16">
              <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Order Now on WhatsApp (Opens in a new tab)"
                className="cta-button inline-flex items-center gap-3 text-lg py-4 px-12"
              >
                Order Now on WhatsApp <Flame size={20} className="animate-bounce" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* 8. Social Proof Section */}
        <section className="py-24 bg-brand-green/30 overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-brand-gold uppercase mb-4 tracking-tighter">
                The People Have Spoken 🙌
              </h2>
              <div className="flex justify-center gap-1" aria-label="5 star rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-brand-gold text-brand-gold" aria-hidden="true" />)}
              </div>
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {TESTIMONIALS.map((t, idx) => (
                <motion.article 
                  key={idx}
                  variants={staggerItem}
                  whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.4)" }}
                  className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/5 flex flex-col transition-colors"
                >
                  <div className="flex gap-1 mb-4" aria-label="5 stars">
                    <span className="text-[#D4A017] text-xs">★★★★★</span>
                    <span className="text-[10px] font-bold opacity-50 uppercase ml-2 tracking-widest">{t.name} — {t.area}</span>
                  </div>
                  <blockquote className="text-brand-cream/90 italic mb-6 leading-relaxed text-sm">
                    "{t.text}"
                  </blockquote>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 8.2 Fan Gallery Section */}
        <section id="gallery" className="py-24 bg-brand-green relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <motion.div {...fadeIn} className="max-w-2xl">
                <h2 className="text-5xl md:text-6xl font-display font-black text-brand-gold uppercase mb-4 tracking-tighter">
                  Haven Gallery 📸
                </h2>
                <p className="text-brand-cream/80 text-lg italic">
                  "Our fans don't just eat Kotas, they create legends. Show off your loaded meal and join the Goodies Haven wall of fame."
                </p>
              </motion.div>
              
              <motion.div {...fadeIn} className="shrink-0">
                <label className="cursor-pointer bg-brand-gold text-brand-brown py-4 px-10 rounded-lg font-display font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-transform inline-flex items-center gap-3 active:scale-95">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    disabled={isUploading}
                  />
                  {isUploading ? "Uploading..." : "Share Your Kota 🔥"}
                </label>
              </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Default placeholders if empty */}
              {galleryPhotos.length === 0 && [
                "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1603384358453-e3388bd30843?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=600"
              ].map((url, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className="aspect-square bg-brand-brown rounded-xl overflow-hidden border border-brand-gold/10 group"
                >
                  <img 
                    src={url} 
                    alt="Loaded Kota" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                  />
                </motion.div>
              ))}

              {galleryPhotos.map((photo, i) => (
                <motion.div 
                  key={photo.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="aspect-square bg-brand-brown rounded-xl overflow-hidden border border-brand-gold/30 group relative shadow-2xl"
                >
                  <img 
                    src={photo.url} 
                    alt="User uploaded Kota" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 filter contrast-[1.1] saturate-[1.2] brightness-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-brand-gold font-display font-black text-[10px] uppercase tracking-widest">Masterpiece by {photo.name}</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-brand-gold text-brand-brown px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter shadow-lg">
                    HOT NEWS
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Background Text */}
          <motion.div style={{ y: yFlavor }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-display font-black text-white/[0.02] pointer-events-none select-none uppercase">
            Flavor
          </motion.div>
        </section>

        {/* 8.5 FAQ Section */}
        <section id="faq" className="py-24 bg-brand-charcoal overflow-hidden relative">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div {...fadeIn} className="text-center mb-16">
              <h2 className="text-5xl font-display font-black text-brand-gold uppercase mb-4 tracking-tighter">
                Common Questions
              </h2>
              <p className="text-brand-cream/60 uppercase tracking-widest text-xs font-bold">
                Everything you need to know about Goodies Haven
              </p>
            </motion.div>

            <div className="space-y-4">
              {FAQ_ITEMS.map((item, idx) => (
                <FAQItem key={idx} item={item} idx={idx} />
              ))}
            </div>

            <motion.div {...fadeIn} className="mt-16 p-8 bg-brand-gold/5 border border-brand-gold/20 rounded-2xl text-center">
               <p className="text-brand-cream/80 mb-6 italic">Still have questions? The Craftsmen are just a message away.</p>
               <a 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-brand-gold text-brand-brown py-3 px-8 rounded-lg font-display font-black uppercase text-sm tracking-widest hover:scale-105 transition-transform inline-flex items-center gap-2"
               >
                 WhatsApp Us Directly <MessageSquare size={18} />
               </a>
            </motion.div>
          </div>
          {/* Background Decorative */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl opacity-50" />
        </section>

        {/* 9. Location & Contact Section */}
        <section id="contact" className="bg-brand-green py-24 text-brand-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div {...fadeIn}>
                <h2 className="text-5xl font-display font-black uppercase mb-8 tracking-tighter text-brand-gold">Reach The Craftsmen</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0" aria-hidden="true">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1 text-sm">Our Location</h3>
                      <p className="text-lg">Shop 12, Klipgat Centre, Corner Nelson Mandela & Pres. Mbeki Drive, Rustenburg</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0" aria-hidden="true">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1 text-sm">Call / WhatsApp</h3>
                      <p className="text-lg font-bold">+27 81 821 4395</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0" aria-hidden="true">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h3 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1 text-sm">Crave Hours</h3>
                      <p className="text-lg">Mon–Sun, 7AM–9PM</p>
                    </div>
                  </div>

                  <div className="p-6 bg-brand-brown/50 border border-brand-gold/20 rounded-xl inline-flex items-center gap-3">
                    <ShoppingBag className="text-brand-gold shrink-0" aria-hidden="true" />
                    <p className="text-sm font-bold uppercase tracking-widest">Delivery only within Rustenburg CBD (5 km radius)</p>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <a href="#" aria-label="Visit our Facebook page" className="p-3 bg-brand-cream/10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all"><Facebook size={20} aria-hidden="true" /></a>
                  <a href="#" aria-label="Visit our Instagram page" className="p-3 bg-brand-cream/10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all"><Instagram size={20} aria-hidden="true" /></a>
                  <a href="#" aria-label="Visit our TikTok page" className="p-3 bg-brand-cream/10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all">
                    <svg className="w-5 h-5 fill-current opacity-80" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.59-5.71-.29-3.27 2.2-6.43 5.39-7.04.13-.02.26-.03.4-.04v4.06c-.12.02-.24.04-.36.07-.37.08-.74.24-1.06.47-.79.57-1.29 1.53-1.26 2.51.01.62.19 1.25.5 1.78.65 1.07 1.88 1.77 3.13 1.78 1.19.01 2.37-.62 3.03-1.61.34-.51.52-1.12.53-1.74.03-3.08.01-6.17.02-9.25z"/></svg>
                  </a>
                </div>
              </motion.div>

              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="h-[400px] bg-brand-brown rounded-3xl overflow-hidden shadow-2xl relative border-4 border-brand-gold/10"
              >
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="space-y-4">
                    <MapPin size={48} className="mx-auto text-brand-gold animate-bounce" aria-hidden="true" />
                    <h5 className="font-display font-black text-2xl uppercase italic">Find us on Google Maps</h5>
                    <p className="text-brand-cream/60 max-w-sm mx-auto">Shop 12, Klipgat Centre. Right in the heart of Rustenburg CBD.</p>
                    <a 
                      href="https://www.google.com/maps" 
                      target="_blank" 
                      rel="noreferrer" 
                      aria-label="View our location on Google Maps (Opens in a new tab)"
                      className="inline-block mt-4 text-brand-gold font-bold underline underline-offset-4 uppercase tracking-widest text-sm"
                    >
                      Open Map
                    </a>
                  </div>
                </div>
                {/* Background image for map feeling */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="" 
                  aria-hidden="true"
                  className="w-full h-full object-cover opacity-20 filter grayscale"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-charcoal border-t border-brand-cream/5 py-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="font-display text-3xl font-black text-brand-gold tracking-tighter uppercase block mb-1">GOODIES HAVEN</span>
            <span className="text-brand-cream font-bold italic opacity-80 uppercase tracking-widest text-xs">"Come Hungry. Leave Happy."</span>
          </div>

          <nav className="flex gap-8" aria-label="Footer Navigation">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-brand-cream/50 hover:text-brand-gold transition-colors uppercase font-display text-[11px] font-bold tracking-widest">
                {link.name}
              </a>
            ))}
          </nav>

          <p className="text-brand-cream/30 text-[10px] uppercase font-bold tracking-[0.2em] pt-8 border-t border-brand-cream/5 w-full text-center">
            &copy; 2025 Goodies Haven. All Rights Reserved. Rustenburg, South Africa.
          </p>
        </div>
      </footer>

        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-brand-brown w-full max-w-xl rounded-2xl border border-brand-gold/30 shadow-2xl relative z-10 overflow-hidden"
              >
                <div className="p-6 border-b border-white/10 flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-display font-black text-brand-gold uppercase">{selectedItem.name}</h3>
                    <p className="text-brand-cream/60 text-xs uppercase tracking-widest">Personalize your Kota</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                    <X size={24} className="text-brand-cream" />
                  </button>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto space-y-8 scrollbar-hide">
                  {/* Toppings */}
                  <div>
                    <h4 className="font-display font-black text-brand-cream uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-brand-gold" /> Choose Extra Toppings
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {EXTRA_TOPPINGS.map(topping => (
                        <button
                          key={topping.id}
                          onClick={() => {
                            if (selectedToppings.includes(topping.id)) {
                              setSelectedToppings(selectedToppings.filter(id => id !== topping.id));
                            } else {
                              setSelectedToppings([...selectedToppings, topping.id]);
                            }
                          }}
                          className={`p-3 rounded-lg border text-left transition-all ${selectedToppings.includes(topping.id) ? 'bg-brand-gold border-brand-gold text-brand-brown' : 'bg-white/5 border-white/10 text-brand-cream hover:border-brand-gold/50'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase">{topping.name}</span>
                            <span className="text-[10px] font-black opacity-80">+R{topping.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sauces */}
                  <div>
                    <h4 className="font-display font-black text-brand-cream uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
                       <Flame size={16} className="text-brand-gold" /> Select Sauces
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {EXTRA_SAUCES.map(sauce => (
                        <button
                          key={sauce.id}
                          onClick={() => {
                            if (selectedSauces.includes(sauce.id)) {
                              setSelectedSauces(selectedSauces.filter(id => id !== sauce.id));
                            } else {
                              setSelectedSauces([...selectedSauces, sauce.id]);
                            }
                          }}
                          className={`p-3 rounded-lg border text-left transition-all ${selectedSauces.includes(sauce.id) ? 'bg-brand-gold border-brand-gold text-brand-brown' : 'bg-white/5 border-white/10 text-brand-cream hover:border-brand-gold/50'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase">{sauce.name}</span>
                            {sauce.price > 0 && <span className="text-[10px] font-black opacity-80">+R{sauce.price}</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sides */}
                  <div>
                    <h4 className="font-display font-black text-brand-cream uppercase text-sm mb-4 tracking-widest flex items-center gap-2">
                       <ShoppingBag size={16} className="text-brand-gold" /> Delicious Sides
                    </h4>
                    <div className="grid grid-cols-1 gap-3">
                      {EXTRA_SIDES.map(side => (
                        <button
                          key={side.id}
                          onClick={() => {
                            if (selectedSides.includes(side.id)) {
                              setSelectedSides(selectedSides.filter(id => id !== side.id));
                            } else {
                              setSelectedSides([...selectedSides, side.id]);
                            }
                          }}
                          className={`p-4 rounded-lg border text-left transition-all ${selectedSides.includes(side.id) ? 'bg-brand-gold border-brand-gold text-brand-brown' : 'bg-white/5 border-white/10 text-brand-cream hover:border-brand-gold/50'}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase">{side.name}</span>
                            <span className="text-[10px] font-black opacity-80">+R{side.price}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-black/40 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-brand-cream/60 uppercase font-black text-xs tracking-[0.2em]">Total Price</span>
                    <span className="text-3xl font-display font-black text-brand-gold">R{calculateTotal()}</span>
                  </div>
                  <button 
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-brand-gold text-brand-brown py-4 rounded-xl font-display font-black uppercase text-sm tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-transform flex items-center justify-center gap-3"
                  >
                    Confirm & Order via WhatsApp <MessageSquare size={18} />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      <motion.a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp (Always available)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="floating-wa shadow-[#25D366]/20"
      >
        <MessageSquare size={28} aria-hidden="true" />
        <span className="absolute -top-1 -right-1 bg-brand-gold w-4 h-4 rounded-full border-2 border-[#25D366] animate-ping" aria-hidden="true" />
      </motion.a>
    </div>
  );
}

interface FAQProps {
  item: { question: string; answer: string };
  idx: number;
  key?: any;
}

function FAQItem({ item, idx }: FAQProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="border border-white/5 bg-white/5 rounded-xl overflow-hidden"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-display font-black text-lg uppercase text-brand-gold tracking-tight">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-brand-cream/50"
        >
          <ChevronRight />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6 pt-0 text-brand-cream/70 leading-relaxed text-sm border-t border-white/5 bg-black/20">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
