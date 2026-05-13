/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'motion/react';

const WHATSAPP_URL = "https://wa.me/27818214395";

const KOTA_ITEMS = [
  { id: 1, name: "Classic Base", desc: "Quarter loaf with polony, signature atchar and seasoned chips", price: "R35" },
  { id: 2, name: "Cheesy Classic", desc: "Polony, melted cheese, atchar and chips in a fresh quarter-loaf", price: "R42" },
  { id: 3, name: "Morning Kick", desc: "Egg, vienna, cheese, polony, atchar and chips", price: "R55" },
  { id: 4, name: "Russian Prince", desc: "Grilled Russian, cheese, polony, atchar and chips", price: "R69" },
  { id: 5, name: "Deluxe Russian", desc: "Russian, egg, cheese, polony, lettuce, cucumber, atchar and chips", price: "R79" },
  { id: 6, name: "Full House", desc: "Russian, vienna, egg, cheese, polony, lettuce, cucumber, atchar and chips", price: "R95" },
];

const TESTIMONIALS = [
  { name: "Thabo M.", area: "Rustenburg CBD", text: "Best Kota I've had in a long time. The chips are perfectly seasoned and the portion is massive! ⭐⭐⭐⭐⭐" },
  { name: "Lerato S.", area: "Tlhabane", text: "Goodies Haven is my go-to for breakfast. Their morning sandwiches are a lifesaver. Fast delivery too! ⭐⭐⭐⭐⭐" },
  { name: "Kabelo J.", area: "Waterfall East", text: "The Russian Prince is a beast! Real value for money and the flavor is top-notch. Com hungry for real. ⭐⭐⭐⭐⭐" },
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Scroll Spy Logic
      const sections = ['menu', 'about', 'order', 'contact'];
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
    { name: "About", href: "#about" },
    { name: "Order", href: "#order" },
    { name: "Contact", href: "#contact" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-green text-brand-cream">
      {/* 1. Sticky Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/40 backdrop-blur-xl py-2 border-b border-white/10' : 'bg-transparent py-4'}`}>
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
                className={`nav-link ${activeSection === link.href.substring(1) ? 'text-brand-gold' : ''}`}
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="cta-button py-2 px-6 text-xs ring-1 ring-white/10">
              Order on WhatsApp
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-cream font-bold">
            {isMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-brand-brown border-t border-brand-cream/10 overflow-hidden"
            >
              <div className="flex flex-col items-center gap-6 py-8">
                {navLinks.map(link => (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-brand-cream text-lg uppercase font-display font-bold"
                  >
                    {link.name}
                  </a>
                ))}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="cta-button w-4/5 text-center">
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-green via-brand-brown to-brand-charcoal z-0" />
          {/* Decorative Elements */}
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-brand-green/20 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto px-4 z-10 text-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6 flex flex-col items-center gap-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold">
                <Flame size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Rustenburg's Best Street Food</span>
              </div>
              
              <div className={`px-4 py-1 rounded-sm text-[10px] uppercase font-black tracking-widest border transition-colors ${isOpen ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-400'}`}>
                {isOpen ? '● Open Now — Order Ready' : '○ Currently Closed — Opens 7AM'}
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-[8rem] font-display font-black text-brand-cream uppercase leading-[0.85] mb-6 tracking-tighter"
            >
              Street Flavor,<br />
              <span className="text-brand-gold">Delivered.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-brand-cream/90 max-w-xl mx-auto text-xl md:text-2xl mb-12 font-medium italic opacity-80"
            >
              Loaded Kotas, Fresh Sandwiches & More. Fast, Fresh & Local. "Come Hungry. Leave Happy."
            </motion.p>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="cta-button w-full sm:w-auto px-10 py-5 text-xl flex items-center justify-center gap-2">
                Order on WhatsApp <Flame className="animate-pulse" />
              </a>
              <a href="#menu" className="w-full sm:w-auto px-10 py-5 border-2 border-brand-cream/50 text-brand-cream font-display font-bold rounded-lg hover:bg-brand-cream hover:text-brand-brown transition-all uppercase tracking-wide">
                See Our Menu
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-brand-cream/10 pt-12"
            >
              {[
                { icon: <Flame size={20} />, text: "Loaded & Satisfying" },
                { icon: <Timer size={20} />, text: "Fast Delivery" },
                { icon: <MapPin size={20} />, text: "Rustenburg CBD" },
                { icon: <ShoppingBag size={20} />, text: "Fresh Daily" }
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
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="bg-brand-brown text-brand-gold font-display font-black py-3 px-8 rounded-lg shadow-xl hover:scale-105 transition-transform uppercase tracking-wider text-sm flex items-center gap-2">
              Share with a Friend <ChevronRight size={18} />
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
            <motion.div {...fadeIn} className="text-center mb-16 px-4">
              <h2 className="text-5xl md:text-7xl font-display font-black text-brand-gold uppercase mb-4 tracking-tighter">
                🔥 Kota Range
              </h2>
              <div className="h-1 w-24 bg-brand-gold mx-auto mb-6"></div>
              <p className="text-brand-cream/60 font-bold text-lg uppercase tracking-widest text-xs">
                Rustenburg Local • Loaded Every Time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {KOTA_ITEMS.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="card-dark group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center font-display font-black text-2xl text-brand-gold shrink-0">
                      0{item.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display font-black text-brand-cream uppercase leading-none group-hover:text-brand-gold transition-colors">
                          {item.name}
                        </h3>
                        <span className="price-badge scale-90 origin-right whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-brand-cream/60 text-xs leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => window.open(WHATSAPP_URL)} className="w-full py-4 rounded-md bg-white/5 border border-white/10 text-brand-gold font-display font-black uppercase tracking-wider text-xs hover:bg-brand-gold hover:text-brand-brown transition-all flex items-center justify-center gap-2">
                    Order Now <ShoppingBag size={14} />
                  </button>
                </motion.div>
              ))}
            </div>

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
              <motion.div 
                {...fadeIn}
                className="bg-brand-green p-8 rounded-3xl shadow-2xl border border-brand-gold/20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left"
              >
                <div className="w-40 h-40 bg-brand-gold flex items-center justify-center rounded-2xl shrink-0 shadow-inner">
                  <Timer size={80} className="text-brand-brown" />
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-3xl font-display font-black text-brand-gold uppercase">Morning Sandwich</h3>
                    <span className="price-badge text-lg md:ml-4">R30</span>
                  </div>
                  <p className="text-brand-cream/80 text-lg mb-6">Cheese, Vienna, Egg — The ultimate breakfast combo on fresh bread.</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="cta-button inline-flex items-center gap-2">
                    Order Breakfast on WhatsApp <MessageSquare size={18} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Background Circles */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
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
                    { title: "Craftsmen of Flavor", icon: <CheckCircle2 className="text-brand-gold" size={18} /> },
                    { title: "Loaded Every Time", icon: <CheckCircle2 className="text-brand-gold" size={18} /> },
                    { title: "Proudly Rustenburg", icon: <CheckCircle2 className="text-brand-gold" size={18} /> }
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
                        <Flame size={48} className="text-brand-gold mb-2" />
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector lines (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 border-t-2 border-dashed border-brand-gold/30 -z-0" />
              
              {[
                { step: "01", title: "Browse", desc: "Check out our loaded menu above and pick your flavor." },
                { step: "02", title: "WhatsApp Us", desc: "Send your order details & delivery address to +27 81 821 4395." },
                { step: "03", title: "Receive", desc: "Hot, fresh food at your door or ready for pickup. Cash or Card on delivery!" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  transition={{ delay: idx * 0.2 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-brand-gold text-brand-brown rounded-full flex items-center justify-center font-display font-black text-2xl mb-6 shadow-[0_0_20px_rgba(212,160,23,0.3)]">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-display font-black mb-3 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-brand-cream/70 text-sm max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeIn} className="mt-16">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="cta-button inline-flex items-center gap-3 text-lg py-4 px-12">
                Order Now on WhatsApp <Flame size={20} className="animate-bounce" />
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
              <div className="flex justify-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-brand-gold text-brand-gold" />)}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t, idx) => (
                <motion.div 
                  key={idx}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/30 backdrop-blur-md p-8 rounded-xl border border-white/5 flex flex-col"
                >
                  <div className="flex gap-1 mb-4">
                    <span className="text-[#D4A017] text-xs">★★★★★</span>
                    <span className="text-[10px] font-bold opacity-50 uppercase ml-2 tracking-widest">{t.name} — {t.area}</span>
                  </div>
                  <p className="text-brand-cream/90 italic mb-6 leading-relaxed text-sm">"{t.text}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Location & Contact Section */}
        <section id="contact" className="bg-brand-green py-24 text-brand-cream">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div {...fadeIn}>
                <h2 className="text-5xl font-display font-black uppercase mb-8 tracking-tighter text-brand-gold">Reach The Craftsmen</h2>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1">Our Location</h4>
                      <p className="text-lg">Shop 12, Klipgat Centre, Corner Nelson Mandela & Pres. Mbeki Drive, Rustenburg</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1">Call / WhatsApp</h4>
                      <p className="text-lg font-bold">+27 81 821 4395</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-brand-gold p-3 rounded-lg text-brand-brown shrink-0">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-black uppercase text-brand-gold tracking-wide mb-1">Crave Hours</h4>
                      <p className="text-lg">Mon–Sun, 7AM–9PM</p>
                    </div>
                  </div>

                  <div className="p-6 bg-brand-brown/50 border border-brand-gold/20 rounded-xl inline-flex items-center gap-3">
                    <ShoppingBag className="text-brand-gold shrink-0" />
                    <p className="text-sm font-bold uppercase tracking-widest">Delivery only within Rustenburg CBD (5 km radius)</p>
                  </div>
                </div>

                <div className="mt-12 flex gap-4">
                  <a href="#" className="p-3 bg-brand-cream/10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all"><Facebook size={20} /></a>
                  <a href="#" className="p-3 bg-brand-cream/10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-all"><Instagram size={20} /></a>
                  <svg className="w-5 h-5 fill-current opacity-80" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.59-5.71-.29-3.27 2.2-6.43 5.39-7.04.13-.02.26-.03.4-.04v4.06c-.12.02-.24.04-.36.07-.37.08-.74.24-1.06.47-.79.57-1.29 1.53-1.26 2.51.01.62.19 1.25.5 1.78.65 1.07 1.88 1.77 3.13 1.78 1.19.01 2.37-.62 3.03-1.61.34-.51.52-1.12.53-1.74.03-3.08.01-6.17.02-9.25z"/></svg>
                </div>
              </motion.div>

              <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="h-[400px] bg-brand-brown rounded-3xl overflow-hidden shadow-2xl relative border-4 border-brand-gold/10"
              >
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="space-y-4">
                    <MapPin size={48} className="mx-auto text-brand-gold animate-bounce" />
                    <h5 className="font-display font-black text-2xl uppercase italic">Find us on Google Maps</h5>
                    <p className="text-brand-cream/60 max-w-sm mx-auto">Shop 12, Klipgat Centre. Right in the heart of Rustenburg CBD.</p>
                    <a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="inline-block mt-4 text-brand-gold font-bold underline underline-offset-4 uppercase tracking-widest text-sm">Open Map</a>
                  </div>
                </div>
                {/* Background image for map feeling */}
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                  alt="City Map" 
                  className="w-full h-full object-cover opacity-20 filter grayscale"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-charcoal border-t border-brand-cream/5 py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-8">
          <div className="text-center">
            <span className="font-display text-3xl font-black text-brand-gold tracking-tighter uppercase block mb-1">GOODIES HAVEN</span>
            <span className="text-brand-cream font-bold italic opacity-80 uppercase tracking-widest text-xs">"Come Hungry. Leave Happy."</span>
          </div>

          <div className="flex gap-8">
            {navLinks.map(link => (
              <a key={link.name} href={link.href} className="text-brand-cream/50 hover:text-brand-gold transition-colors uppercase font-display text-[11px] font-bold tracking-widest">
                {link.name}
              </a>
            ))}
          </div>

          <p className="text-brand-cream/30 text-[10px] uppercase font-bold tracking-[0.2em] pt-8 border-t border-brand-cream/5 w-full text-center">
            &copy; 2025 Goodies Haven. All Rights Reserved. Rustenburg, South Africa.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a 
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="floating-wa shadow-[#25D366]/20"
      >
        <MessageSquare size={28} />
        <span className="absolute -top-1 -right-1 bg-brand-gold w-4 h-4 rounded-full border-2 border-[#25D366] animate-ping" />
      </motion.a>
    </div>
  );
}
