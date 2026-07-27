import React, { useState } from 'react';
import { PageRoute, ThemeMode, CertificateItem } from '../types';
import { CERTIFICATES_DATA } from '../data/portfolioData';
import { CompanyLogoTicker } from '../components/CompanyLogoTicker';
import {
  Cpu,
  GraduationCap,
  Award,
  Download,
  ShieldCheck,
  ExternalLink,
  ChevronDown,
  CheckCircle2,
  Lock,
  Code2,
  Terminal,
  Zap,
  BookOpen,
  Filter,
  Sparkles,
  Layers,
  FileCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, theme }) => {
  const isDark = theme === 'dark';

  // Skill category filter state
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string>('All');
  const [expandedSkillDropdown, setExpandedSkillDropdown] = useState<string | null>('Python');
  const [certSearchQuery, setCertSearchQuery] = useState<string>('');

  // Skill categories mapped to certificate tags
  const skillCategories = [
    { name: 'All', icon: <Layers className="w-4 h-4" /> },
    { name: 'Python', icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
    { name: 'Cybersecurity', icon: <ShieldCheck className="w-4 h-4 text-pink-400" /> },
    { name: 'Data & Power BI', icon: <Zap className="w-4 h-4 text-amber-400" /> },
    { name: 'Full Stack & Web', icon: <Terminal className="w-4 h-4 text-cyan-400" /> },
    { name: 'AI & Machine Learning', icon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { name: 'Cloud & DevOps', icon: <FileCheck className="w-4 h-4 text-sky-400" /> },
    { name: 'Mobile App Dev', icon: <Phone className="w-4 h-4 text-rose-400" /> },
    { name: 'UX/UI Design', icon: <Sparkles className="w-4 h-4 text-fuchsia-400" /> },
    { name: 'Power & Energy', icon: <Building2 className="w-4 h-4 text-yellow-400" /> },
  ];

  // Filter certificates based on dropdown skill selection or search
  const filteredCertificates = CERTIFICATES_DATA.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(certSearchQuery.toLowerCase()));

    if (selectedSkillFilter === 'All') return matchesSearch;

    const matchesSkill = cert.skills.some((skill) => {
      const s = skill.toLowerCase();
      const filter = selectedSkillFilter.toLowerCase();
      if (filter.includes('python')) return s.includes('python');
      if (filter.includes('cybersecurity')) return s.includes('cybersecurity') || s.includes('security') || s.includes('siem');
      if (filter.includes('data')) return s.includes('data') || s.includes('power bi') || s.includes('sql') || s.includes('tableau');
      if (filter.includes('full stack')) return s.includes('full stack') || s.includes('react') || s.includes('node') || s.includes('django') || s.includes('front-end') || s.includes('back-end');
      if (filter.includes('ai')) return s.includes('ai') || s.includes('machine learning') || s.includes('deep learning') || s.includes('pytorch') || s.includes('llm');
      if (filter.includes('cloud')) return s.includes('devops') || s.includes('docker') || s.includes('kubernetes') || s.includes('cloud') || s.includes('linux');
      if (filter.includes('mobile')) return s.includes('android') || s.includes('ios') || s.includes('mobile') || s.includes('kotlin') || s.includes('swift');
      if (filter.includes('ux/ui')) return s.includes('ux/ui') || s.includes('figma') || s.includes('design') || s.includes('prototyping');
      if (filter.includes('power')) return s.includes('climate') || s.includes('carbon') || s.includes('energy') || s.includes('power');
      return true;
    });

    return matchesSearch && matchesSkill;
  });

  return (
    <div className="space-y-12 pb-20 text-slate-100">
      {/* Moving Company Logo Ticker Banner */}
      <section>
        <CompanyLogoTicker theme={theme} />
      </section>

      {/* CV Professional Header / Hero Card */}
      <section
        className={`relative p-8 md:p-12 rounded-3xl border backdrop-blur-2xl overflow-hidden transition-all ${
          isDark
            ? 'bg-purple-950/30 border-pink-500/30 shadow-[0_0_50px_rgba(255,42,133,0.12)]'
            : 'bg-white/90 border-pink-200 text-slate-900 shadow-xl'
        }`}
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-pink-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* NON-VIEWABLE / NON-DOWNLOADABLE PROFILE PICTURE */}
          <div className="relative flex-shrink-0 group">
            {/* Pulsing Neon Halo */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-75 blur-md group-hover:opacity-100 transition-opacity animate-pulse" />

            {/* Profile Avatar Container */}
            <div
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-pink-500/60 bg-slate-900 flex items-center justify-center select-none cursor-not-allowed shadow-2xl"
              style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            >
              {/* Demo Image Placeholder */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                alt="Ayman Ullah Profile"
                className="w-full h-full object-cover filter brightness-95 contrast-105 pointer-events-none select-none"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Transparent Protection Overlay */}
              <div
                onContextMenu={(e) => e.preventDefault()}
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 flex flex-col items-center justify-end pb-3 text-center pointer-events-auto"
              >
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-500/80 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-pink-300/40 shadow-lg">
                  <Lock className="w-3 h-3 text-white" />
                  <span>PROTECTED AVATAR</span>
                </div>
              </div>
            </div>

            {/* Security Badge Note */}
            <div className="mt-2 text-center">
              <span className="text-[10px] font-mono text-pink-400 bg-pink-950/50 px-2 py-0.5 rounded border border-pink-500/20">
                🔒 Protected View (Demo Pic)
              </span>
            </div>
          </div>

          {/* Professional CV Info Header */}
          <div className="space-y-4 text-center lg:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 font-mono text-xs font-bold">
              <Cpu className="w-4 h-4 text-pink-400" />
              <span>ELECTRICAL & ELECTRONIC ENGINEER (OBE SYLLABUS)</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                AYMAN ULLAH
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-2xl">
              Research-focused Electrical & Electronic Engineer specializing in Power Electronics, Embedded Systems, FPGA Microchip Architecture, and Smart Grid Automation. Backed by a strong Polytechnic Diploma background and 22+ professional industry certifications from Microsoft, Google, IBM, Meta, and the University of Edinburgh.
            </p>

            {/* Quick Contact & Degree Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-pink-500/30 text-pink-300">
                <GraduationCap className="w-4 h-4 text-pink-400" />
                <span>B.Sc. EEE (Southern University Bangladesh)</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-purple-500/30 text-purple-300">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>Polytechnic Diploma in Eng. (BTEB)</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-300">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Chattogram, Bangladesh</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  alert('Downloading Curriculum Vitae: Ayman_Ullah_EEE_Official_CV.pdf');
                }}
                className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white transition-all shadow-[0_0_25px_rgba(255,42,133,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official CV (PDF)</span>
              </button>

              <button
                onClick={() => onNavigate('social')}
                className="px-6 py-3 rounded-xl font-mono text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-pink-500/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-pink-400" />
                <span>Social Links & Contact Card →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATIONAL BACKGROUND SECTION */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-3">
          <GraduationCap className="w-6 h-6 text-pink-400" />
          <span>Academic & Educational Background</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* B.Sc in EEE Card */}
          <div
            className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
              isDark ? 'bg-slate-900/80 border-pink-500/30' : 'bg-white border-pink-200 shadow-md'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-pink-500/20 border border-pink-400/30 text-pink-300">
                  UNDERGRADUATE DEGREE
                </span>
                <h3 className="text-xl font-bold text-white mt-2">B.Sc. in Electrical & Electronic Engineering</h3>
                <p className="text-xs font-mono text-pink-400 font-semibold mt-1">
                  Southern University Bangladesh (SUB)
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                2022 - Present
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Pursuing 161 Credit Hours under the Outcome Based Education (OBE) Curriculum. Specialized in Power Systems, High-Voltage Dielectrics, VLSI Design, DSP, Microprocessors, Control Systems, and Renewable Solar/Wind Energy.
            </p>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <p>• Coursework Highlights: Power Electronics, 8086 Assembly, FPGA Verilog, Control Systems, Optical Fiber WDM, Biomedical Instrumentation.</p>
              <p>• Accreditation: UGC & Bangladesh Accreditation Council (BAC) Compliant.</p>
            </div>
          </div>

          {/* Polytechnic Diploma Card */}
          <div
            className={`p-6 rounded-3xl border backdrop-blur-xl space-y-4 ${
              isDark ? 'bg-slate-900/80 border-purple-500/30' : 'bg-white border-purple-200 shadow-md'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/20 border border-purple-400/30 text-purple-300">
                  DIPLOMA IN ENGINEERING
                </span>
                <h3 className="text-xl font-bold text-white mt-2">Diploma in Engineering (Polytechnic Background)</h3>
                <p className="text-xs font-mono text-purple-400 font-semibold mt-1">
                  Bangladesh Technical Education Board (BTEB)
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                Completed
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Hands-on practical engineering foundation in electrical circuits, PCB assembly, motor maintenance, and electronic hardware troubleshooting. Granted 13.5 Credit Waiver for General Education (GED) courses in the B.Sc. program.
            </p>

            <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400 space-y-1">
              <p>• ICT Olympiad Bangladesh 2022 Participant (Polytechnic Selection Round).</p>
              <p>• Practical Lab Mastery: Circuit Analysis, Transformers, AC/DC Machinery & Industrial Wiring.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL BREAKDOWN WITH CERTIFICATE FILTER DROPDOWN */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-mono text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-pink-400" />
              <span>Skills & Certificate Mapping</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Select any skill below to filter verified online certificates from Google, Microsoft, IBM & Meta
            </p>
          </div>

          {/* Search Certificate Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by skill or title..."
              value={certSearchQuery}
              onChange={(e) => setCertSearchQuery(e.target.value)}
              className="px-4 py-2 pl-9 rounded-xl bg-slate-900 border border-pink-500/30 text-xs font-mono text-slate-200 focus:outline-none focus:border-pink-500 w-64"
            />
            <Filter className="w-4 h-4 text-pink-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Skill Category Buttons */}
        <div className="flex flex-wrap gap-2">
          {skillCategories.map((sc) => (
            <button
              key={sc.name}
              onClick={() => {
                setSelectedSkillFilter(sc.name);
                setExpandedSkillDropdown(sc.name === selectedSkillFilter ? null : sc.name);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                selectedSkillFilter === sc.name
                  ? 'bg-pink-500 text-slate-950 shadow-[0_0_15px_rgba(255,42,133,0.5)] border border-pink-300'
                  : isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sc.icon}
              <span>{sc.name}</span>
            </button>
          ))}
        </div>

        {/* Active Skill Dropdown Certification Counter */}
        <div className="p-4 rounded-2xl bg-pink-950/20 border border-pink-500/30 flex items-center justify-between text-xs font-mono">
          <span className="text-pink-300 font-bold flex items-center gap-2">
            <Award className="w-4 h-4 text-pink-400" />
            Showing {filteredCertificates.length} Verified Certificates for Category: [{selectedSkillFilter}]
          </span>
          {selectedSkillFilter !== 'All' && (
            <button
              onClick={() => setSelectedSkillFilter('All')}
              className="text-cyan-400 underline hover:text-cyan-300 cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* VERIFIED CERTIFICATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className={`p-6 rounded-2xl border transition-all hover:scale-[1.01] flex flex-col justify-between space-y-4 ${
                isDark
                  ? 'bg-slate-900/90 border-slate-800 hover:border-pink-500/50 shadow-lg'
                  : 'bg-white border-slate-200 hover:border-pink-300 shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    {cert.issuer}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{cert.issueDate}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{cert.title}</h3>

                {cert.coursesCount && (
                  <p className="text-[11px] font-mono text-cyan-400">
                    • Professional Specialization ({cert.coursesCount} Comprehensive Courses)
                  </p>
                )}

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Verification Link Button */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Credential Verified</span>
                </span>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-pink-500/20 hover:bg-pink-500 text-pink-300 hover:text-slate-950 border border-pink-500/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Verify Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLETE CV SUMMARY SECTION */}
      <section className="p-8 rounded-3xl bg-slate-900/90 border border-purple-500/30 space-y-6 font-mono">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-400" />
          <span>EEE Curriculum & Technical Profile Overview</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-pink-400 font-bold">Total EEE Credits</span>
            <p className="text-2xl font-black text-white">161 Cr</p>
            <p className="text-[10px] text-slate-400 font-sans">(147.5 Cr for Diploma Waiver)</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold">Online Certifications</span>
            <p className="text-2xl font-black text-white">22+ Certs</p>
            <p className="text-[10px] text-slate-400 font-sans">Google, MS, IBM, Meta, Edinburgh</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold">OBE Projects Built</span>
            <p className="text-2xl font-black text-white">10+ Prototypes</p>
            <p className="text-[10px] text-slate-400 font-sans">Inverters, FPGA, Relays, ECG, Robotics</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-amber-400 font-bold">Technical Publications</span>
            <p className="text-2xl font-black text-white">12 Blogs</p>
            <p className="text-[10px] text-slate-400 font-sans">Syllabus-aligned IEEE format</p>
          </div>
        </div>
      </section>
    </div>
  );
};
