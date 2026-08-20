import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaLink, FaUserEdit, FaRegIdBadge, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";

export const InviteGenerator = () => {
  const [guestName, setGuestName] = useState("");
  const [title, setTitle] = useState("Mr. & Mrs.");
  const [generatedLink, setGeneratedLink] = useState("");
  const [error, setError] = useState("");

  const titles = ["Mr.", "Mrs.", "Miss.", "Mr. & Mrs.", "Family"];

  // Real-time preview hadaganna
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : "";
  const inviteLink = `${baseUrl}/?name=${encodeURIComponent(guestName)}&title=${encodeURIComponent(title)}`;
  
  // WhatsApp Message Template (Cleanly formatted without extra spaces)
  const messageTemplate = `Hello ${title} ${guestName},\n\nWe warmly invite you to celebrate our wedding with us! ✨💍\n\nPlease click the link below to view your invitation:\n\n${inviteLink}`;

  const handleWhatsAppShare = () => {
    if (!guestName.trim()) {
      setError("Please enter a guest name first!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(messageTemplate)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyLink = () => {
    if (!guestName.trim()) {
      setError("Please enter a guest name first!");
      setTimeout(() => setError(""), 3000);
      return;
    }
    navigator.clipboard.writeText(inviteLink);
    setGeneratedLink(inviteLink);
    setTimeout(() => setGeneratedLink(""), 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 md:p-8 font-sans">
      
      {/* Background decoration blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-gradient rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl w-full max-w-lg border border-white"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary-deep font-serif mb-2">
            Invite Generator
          </h2>
          <p className="text-gray-500 text-sm">Create and share personalized wedding invitations</p>
        </div>

        <div className="space-y-6">
          {/* Title Selector */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaRegIdBadge className="text-primary" /> Title
            </label>
            <div className="relative">
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3.5 pl-4 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all cursor-pointer appearance-none shadow-sm"
              >
                {titles.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Guest Name Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FaUserEdit className="text-primary" /> Guest Name
            </label>
            <input
              type="text"
              placeholder="e.g., Dilshan / Perera Family"
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setError(""); // Clear error when typing
              }}
              className={`w-full p-3.5 bg-white/50 border ${error ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-primary/50 focus:border-primary'} rounded-xl focus:ring-2 outline-none transition-all shadow-sm placeholder:text-gray-400`}
            />
            {error && <p className="text-red-500 text-xs mt-2 ml-1 animate-pulse">{error}</p>}
          </div>

          {/* Message Preview Box */}
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/10">
            <label className="flex items-center gap-2 text-xs font-semibold text-primary-deep uppercase tracking-wider mb-3">
              <FaEye /> Message Preview
            </label>
            <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed font-mono bg-white/50 p-3 rounded-lg border border-white">
              {guestName.trim() ? messageTemplate : <span className="text-gray-400 italic">Type a name to see the preview...</span>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleWhatsAppShare}
              className="group relative w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#25D366] to-[#1ebd5a] text-white py-4 px-4 rounded-xl font-semibold transition-all shadow-[0_8px_20px_-6px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <FaWhatsapp className="text-xl relative z-10" />
              <span className="relative z-10 tracking-wide">Share via WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 py-3.5 px-4 rounded-xl font-medium transition-all border border-gray-200 shadow-sm hover:shadow-md active:bg-gray-100"
            >
              <FaLink className={generatedLink ? "text-primary" : "text-gray-400"} />
              {generatedLink ? "Link Copied to Clipboard!" : "Copy Link Only"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};