/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Linkedin, MessageCircle, Zap, Users, FolderDot, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Sub-komponen Card ---
function Card({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-white/[0.03] border border-white/10 rounded-2xl p-4 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

export default function DevIdentity() {
  const [stats, setStats] = useState({ 
    repos: 0, 
    followers: 0, 
    name: "", 
    avatar: "" 
  });
  const [loading, setLoading] = useState(true);

  // KONFIGURASI KAMU
  const GITHUB_USERNAME = 'rendimusahikin27'; // Masukkan username GitHub
  const WHATSAPP_NUMBER = '6287878547469'; // Masukkan nomor WA format 62...

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const data = await res.json();
        setStats({
          repos: data.public_repos || 0,
          followers: data.followers || 0,
          name: data.name || data.login,
          avatar: data.avatar_url
        });
      } catch (error) {
        console.error("Gagal mengambil data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHubStats();
  }, [GITHUB_USERNAME]);

  const handleCelebration = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#a855f7', '#ffffff']
    });
  };

  const handleWhatsApp = () => {
    handleCelebration();
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=Halo%20${stats.name}!%20Saya%20tertarik%20bekerja%20sama%20dengan%20Anda.`;
    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-hero-glow">
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-[400px] w-full space-y-6"
        >
          
          {/* PROFILE SECTION */}
          <section className="text-center space-y-3">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCelebration}
              className="w-24 h-24 rounded-[32px] mx-auto mb-6 flex items-center justify-center shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] cursor-pointer relative group overflow-hidden border-2 border-white/10"
            >
              {stats.avatar ? (
                <Image 
                  src={stats.avatar} 
                  alt="Profile" 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-slate-800 animate-pulse" />
              )}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black uppercase tracking-tighter">
                {loading ? "Loading..." : stats.name}
              </h1>
              <p className="text-slate-400 text-xs font-bold tracking-[0.2em] uppercase italic">
                Fullstack Developer
              </p>
            </div>
          </section>

          {/* GITHUB LIVE STATS */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="flex flex-col items-center justify-center py-5 hover:bg-white/[0.06]">
              <FolderDot size={18} className="text-blue-400 mb-2" />
              <span className="text-xl font-black tabular-nums">
                {loading ? "--" : stats.repos}
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Repositories</span>
            </Card>
            <Card className="flex flex-col items-center justify-center py-5 hover:bg-white/[0.06]">
              <Users size={18} className="text-purple-400 mb-2" />
              <span className="text-xl font-black tabular-nums">
                {loading ? "--" : stats.followers}
              </span>
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black">Followers</span>
            </Card>
          </div>

          {/* SOCIAL LINKS */}
          <nav className="grid gap-3">
            <LinkItem 
              icon={<Github size={20} />} 
              label="GitHub Portfolio" 
              href={`https://github.com/${GITHUB_USERNAME}`} 
            />
            <LinkItem 
              icon={<Linkedin size={20} />} 
              label="Connect LinkedIn" 
              href={`https://www.linkedin.com/in/${GITHUB_USERNAME}`}
              color="group-hover:text-blue-400" 
            />
            
            {/* WHATSAPP TRIGGER */}
            <button onClick={handleWhatsApp} className="w-full text-left outline-none group">
              <Card className="flex items-center justify-between gap-4 cursor-pointer group-hover:bg-white/[0.08] group-hover:border-green-500/30 active:scale-[0.98]">
                <div className="flex items-center gap-4">
                  <div className="text-slate-400 group-hover:text-green-400 transition-colors">
                    <MessageCircle size={20} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">Hire me on WhatsApp</span>
                </div>
                <Sparkles size={14} className="text-slate-700 group-hover:text-yellow-400 transition-colors" />
              </Card>
            </button>
          </nav>

          {/* FOOTER BADGE */}
          <footer className="pt-4 flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/10 px-4 py-1.5 rounded-full">
              <Zap size={12} className="text-blue-500 fill-blue-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500/80">Available for Work</span>
            </div>
            <p className="text-[9px] text-slate-700 font-bold uppercase tracking-[0.5em]">Built with Next.js 15 & Tailwind v4</p>
          </footer>

        </motion.div>
      </AnimatePresence>
    </main>
  );
}

function LinkItem({ icon, label, href, color = "group-hover:text-white" }: any) {
  return (
    <a href={href} target="_blank" className="block outline-none">
      <Card className="flex items-center justify-between gap-4 cursor-pointer group hover:bg-white/[0.08] active:scale-[0.98]">
        <div className="flex items-center gap-4">
          <div className={`text-slate-400 transition-colors ${color}`}>
            {icon}
          </div>
          <span className="text-sm font-bold tracking-tight">{label}</span>
        </div>
        <ExternalLink size={14} className="text-slate-800 group-hover:text-slate-400 transition-colors" />
      </Card>
    </a>
  );
}