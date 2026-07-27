import React, { useState } from 'react';
import { BLOGS_DATA } from '../data/portfolioData';
import { PageRoute, ThemeMode, CommentItem } from '../types';
import { ReCaptchaWidget } from '../components/ReCaptchaWidget';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  Send,
  MessageSquare,
  Twitter,
  Linkedin,
  Mail,
} from 'lucide-react';

interface BlogDetailPageProps {
  blogId: string;
  onNavigate: (route: PageRoute) => void;
  theme: ThemeMode;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  blogId,
  onNavigate,
  theme,
}) => {
  const blog = BLOGS_DATA.find((b) => b.id === blogId) || BLOGS_DATA[0];

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [commentsList, setCommentsList] = useState<CommentItem[]>(blog.comments || []);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [commentError, setCommentError] = useState('');

  const currentUrl = `https://aymanportfolio.github.io/blog/${blog.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(blog.apaCitation);
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
      id: `bc-${Date.now()}`,
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
        onClick={() => onNavigate('blogs')}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300 hover:text-white hover:border-amber-500/50 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Research Publications
      </button>

      {/* Main Header */}
      <div className="p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-xl space-y-4">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold">
            {blog.category}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" /> {blog.date}
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" /> {blog.readingTime}
          </span>
          <span className="text-slate-400">By {blog.author}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{blog.title}</h1>
        <p className="text-base text-slate-300 font-sans leading-relaxed">{blog.shortDesc}</p>

        {/* Sharing Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
            <Share2 className="w-3.5 h-3.5 text-amber-400" /> Share Article:
          </span>

          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-xs font-mono text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-300 transition-colors"
            title="Share on X / Twitter"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400 text-slate-400 hover:text-amber-300 transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Image Banner */}
      <div className="w-full h-72 sm:h-96 rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl">
        <img
          src={blog.image}
          alt={blog.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 font-sans text-slate-300 leading-relaxed text-base">
        {blog.fullContent.map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">{paragraph}</p>
        ))}
      </article>

      {/* APA Citation Box */}
      <section className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/30 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-300 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" /> APA 7th Edition Citation
          </span>

          <button
            onClick={handleCopyCitation}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-slate-700 flex items-center gap-1.5 font-bold cursor-pointer"
          >
            {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCitation ? 'Copied Citation!' : 'Copy APA Citation'}</span>
          </button>
        </div>

        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 leading-relaxed font-mono select-all">
          {blog.apaCitation}
        </div>
      </section>

      {/* References */}
      <section className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3 font-mono text-xs">
        <h3 className="font-bold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" /> Academic & Journal References
        </h3>

        <ul className="list-disc pl-5 space-y-2 text-slate-300 font-sans">
          {blog.references.map((ref, idx) => (
            <li key={idx} className="leading-relaxed">{ref}</li>
          ))}
        </ul>
      </section>

      {/* Comment Section with reCAPTCHA */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-8 font-sans">
        <div className="flex items-center gap-2 font-mono text-lg font-bold text-white border-b border-slate-800 pb-4">
          <MessageSquare className="w-5 h-5 text-amber-400" />
          <span>Article Discussion ({commentsList.length})</span>
        </div>

        {/* Form */}
        <form onSubmit={handlePostComment} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name / Institution"
              value={newCommentName}
              onChange={(e) => setNewCommentName(e.target.value)}
              className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <textarea
            rows={3}
            placeholder="Write your research comments or technical feedback..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-400"
          />

          {/* reCAPTCHA Widget */}
          <ReCaptchaWidget onVerify={(verified) => setCaptchaVerified(verified)} />

          {commentError && <p className="text-xs font-mono text-rose-400">{commentError}</p>}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-mono text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" /> Submit Discussion Comment
          </button>
        </form>

        {/* List */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          {commentsList.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-amber-300 font-bold">
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
