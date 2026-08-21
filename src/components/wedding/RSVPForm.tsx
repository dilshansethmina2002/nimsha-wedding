// src/components/RSVPForm.tsx
import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaCalendarAlt } from 'react-icons/fa'; // Added Calendar Icon
import { useWedding } from "@/lib/wedding-context"; 
import { Ornament } from './Decorations';
import { LotusDivider } from './Ornaments';

interface FormData {
  name: string;
  attendance: string;
  guests: string;
  message: string;
}

export default function RSVPForm() {
  const { lang } = useWedding();
  const isEn = lang === "en"; 

  const [formData, setFormData] = useState<FormData>({
    name: '',
    attendance: 'Yes', // Default to Yes
    guests: '1',
    message: ''
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get('name');
      const urlTitle = params.get('title');

      if (urlName) {
        const fullName = urlTitle && urlTitle !== 'Family' 
          ? `${urlTitle} ${urlName}` 
          : urlName;

        setFormData(prevData => ({
          ...prevData,
          name: fullName
        }));
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Custom Radio Button Handle
  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, attendance: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([
          { 
            name: formData.name, 
            attendance: formData.attendance, 
            guests: parseInt(formData.guests) || 1, 
            message: formData.message 
          }
        ]);

      if (error) throw error;
      
      toast.success(isEn ? 'Thank you for confirming your presence!' : 'ඔබගේ පැමිණීම තහවුරු කළා! ස්තූතියි!', {
        style: { borderRadius: '10px', background: '#333', color: '#fff' }
      });
      
      setFormData({ name: '', attendance: 'Yes', guests: '1', message: '' });
      window.history.replaceState({}, document.title, window.location.pathname);
      
    } catch (error: any) {
      toast.error(isEn ? 'Failed to send RSVP. Please try again.' : 'පණිවිඩය යැවීමට නොහැකි විය. නැවත උත්සාහ කරන්න.');
      console.error("Error inserting data: ", error.message);
    }
    
    setLoading(false);
  };

  return (
    <section className="relative lg:py-24 bg-gradient-soft font-sans overflow-hidden" id="rsvp">
      
      {/* Background Theme Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 z-0">
        <div className="absolute top-[10%] left-[-5%] w-[40rem] h-[40rem] border-[1px] border-primary/30 rounded-full" />
      </div>

      <div className="container max-w-2xl relative mx-auto px-4 pb-16 pt-16 md:pb-0 md:pt-0 z-10">
        
        <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-rose-200/30 via-primary/5 to-amber-200/30 rounded-[2.5rem] blur-2xl opacity-70 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-card bg-white/90 dark:bg-card/95 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 overflow-hidden border border-rose-200/60 dark:border-amber-900/30 shadow-elegant"
        >
          {/* Theme Lotus Corners */}
          <LotusCorner className="absolute top-2 left-2 w-12 text-primary/20 pointer-events-none" />
          <LotusCorner className="absolute top-2 right-2 w-12 text-primary/20 scale-x-[-1] pointer-events-none" />
          <LotusCorner className="absolute bottom-2 left-2 w-12 text-primary/20 scale-y-[-1] pointer-events-none" />
          <LotusCorner className="absolute bottom-2 right-2 w-12 text-primary/20 scale-x-[-1] scale-y-[-1] pointer-events-none" />
          
          <div className="text-center mb-6 relative z-10">
            <h2 className="py-2 text-5xl md:text-6xl text-gold-gradient mb-2 font-semibold font-script drop-shadow-sm">
              RSVP
            </h2>
            <div className="flex justify-center mt-3">
              <LotusDivider width="w-20 sm:w-28" />
            </div>
            <Ornament className="text-primary w-40 md:w-56 mx-auto mt-4 mb-4 opacity-80" />
            <p className={`text-foreground/80 text-xs md:text-sm uppercase tracking-widest ${!isEn ? "font-sinhala font-semibold" : "font-display"}`}>
              {isEn ? "Please confirm your presence at our wedding" : "අපගේ විවාහ මංගල්‍යයට ඔබගේ පැමිණීම තහවුරු කරන්න"}
            </p>
          </div>

          {/* --- FRIENDLY DEADLINE WARNING BANNER --- */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            // CHANGED: Replaced amber with rose/red for a more reddish elegant tint
            className="mb-8 mx-auto max-w-sm p-4 rounded-2xl bg-gradient-to-r from-rose-100/90 via-red-50/80 to-rose-100/90 dark:from-rose-950/40 dark:via-red-950/30 dark:to-rose-950/40 border border-rose-300/80 dark:border-rose-800/50 shadow-sm flex items-start sm:items-center gap-4 relative z-10"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white dark:bg-black/40 flex items-center justify-center border border-rose-200/60 shadow-sm mt-1 sm:mt-0">
              {/* CHANGED: Made the calendar icon red to match the new background */}
              <FaCalendarAlt className="text-rose-600 dark:text-rose-400 w-4 h-4 animate-pulse" />
            </div>
            <p className={`text-left text-[#5a4e40] dark:text-stone-300 ${isEn ? "font-serif text-[20px] leading-snug" : "font-sinhala text-[13px] leading-relaxed font-medium"}`}>
              {isEn ? (
                <>
                  To help us finalize our preparations, kindly respond by <strong className="font-bold text-rose-700 dark:text-rose-400">September 24th</strong>.
                </>
              ) : (
                <>
                  අපගේ ඉදිරි කටයුතු පහසු කිරීම සඳහා, කරුණාකර ඔබගේ පැමිණීම <strong className="font-bold text-rose-700 dark:text-rose-400">සැප්තැම්බර් 24</strong> ට පෙර තහවුරු කරන්න.
                </>
              )}
            </p>
          </motion.div>
          {/* ---------------------------------------- */}
          
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            
            {/* Name Input */}
            <div>
              <label className={`block text-[11px] md:text-xs font-semibold text-primary-deep uppercase tracking-[0.2em] mb-2 ${!isEn ? "font-sinhala tracking-widest" : "font-display"}`}>
                {isEn ? "Your Name" : "ඔබගේ නම"}
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                placeholder={isEn ? "Enter your name" : "ඔබගේ නම ඇතුළත් කරන්න"}
                className={`w-full px-5 py-4 bg-rose-50/50 dark:bg-black/20 border border-primary/20 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all shadow-sm placeholder:text-foreground/40 text-foreground/90 font-medium ${!isEn && formData.name === '' ? "font-sinhala text-sm" : ""}`} 
              />
            </div>

            {/* Will You Attend - Custom Radio Buttons */}
            <div>
              <label className={`block text-[11px] md:text-xs font-semibold text-primary-deep uppercase tracking-[0.2em] mb-3 ${!isEn ? "font-sinhala tracking-widest" : "font-display"}`}>
                {isEn ? "Will you attend?" : "සහභාගී වෙනවද?"}
              </label>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                
                {/* YES Option */}
                <button
                  type="button"
                  onClick={() => handleRadioChange('Yes')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-2 rounded-xl border transition-all duration-300 ${
                    formData.attendance === 'Yes'
                      ? 'bg-gold-gradient text-white border-transparent shadow-md'
                      : 'bg-rose-50/30 dark:bg-black/20 border-primary/20 text-foreground/70 hover:border-primary/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${formData.attendance === 'Yes' ? 'border-white' : 'border-primary/40'}`}>
                    {formData.attendance === 'Yes' && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className={`text-[13px] md:text-sm ${!isEn ? "font-sinhala font-bold" : "font-semibold"}`}>
                    {isEn ? "Yes" : "ඔව්"}
                  </span>
                </button>

                {/* NO Option */}
                <button
                  type="button"
                  onClick={() => handleRadioChange('No')}
                  className={`flex items-center justify-center gap-2.5 py-3 px-2 rounded-xl border transition-all duration-300 ${
                    formData.attendance === 'No'
                      ? 'bg-rose-100 dark:bg-white/10 text-primary-deep border-primary/40 shadow-inner'
                      : 'bg-rose-50/30 dark:bg-black/20 border-primary/20 text-foreground/70 hover:border-primary/50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${formData.attendance === 'No' ? 'border-primary-deep' : 'border-primary/40'}`}>
                    {formData.attendance === 'No' && <div className="w-2 h-2 bg-primary-deep rounded-full" />}
                  </div>
                  <span className={`text-[13px] md:text-sm ${!isEn ? "font-sinhala font-bold" : "font-semibold"}`}>
                    {isEn ? "No" : "නැහැ"}
                  </span>
                </button>

              </div>
            </div>

            {/* Guests Input */}
            {formData.attendance === 'Yes' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <label className={`block text-[11px] md:text-xs font-semibold text-primary-deep uppercase tracking-[0.2em] mb-2 ${!isEn ? "font-sinhala tracking-widest" : "font-display"}`}>
                  {isEn ? "Number of Guests" : "සහභාගී වන ගණන"}
                </label>
                <input 
                  type="number" 
                  name="guests" 
                  min="1" 
                  max="20" 
                  value={formData.guests} 
                  onChange={handleChange} 
                  required={formData.attendance === 'Yes'}
                  className="w-full px-5 py-4 bg-rose-50/50 dark:bg-black/20 border border-primary/20 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all shadow-sm text-foreground/90 font-medium" 
                />
              </motion.div>
            )}

            {/* Wishes Input */}
            <div>
              <label className={`block text-[11px] md:text-xs font-semibold text-primary-deep uppercase tracking-[0.2em] mb-2 ${!isEn ? "font-sinhala tracking-widest" : "font-display"}`}>
                {isEn ? "Wishes (Optional)" : "සුබ පැතුම් (Optional)"}
              </label>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                rows={3}
                placeholder={isEn ? "Your wishes or message..." : "ඔබගේ සුබ පැතුම් හෝ පණිවිඩය..."}
                className={`w-full px-5 py-4 bg-rose-50/50 dark:bg-black/20 border border-primary/20 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary outline-none transition-all shadow-sm placeholder:text-foreground/40 text-foreground/90 font-medium resize-none ${!isEn && formData.message === '' ? "font-sinhala text-sm" : ""}`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4 text-center">
              <button 
                type="submit" 
                disabled={loading}
                className={`inline-flex items-center justify-center gap-2 px-12 py-4 rounded-full bg-gold-gradient text-white shadow-elegant hover:shadow-glow transition-all hover:-translate-y-1 w-full md:w-auto disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed uppercase tracking-[0.2em] ${!isEn ? "font-sinhala font-bold text-sm" : "font-display text-[10px] md:text-xs"}`}
              >
                {loading 
                  ? (isEn ? 'Processing...' : 'සැකසෙමින් පවතී...') 
                  : (isEn ? 'Confirm RSVP' : 'තහවුරු කරන්න')}
              </button>
            </div>
            
          </form>

        </motion.div>
      </div>
    </section>
  );
}

// Small Lotus Corner SVG
const LotusCorner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
    <path d="M5 5 Q 30 15 45 45 Q 60 75 95 95" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
    <path d="M5 5 Q 10 30 45 45" />
    <path d="M25 25 Q 35 30 45 45" />
  </svg>
);