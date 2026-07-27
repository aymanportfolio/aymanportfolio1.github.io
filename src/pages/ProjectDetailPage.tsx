import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { PageRoute, ThemeMode, CommentItem } from '../types';
import { ThreeModelViewer } from '../components/ThreeModelViewer';
import { ReCaptchaWidget } from '../components/ReCaptchaWidget';
import {
  ArrowLeft,
  Cpu,
  Download,
  Copy,
  Check,
  Share2,
  MessageSquare,
  BookOpen,
  Calendar,
  Send,
  ShieldCheck,
} from 'lucide-react';

interface ProjectDetailPageProps {
  projectId: string;
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onNavigate,
  theme,
}) => {
  const project = PROJECTS_DATA.find((p) => p.id === projectId) || PROJECTS_DATA[0];

  const [copiedCitation, setCopiedCitation] = useState(false);
  const [commentsList, setCommentsList] = useState<CommentItem[]>(project.comments || []);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [commentError, setCommentError] = useState('');

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(project.apaCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) {
      setCommentError('Name and comment text are required.');
      return;
    }

    if (!captchaVerified) {
      setCommentError('Please complete the reCAPTCHA verification challenge.');
      return;
    }

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: newCommentName.trim(),
      date: new Date().toISOString().split('T')[0],
      content: newCommentText.trim(),
    };

    setCommentsList([newComment, ...commentsList]);
    setNewCommentName('');
    setNewCommentText('');
    setCaptchaVerified(false);
    setCommentError('');
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('projects')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects Showcase
      </button>

      {/* Main Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl space-y-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold">
            {project.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-400" /> {project.date}
          </span>
          <span className="text-slate-400">By AYMAN ULLAH</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{project.title}</h1>
        <p className="text-base text-slate-300 font-sans leading-relaxed">{project.shortDesc}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((t, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive 3D Orbit Viewer Component */}
      <section className="space-y-3">
        <ThreeModelViewer modelType={project.model3DType} title={project.title} />
      </section>

      {/* Specifications & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Full Text Description */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 font-sans text-sm text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold font-mono text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" /> Technical Design Overview
          </h2>

          {project.fullDesc.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}

          {/* Download Technical Schematics */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-mono font-bold text-cyan-300">Technical CAD / Schematic Files</p>
              <p className="text-[11px] text-slate-400 font-mono">{project.schematicFile}</p>
            </div>

            <button
              onClick={() => {
                alert(`Initiating download for technical schematic file: ${project.schematicFile}`);
              }}
              className="px-4 py-2 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" />
              <span>Download Files</span>
            </button>
          </div>
        </div>

        {/* Specifications Table */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 font-mono">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" /> Performance Benchmarks
          </h2>

          <div className="divide-y divide-slate-800 text-xs">
            {project.specs.map((s, idx) => (
              <div key={idx} className="py-3 flex justify-between gap-4">
                <span className="text-slate-400">{s.label}</span>
                <span className="font-bold text-cyan-300 text-right">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* APA Citation Generator Box */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-cyan-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> APA 7th Edition Academic Citation
          </span>

          <button
            onClick={handleCopyCitation}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl border border-slate-700 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'Copied Citation!' : 'Copy APA Citation'}</span>
          </button>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-mono select-all">
          {project.apaCitation}
        </div>
      </section>

      {/* Academic References List */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono text-xs">
        <h3 className="font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" /> Academic & Datasheet References
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-300 font-sans">
          {project.references.map((ref, idx) => (
            <li key={idx} className="leading-relaxed">{ref}</li>
          ))}
        </ul>
      </section>

      {/* Comment Section with reCAPTCHA */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 font-sans">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-white border-b border-slate-800 pb-4">
          <MessageSquare className="w-5 h-5 text-cyan-400" />
          <span>Discussion & Peer Reviews ({commentsList.length})</span>
        </div>

        {/* New Comment Form */}
        <form onSubmit={handlePostComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name / Academic Title"
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Share feedback or technical questions on this hardware prototype..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
          />

          {/* reCAPTCHA Widget */}
          <ReCaptchaWidget onVerify={(verified) => setCaptchaVerified(verified)} />

          {commentError && <p className="text-xs font-mono text-rose-400">{commentError}</p>}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Post Review Comment
          </button>
        </form>

        {/* Existing Comments */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          {commentsList.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-cyan-300 font-bold">
                <span>{c.author}</span>
                <span className="text-[10px] text-slate-500 font-normal">{c.date}</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed text-xs">{c.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
