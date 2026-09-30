// src/components/ClassicView.tsx
"use client";

import { portfolioData } from "@/data/portfolio";
import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Code2,
  FolderGit2,
  User,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  ChevronRight,
} from "lucide-react";

export default function ClassicView() {
  const { lobby, about, projects, history, footer } = portfolioData;
  const [activeTab, setActiveTab] = useState<"all" | "experience" | "education" | "certification">("all");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-[#0a0a0c] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background Decorative Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-[-10%] w-[450px] h-[450px] bg-orange-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-12 md:px-10 lg:py-20 space-y-24">
        
        {/* ================= HERO / LOBBY SECTION ================= */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative pt-6 md:pt-10"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Available for New Projects & Collaborations
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div variants={itemVariants} className="lg:col-span-8 space-y-6">
              <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                {lobby.title.split(",")[0]}
                <span className="block mt-2 bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
                  {lobby.title.split(",")[1] || "Welcome to my portfolio"}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed font-light">
                {lobby.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-950 transition-all hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 active:scale-95"
                >
                  <FolderGit2 size={18} />
                  Explore Projects
                </a>
                <a
                  href={`mailto:${about.details.Email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-700 hover:scale-105 active:scale-95"
                >
                  <Mail size={18} />
                  Get in Touch
                </a>
              </div>
            </motion.div>

            {/* Profile Frame */}
            <motion.div variants={itemVariants} className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-30 blur transition duration-500 group-hover:opacity-75"></div>
                <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-2 w-56 sm:w-64 aspect-[4/5] shadow-2xl">
                  {/* eslint-disable-next-html-element-suppression */}
                  <img
                    src={lobby.images.profile}
                    alt={about.details.Name}
                    className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback visual if profile image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent flex items-end p-4">
                    <div>
                      <p className="font-bold text-white text-base">{about.details.Name}</p>
                      <p className="text-xs text-amber-400 font-medium">Web Developer & Programmer</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= ABOUT ME & SKILLS SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <User size={22} />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{about.title}</h2>
              <p className="text-xs sm:text-sm text-zinc-400">Personal information & tech stack overview</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Card: Personal Details */}
            <motion.div variants={itemVariants} className="md:col-span-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md space-y-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Sparkles size={16} /> Personal Info
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3 text-zinc-300">
                  <User size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-zinc-500 block">Full Name</span>
                    <span className="font-medium text-white">{about.details.Name}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Calendar size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-zinc-500 block">Date of Birth</span>
                    <span className="font-medium text-white">{about.details.BirthDay}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <MapPin size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-zinc-500 block">Location</span>
                    <span className="font-medium text-white">{about.details.City}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-zinc-300">
                  <Mail size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="overflow-hidden">
                    <span className="text-xs text-zinc-500 block">Email Address</span>
                    <a href={`mailto:${about.details.Email}`} className="font-medium text-white hover:text-amber-400 transition-colors truncate block">
                      {about.details.Email}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Tech Stack & Skills */}
            <motion.div variants={itemVariants} className="md:col-span-7 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Code2 size={16} /> Tech Stack & Tools
              </h3>

              <div className="space-y-5">
                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2 uppercase tracking-wide">Programming Languages</span>
                  <div className="flex flex-wrap gap-2">
                    {about.details.LanguageProgram.split(",").map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-xs font-medium text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2 uppercase tracking-wide">Frameworks</span>
                  <div className="flex flex-wrap gap-2">
                    {about.details.Framework.split(",").map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-all">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-zinc-400 block mb-2 uppercase tracking-wide">Libraries & Utilities</span>
                  <div className="flex flex-wrap gap-2">
                    {about.details.Library.split(",").map((item, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-xs font-medium text-zinc-200 hover:border-amber-500/40 hover:text-white transition-all">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ================= PROJECTS SECTION ================= */}
        <motion.section 
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8 scroll-mt-12"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FolderGit2 size={22} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
                <p className="text-xs sm:text-sm text-zinc-400">Showcase of web applications and commercial platforms</p>
              </div>
            </div>
            <span className="text-xs text-zinc-500 font-mono">{projects.length} Published Projects</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((proj) => (
              <motion.div
                key={proj.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 backdrop-blur-md transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5"
              >
                <div className="space-y-4">
                  {/* Project Image Banner */}
                  <div className="relative h-44 w-full overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800/60">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Styled SVG fallback container if image is missing
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-zinc-950/80 backdrop-blur-md px-3 py-1 border border-zinc-800 text-[11px] font-medium text-amber-400 flex items-center gap-1.5">
                      <Calendar size={12} />
                      {proj.publishDate}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed font-light line-clamp-3">
                      {proj.description}
                    </p>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">Live Demo</span>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    Visit Project <ArrowUpRight size={15} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ================= RESUME / TIMELINE SECTION ================= */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Briefcase size={22} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Career & Background</h2>
                <p className="text-xs sm:text-sm text-zinc-400">Professional experience, education & achievements</p>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs">
              {(["all", "experience", "education", "certification"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                    activeTab === tab
                      ? "bg-amber-500 text-zinc-950 font-semibold shadow-sm"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* WORK EXPERIENCE */}
            {(activeTab === "all" || activeTab === "experience") && (
              <motion.div variants={itemVariants} className={`space-y-6 ${activeTab === "all" ? "lg:col-span-6" : "lg:col-span-12"}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  <Briefcase size={16} /> Work Experience
                </div>

                <div className="space-y-6 relative border-l-2 border-zinc-800 ml-3 pl-6">
                  {history.experience.map((exp, i) => (
                    <div key={i} className="relative group">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-zinc-950 group-hover:scale-125 transition-transform" />
                      
                      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-md space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-bold text-white text-base">{exp.role}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
                            {exp.date}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-zinc-300 flex items-center gap-1.5">
                          <Layers size={14} className="text-amber-400" />
                          {exp.company}
                        </p>
                        <ul className="space-y-2 pt-2 border-t border-zinc-800/60 text-xs sm:text-sm text-zinc-400">
                          {exp.points.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 size={15} className="text-amber-500 shrink-0 mt-0.5" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* EDUCATION */}
            {(activeTab === "all" || activeTab === "education") && (
              <motion.div variants={itemVariants} className={`space-y-6 ${activeTab === "all" ? "lg:col-span-6" : "lg:col-span-12"}`}>
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  <GraduationCap size={16} /> Education
                </div>

                <div className="space-y-6 relative border-l-2 border-zinc-800 ml-3 pl-6">
                  {history.education.map((edu, i) => (
                    <div key={i} className="relative group">
                      <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-amber-500 bg-zinc-950 group-hover:scale-125 transition-transform" />
                      
                      <div className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-md space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-mono">
                            {edu.year}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CERTIFICATIONS */}
            {(activeTab === "all" || activeTab === "certification") && (
              <motion.div variants={itemVariants} className="lg:col-span-12 space-y-6 pt-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-400 uppercase tracking-wider">
                  <Award size={16} /> Certifications
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.certification.map((cert, i) => (
                    <div key={i} className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-5 backdrop-blur-md space-y-2 hover:border-amber-500/40 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-white text-base leading-snug">{cert.title}</h4>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono shrink-0">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400">{cert.issuer}</p>
                      {cert.id && (
                        <p className="text-[11px] font-mono text-zinc-500 pt-1 border-t border-zinc-800/60">
                          ID: {cert.id}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </div>
        </motion.section>

        {/* ================= FOOTER SECTION ================= */}
        <footer className="pt-16 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>{footer.copyright} • Built with Next.js & React</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${footer.contact}`} className="hover:text-amber-400 transition-colors">
              {footer.contact}
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              Back to top ↑
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}