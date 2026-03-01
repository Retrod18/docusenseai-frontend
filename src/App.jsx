import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, UploadCloud, Play, FileAudio, CheckCircle, BarChart, ArrowRight, ShieldCheck, LogIn, Github, Loader2, FlaskConical, Mail, Lock, Sparkles, Cpu, Zap, Image as ImageIcon, Lightbulb, TrendingUp, Smile, FileQuestion, Volume2, Globe, HelpCircle, Send, Network, Clock, Trash2, ArrowLeft } from 'lucide-react';
import { auth, loginWithGoogle, logout, registerWithEmail, loginWithEmail, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

const API_BASE = "http://localhost:8000";

// --- Extracted Sections ---

function HowItWorksSection() {
    return (
        <div className="w-full bg-white py-24 border-y border-slate-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
                >
                    How DocuSense AI Works
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-slate-500 mb-20 max-w-2xl mx-auto"
                >
                    Streamline your literature review in three simple steps.
                </motion.p>

                <div className="w-full max-w-5xl mx-auto relative">
                    <div className="absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-blue-100 hidden md:block z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-col items-center bg-white">
                            <div className="w-20 h-20 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6 relative group">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-md">01</div>
                                <UploadCloud className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Upload</h3>
                            <p className="text-slate-500 leading-relaxed px-4">Drop your PDFs, whitepapers, or lecture notes into our secure cloud environment.</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col items-center bg-white">
                            <div className="w-20 h-20 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6 relative group">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-md">02</div>
                                <Network className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Analyze</h3>
                            <p className="text-slate-500 leading-relaxed px-4">Our LLM-powered engine parses complex text, tables, and citations in seconds.</p>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="flex flex-col items-center bg-white">
                            <div className="w-20 h-20 bg-white border-4 border-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6 relative group">
                                <div className="absolute -top-3 -right-3 w-8 h-8 bg-blue-600 text-white font-bold rounded-full flex items-center justify-center text-sm shadow-md">03</div>
                                <Lightbulb className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Insight</h3>
                            <p className="text-slate-500 leading-relaxed px-4">Chat with your docs, generate summaries, and export key findings to your bibliography.</p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FeaturesSection() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-24">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">Precision Tools for Researchers</h2>
                <p className="text-lg text-slate-500">Tailored AI capabilities designed to meet the rigorous demands of academic investigation and literature synthesis.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><UploadCloud className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Document Upload</h3>
                    <p className="text-slate-500 leading-relaxed">Seamlessly upload batch PDFs and multi-language research papers for instant processing.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><Sparkles className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Summary Generation</h3>
                    <p className="text-slate-500 leading-relaxed">Get instant, high-level summaries that capture the essence of complex doctoral theses.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><TrendingUp className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Key Insights Extraction</h3>
                    <p className="text-slate-500 leading-relaxed">Identify core arguments, data points, and critical variables automatically from text.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><Smile className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Sentiment Analysis</h3>
                    <p className="text-slate-500 leading-relaxed">Analyze the critical tone and emotional bias within peer-reviewed literature.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><FileQuestion className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">FAQ Generation</h3>
                    <p className="text-slate-500 leading-relaxed">Auto-generate study questions and potential defense queries for any paper.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600"><Volume2 className="w-6 h-6" /></div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Text-to-Speech</h3>
                    <p className="text-slate-500 leading-relaxed">High-fidelity narration allows you to review papers and findings while on the go.</p>
                </motion.div>
            </div>
        </div>
    );
}

// --- Page Components ---

function FeaturesPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col bg-[#f8f9fa] overflow-hidden pt-12">
            <div className="text-center mb-8">
                <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 shadow-sm">
                    <span className="text-sm font-semibold text-blue-600">Deep Dive</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900">Platform Features</h1>
            </div>
            <FeaturesSection />
        </div>
    );
}

function HowItWorksPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col bg-[#f8f9fa] overflow-hidden pt-12">
            <div className="text-center mb-8">
                <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 shadow-sm">
                    <span className="text-sm font-semibold text-blue-600">The Process</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900">How To Use DocuSense</h1>
            </div>
            <HowItWorksSection />
        </div>
    );
}

function LandingPage({ user }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] w-full flex flex-col bg-[#f8f9fa] overflow-hidden">
            {/* Background elements for futuristic aesthetic */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Hero Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col items-center text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <div className="mx-auto mb-8 inline-flex items-center justify-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 shadow-sm">
                        <span className="text-sm font-semibold text-blue-600">Next-gen Academic Research Assistant</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl lg:text-[80px] font-black tracking-tight text-slate-900 mb-6 leading-[1.05]">
                        Intelligent Document<br />Analysis for the <span className="text-blue-600">Modern<br />Scholar</span>
                    </h1>

                    <p className="mt-8 text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                        Empowering academic research with AI-driven insights, automated
                        summaries, and deep document understanding. Transform months of
                        reading into hours of insight.
                    </p>

                    <div className="flex justify-center">
                        <Link to={user ? "/app" : "/signup"} className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                            Start Analysis <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Interactive Preview Section */}
            <div className="w-full max-w-6xl mx-auto px-6 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1 }}
                    className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col relative"
                >
                    {/* Window Header */}
                    <div className="bg-slate-50 border-b border-slate-100 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 pl-2">
                            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                            DocuSense Interactive Preview
                        </div>
                        <div className="w-16"></div> {/* Spacer for balance */}
                    </div>

                    {/* Window Body */}
                    <div className="flex flex-col md:flex-row h-[600px] bg-slate-50/50">
                        {/* Doc View */}
                        <div className="flex-1 p-8 overflow-hidden relative hidden md:block">
                            <div className="bg-white rounded-lg shadow-sm border border-slate-100 w-full h-full p-8 flex flex-col gap-6 opacity-80">
                                <div className="h-6 bg-slate-200 rounded-md w-3/4"></div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                                    <div className="h-4 bg-slate-100 rounded-md w-11/12"></div>
                                    <div className="h-4 bg-slate-100 rounded-md w-4/5"></div>
                                    <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                                </div>
                                <div className="mt-8 flex-1 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center">
                                    <ImageIcon className="w-10 h-10 text-blue-200" />
                                </div>
                                <div className="space-y-3">
                                    <div className="h-4 bg-slate-100 rounded-md w-full"></div>
                                    <div className="h-4 bg-slate-100 rounded-md w-3/4"></div>
                                </div>
                            </div>
                        </div>

                        {/* Chat View */}
                        <div className="w-full md:w-[450px] bg-white border-l border-slate-100 flex flex-col h-full shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
                            <div className="p-5 border-b border-slate-100 flex items-center gap-3">
                                <Cpu className="w-5 h-5 text-blue-600" />
                                <span className="font-bold text-slate-800">AI Analysis Assistant</span>
                            </div>

                            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5">
                                {/* Bot Message */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed mr-8 rounded-tl-sm relative"
                                >
                                    I've analyzed the paper. The core argument focuses on neural pathway acceleration. Would you like a summary of the methodology?
                                </motion.div>

                                {/* User Message */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1 }}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm text-slate-700 leading-relaxed ml-8 rounded-tr-sm self-end"
                                >
                                    Yes, and list the key data points from Table 2.
                                </motion.div>

                                {/* Bot Message with Results */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 1.8 }}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm text-slate-700 leading-relaxed mr-4 rounded-tl-sm"
                                >
                                    <strong className="text-blue-600 block mb-2 text-base">Key Insights:</strong>
                                    <ul className="list-disc pl-4 space-y-2 text-slate-600">
                                        <li>Sample size: 1,420 academic journals</li>
                                        <li>Significant 22% increase in retention</li>
                                        <li>Correlation found between AI usage and publication speed</li>
                                    </ul>
                                </motion.div>
                            </div>

                            {/* Chat Input */}
                            <div className="p-4 border-t border-slate-100 bg-white">
                                <div className="relative">
                                    <input
                                        type="text"
                                        disabled
                                        placeholder="Ask about the document..."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-full py-3.5 pl-5 pr-12 text-sm focus:outline-none"
                                    />
                                    <div className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                                        <Send className="w-4 h-4 ml-[-2px]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* How It Works Section */}
            <HowItWorksSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* CTA Section */}
            <div className="w-full max-w-7xl mx-auto px-6 pb-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-blue-600 rounded-[40px] p-16 text-center relative overflow-hidden shadow-2xl shadow-blue-500/20"
                >
                    {/* Decorative Grid */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIwLjUgMjAuNWgydjJoLTJ6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PC9zdmc+')] opacity-50 z-0"></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Ready to analyze your documents?
                        </h2>
                        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                            Explore the future of academic research with DocuSense AI.
                        </p>
                        <Link to={user ? "/app" : "/signup"} className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold shadow-xl hover:bg-slate-50 hover:scale-105 transition-all inline-block">
                            Open Analyzer
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full bg-white border-t border-slate-100 py-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
                        <div className="bg-blue-600 rounded-md p-1.5 flex items-center justify-center">
                            <FlaskConical className="text-white w-4 h-4" />
                        </div>
                        DocuSense AI
                    </div>

                    <div className="text-slate-500 text-sm">
                        © 2024 DocuSense AI Research Systems. All rights reserved.
                    </div>

                    <div className="flex items-center gap-4 text-slate-400">
                        <Globe className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
                        <HelpCircle className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors" />
                    </div>
                </div>
            </footer>
        </div>
    );
}


function AuthPage({ user, defaultIsLogin = true }) {
    const [isLogin, setIsLogin] = useState(defaultIsLogin);

    useEffect(() => {
        setIsLogin(defaultIsLogin);
    }, [defaultIsLogin]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Redirect if already logged in
    if (user) {
        return <Navigate to="/app" />;
    }

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await loginWithEmail(email, password);
            } else {
                await registerWithEmail(email, password);
            }
            navigate('/app');
        } catch (err) {
            setError(err.message || "Failed to authenticate.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleAuth = async () => {
        setError('');
        setLoading(true);
        try {
            await loginWithGoogle();
            navigate('/app');
        } catch (err) {
            setError(err.message || "Failed to authenticate with Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-blue-600 rounded-xl p-3 shadow-lg">
                            <FlaskConical className="text-white w-8 h-8" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
                        {isLogin ? "Welcome back" : "Create an account"}
                    </h2>
                    <p className="text-center text-slate-500 mb-8">
                        {isLogin ? "Enter your details to access DocuSense AI." : "Sign up to start analyzing documents."}
                    </p>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 text-center border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailAuth} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                    placeholder="scholar@university.edu"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? "Sign In" : "Sign Up")}
                        </button>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-slate-500">Or continue with</span>
                            </div>
                        </div>

                        <button
                            onClick={handleGoogleAuth}
                            disabled={loading}
                            className="mt-6 w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-semibold hover:underline"
                        >
                            {isLogin ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

function MainApp({ user }) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState("");
    const [audioUrl, setAudioUrl] = useState(null);
    const [audioLoading, setAudioLoading] = useState(false);

    // Q&A State
    const [question, setQuestion] = useState("");
    const [qaHistory, setQaHistory] = useState([]);
    const [asking, setAsking] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // History State
    const [viewMode, setViewMode] = useState("new"); // "new" or "history"
    const [historyList, setHistoryList] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    // Protect route
    useEffect(() => {
        // Basic protection, though App level routing also handles it
        if (user === null && window.location.pathname === '/app') {
            // In a real app we might redirect to login, but we allow demo for academic purposes.
            // If we STRICTLY want to enforce login, uncomment below:
            // navigate('/login');
        }
    }, [user, navigate]);


    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        // 10MB limit
        if (selected.size > 10 * 1024 * 1024) {
            setError("File size exceeds the 10MB limit. Please upload a smaller file.");
            setFile(null);
            return;
        }

        if (selected.type === 'application/pdf' || selected.type === 'text/plain') {
            setFile(selected);
            setError("");
        } else {
            setError("Please upload a valid PDF or TXT file.");
            setFile(null);
        }
    };

    const processDocument = async () => {
        if (!file) {
            setError("No file selected.");
            return;
        }

        setLoading(true);
        setError("");
        setResults(null);
        setAudioUrl(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(`${API_BASE}/api/analyze`, {
                method: "POST",
                body: formData,
                mode: "cors"
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || "Failed to analyze document. Ensure backend is running.");
            }

            const data = await response.json();
            setResults(data);

            // Trigger Save To Firestore immediately after successful analysis
            if (user) {
                saveAnalysisToFirestore(file.name, data);
            }
        } catch (err) {
            setError(err.message || "An error occurred during analysis.");
        } finally {
            setLoading(false);
        }
    };

    const saveAnalysisToFirestore = async (fileName, analysisData) => {
        try {
            await addDoc(collection(db, "analyses"), {
                userId: user.uid,
                fileName: fileName,
                summary: analysisData.summary,
                key_insights: analysisData.key_insights,
                sentiment: analysisData.sentiment,
                faqs: analysisData.faqs,
                createdAt: serverTimestamp()
            });
            console.log("Analysis saved to Firestore history.");
        } catch (e) {
            console.error("Error saving document: ", e);
        }
    };

    const loadHistory = async () => {
        if (!user) return;
        setHistoryLoading(true);
        try {
            const q = query(
                collection(db, "analyses"),
                where("userId", "==", user.uid)
            );
            const querySnapshot = await getDocs(q);
            const historyData = [];
            querySnapshot.forEach((doc) => {
                historyData.push({ id: doc.id, ...doc.data() });
            });

            // Sort client-side to avoid needing a Firestore composite Index
            historyData.sort((a, b) => {
                const dateA = a.createdAt?.toDate() || new Date(0);
                const dateB = b.createdAt?.toDate() || new Date(0);
                return dateB - dateA; // Descending
            });

            setHistoryList(historyData);
        } catch (e) {
            console.error("Error fetching history: ", e);
            // Sometimes first time queries need index creation link
        } finally {
            setHistoryLoading(false);
        }
    };

    const deleteHistoryItem = async (id, e) => {
        e.stopPropagation();
        try {
            await deleteDoc(doc(db, "analyses", id));
            setHistoryList(historyList.filter(item => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const loadArchivedAnalysis = (archivedResult) => {
        // Mocking the full_text requirement for Neural Chat if needed, though history uses pre-gen
        setResults({
            summary: archivedResult.summary,
            key_insights: archivedResult.key_insights,
            sentiment: archivedResult.sentiment,
            faqs: archivedResult.faqs,
            full_text: "Historical text not saved for privacy/size constraints in this demo, but insights are available."
        });
        setViewMode("new");
        setFile({ name: archivedResult.fileName }); // Mock file object
        setQaHistory([]);
    };

    useEffect(() => {
        if (viewMode === 'history' && user) {
            loadHistory();
        }
    }, [viewMode, user]);

    const playTTS = async (text) => {
        if (audioUrl) return;
        setAudioLoading(true);
        try {
            const response = await fetch(`${API_BASE}/api/tts?text=${encodeURIComponent(text)}`, {
                method: "POST"
            });
            if (!response.ok) throw new Error("TTS Failed");
            const data = await response.json();

            const byteCharacters = atob(data.audio_base64);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'audio/mp3' });
            const blobUrl = URL.createObjectURL(blob);
            setAudioUrl(blobUrl);
        } catch (err) {
            setError("TTS Generation failed.");
        } finally {
            setAudioLoading(false);
        }
    };

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!question.trim() || !results?.full_text) return;

        const currentQ = question;
        setQuestion("");
        setQaHistory(prev => [...prev, { role: 'user', content: currentQ }]);
        setAsking(true);

        try {
            const response = await fetch(`${API_BASE}/api/qa`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    document_text: results.full_text,
                    question: currentQ
                })
            });

            if (!response.ok) throw new Error("Q&A failed");

            const data = await response.json();
            setQaHistory(prev => [...prev, { role: 'bot', content: data.answer }]);
        } catch (err) {
            setQaHistory(prev => [...prev, { role: 'bot', content: "Sorry, I encountered an error while searching the document." }]);
        } finally {
            setAsking(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col w-full relative bg-slate-50/50">
            {/* Background elements for futuristic aesthetic */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] z-0"></div>
            </div>

            <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 p-4 lg:p-8 relative z-10">

                {/* Left Column: Uploader */}
                <div className="xl:col-span-3 flex flex-col gap-6 sticky top-24 h-max">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Document Analyzer</h2>
                        {/* Mode Toggles */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => { setViewMode('new'); setResults(null); setFile(null); }}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'new' ? 'bg-blue-600 text-white shadow-md cursor-default' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                <UploadCloud className="w-4 h-4" /> New Scan
                            </button>
                            <button
                                onClick={() => setViewMode('history')}
                                className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${viewMode === 'history' ? 'bg-blue-600 text-white shadow-md cursor-default' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                            >
                                <Clock className="w-4 h-4" /> My Library
                            </button>
                        </div>

                        {viewMode === 'new' ? (
                            <>
                                {/* Upload Area */}
                                <div
                                    onClick={() => !loading && fileInputRef.current?.click()}
                                    className={`mt-6 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${file ? 'border-blue-400 bg-blue-50/50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.txt"
                                        disabled={loading}
                                    />
                                    <UploadCloud className={`w-10 h-10 mx-auto mb-3 ${file ? 'text-blue-500' : 'text-slate-400'}`} />
                                    <div className="text-slate-700 font-semibold mb-1">
                                        {file ? file.name : 'Upload Research Paper'}
                                    </div>
                                    <div className="text-slate-400 text-xs">
                                        {file ? 'Click to change file' : 'PDF or TXT up to 10MB'}
                                    </div>
                                </div>

                                {/* Analyze Button */}
                                <button
                                    onClick={processDocument}
                                    disabled={!file || loading}
                                    className="mt-6 w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 transition-all flex justify-center items-center shadow-lg shadow-slate-900/20"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Extract Insights"}
                                </button>
                            </>
                        ) : (
                            <div className="mt-6 flex-1 flex flex-col bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                                <div className="p-4 border-b border-slate-200 bg-slate-100 flex justify-between items-center">
                                    <h3 className="font-bold text-slate-700 text-sm">Past Analyses</h3>
                                    <span className="text-xs text-slate-500">{historyList.length} items</span>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                                    {historyLoading ? (
                                        <div className="flex justify-center p-8 text-slate-400"><Loader2 className="w-6 h-6 animate-spin" /></div>
                                    ) : historyList.length === 0 ? (
                                        <div className="text-center p-8 text-slate-400 text-sm flex flex-col items-center">
                                            <Clock className="w-8 h-8 mb-2 opacity-50 block" />
                                            No history found.
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {historyList.map(item => (
                                                <div key={item.id} onClick={() => loadArchivedAnalysis(item)} className="p-3 bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:shadow-sm cursor-pointer transition group flex justify-between items-center">
                                                    <div className="overflow-hidden">
                                                        <div className="font-semibold text-slate-800 text-sm truncate">{item.fileName}</div>
                                                        <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                                                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> DOC</span>
                                                            <span className={item.sentiment?.label === 'Positive' ? 'text-emerald-500' : item.sentiment?.label === 'Negative' ? 'text-rose-500' : 'text-slate-500'}>
                                                                {item.sentiment?.label || 'Neutral'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={(e) => deleteHistoryItem(item.id, e)}
                                                        className="text-slate-300 hover:text-rose-500 p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Delete History"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {!user && (
                        <div className="bg-blue-50 rounded-2xl p-6 text-sm text-blue-800 border border-blue-100 flex flex-col gap-3">
                            <span className="font-bold flex items-center gap-2"><ShieldCheck className="w-5 h-5" /> Demo Mode</span>
                            <p>You are viewing the app without logging in. Your analysis history will not be saved.</p>
                            <Link to="/login" className="bg-white text-blue-700 border border-blue-200 py-2 rounded-lg font-semibold text-center hover:bg-blue-50 transition">Log In Now</Link>
                        </div>
                    )}
                </div>

                {/* Right Column: Results Viewer */}
                <div className="xl:col-span-9">
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl shadow-slate-200/50 min-h-[500px] p-0 overflow-hidden flex flex-col">
                        <div className="border-b px-6 py-4 bg-slate-50 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-900">Analysis Results</h2>
                            {results && (
                                <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Complete
                                </span>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            {!results && !loading && (
                                <div className="m-auto text-center text-slate-400 flex flex-col items-center">
                                    {viewMode === 'history' ? (
                                        <>
                                            <Clock className="w-12 h-12 mb-3 opacity-20" />
                                            <p>Select a past analysis from your library to view insights.</p>
                                        </>
                                    ) : (
                                        <>
                                            <BarChart className="w-12 h-12 mb-3 opacity-20" />
                                            <p>Upload a document to view insights here.</p>
                                        </>
                                    )}
                                </div>
                            )}

                            {loading && (
                                <div className="m-auto text-center text-slate-500 flex flex-col items-center">
                                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                                    <p className="font-medium animate-pulse">Running NLP Engine...</p>
                                </div>
                            )}

                            <AnimatePresence>
                                {results && !loading && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-8 flex-1 overflow-auto"
                                    >
                                        {/* Summary */}
                                        <div>
                                            <div className="flex justify-between items-center mb-3">
                                                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                                                    <FileText className="w-5 h-5 text-blue-500" /> Auto-Summary
                                                </h3>
                                                <button
                                                    onClick={() => playTTS(results.summary)}
                                                    disabled={audioLoading}
                                                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-md flex items-center gap-2 font-medium transition"
                                                >
                                                    {audioLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3 text-blue-600" />} Listen
                                                </button>
                                            </div>
                                            <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                {results.summary}
                                            </p>

                                            {audioUrl && (
                                                <div className="mt-3">
                                                    <audio controls src={audioUrl} className="w-full h-10 outline-none" autoPlay></audio>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Concepts */}
                                            <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                                                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Key Concepts</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {results.key_insights.map((insight, idx) => (
                                                        <span key={idx} className="bg-white text-blue-700 text-xs font-semibold px-2.5 py-1 rounded border border-blue-200">
                                                            {insight}
                                                        </span>
                                                    ))}
                                                    {results.key_insights.length === 0 && <span className="text-sm text-slate-500">No major concepts detected.</span>}
                                                </div>
                                            </div>

                                            {/* Sentiment */}
                                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-center items-center">
                                                <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider w-full text-center">Sentiment</h3>
                                                <div className={`text-2xl font-black ${results.sentiment.label === 'Positive' ? 'text-emerald-500' :
                                                    results.sentiment.label === 'Negative' ? 'text-rose-500' : 'text-slate-500'
                                                    }`}>
                                                    {results.sentiment.label}
                                                </div>
                                                <div className="text-xs text-slate-400 mt-2 font-mono">
                                                    Polarity: {results.sentiment.polarity}
                                                </div>
                                            </div>
                                        </div>

                                        {/* FAQs */}
                                        <div>
                                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                                <span className="bg-yellow-100 text-yellow-700 w-6 h-6 flex items-center justify-center rounded text-sm">?</span>
                                                Generated FAQs
                                            </h3>
                                            <div className="space-y-3">
                                                {results.faqs.map((faq, idx) => (
                                                    <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                                                        <h4 className="font-bold text-slate-900 text-sm mb-1">{faq.question}</h4>
                                                        <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Futuristic Q&A Chatbot */}
                                        <div className="mt-12 pt-10 border-t border-slate-100 relative">
                                            {/* Decorative glowing orb behind chat */}
                                            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                                            <h3 className="font-black text-slate-800 tracking-tight text-xl mb-6 flex items-center gap-3">
                                                <div className="relative flex items-center justify-center p-2 bg-slate-900 rounded-lg shadow-lg shadow-slate-900/20">
                                                    <Cpu className="w-5 h-5 text-blue-400" />
                                                    <div className="absolute top-0 right-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
                                                </div>
                                                DocuSense Neural Chat
                                            </h3>

                                            <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col h-[400px] shadow-2xl relative border border-slate-800">
                                                {/* Grid overlay for chat bg */}
                                                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgNDBoNDBWMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwdk0wIDIwaDQwdk0wIDMwaDQwTTEwIDB2NDBNMjAgMHY0ME0zMCAwdjQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] pointer-events-none z-0"></div>

                                                {/* Chat History */}
                                                <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 custom-scrollbar">
                                                    {qaHistory.length === 0 ? (
                                                        <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-70">
                                                            <Sparkles className="w-10 h-10 text-blue-500 mb-3 opacity-50" />
                                                            <div className="font-mono text-xs tracking-widest uppercase">Awaiting Query...</div>
                                                        </div>
                                                    ) : (
                                                        qaHistory.map((msg, idx) => (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                key={idx}
                                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                                            >
                                                                <div className={`max-w-[85%] px-5 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                                                    ? 'bg-blue-600/90 text-white rounded-2xl rounded-tr-sm border border-blue-500/50 shadow-lg shadow-blue-900/20'
                                                                    : 'bg-slate-800/80 backdrop-blur-md border border-slate-700 text-slate-200 rounded-2xl rounded-tl-sm shadow-xl shadow-black/20'
                                                                    }`}>
                                                                    {msg.content}
                                                                </div>
                                                            </motion.div>
                                                        ))
                                                    )}
                                                    {asking && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                                            <div className="bg-slate-800/80 border border-slate-700 text-slate-400 rounded-2xl rounded-tl-sm px-5 py-3 text-sm flex items-center gap-3">
                                                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                                                                <span className="font-mono text-xs">Processing neural pathways...</span>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Input Area */}
                                                <div className="p-4 bg-slate-900/90 backdrop-blur border-t border-slate-800 z-10 relative">
                                                    <form onSubmit={handleAskQuestion} className="flex gap-3 relative">
                                                        <input
                                                            type="text"
                                                            value={question}
                                                            onChange={(e) => setQuestion(e.target.value)}
                                                            className="flex-1 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium"
                                                            placeholder="Initialize query..."
                                                        />
                                                        <button
                                                            type="submit"
                                                            disabled={!question.trim() || asking}
                                                            className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg flex items-center justify-center transition-all group"
                                                        >
                                                            <Zap className={`w-4 h-4 ${question.trim() && !asking ? 'group-hover:scale-110 transition-transform' : ''}`} />
                                                        </button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    // Monitor Auth State
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setAuthLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Router>
            <div className="font-sans antialiased text-slate-900 bg-[#f8f9fa] selection:bg-blue-200 min-h-screen flex flex-col">
                <nav className="sticky top-0 z-50 bg-[#f8f9fa]/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                        {/* Logo Logo */}
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                            <div className="bg-blue-600 rounded-md p-1.5 flex items-center justify-center">
                                <FlaskConical className="text-white w-5 h-5" />
                            </div>
                            DocuSense AI
                        </Link>

                        {/* Center Nav */}
                        <div className="hidden md:flex gap-8 text-[15px] font-medium text-slate-600">
                            <Link to="/features" className="hover:text-slate-900 transition">Features</Link>
                            <Link to="/how-it-works" className="hover:text-slate-900 transition">How it Works</Link>
                            <Link to="/app" className="hover:text-slate-900 transition">Demo</Link>
                        </div>

                        {/* Right Nav */}
                        <div className="flex items-center gap-6 text-[15px] font-medium">
                            {!authLoading && user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-600 hidden sm:block">{user.email}</span>
                                    <button onClick={handleLogout} className="text-slate-600 hover:text-slate-900 transition">
                                        Logout
                                    </button>
                                    <Link to="/app">
                                        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
                                            Open Analyzer
                                        </button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Link to="/login" className="text-slate-700 hover:text-slate-900 transition font-semibold">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-semibold">
                                        Start Analyzing Free
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<LandingPage user={user} />} />
                    <Route path="/features" element={<FeaturesPage />} />
                    <Route path="/how-it-works" element={<HowItWorksPage />} />
                    <Route path="/login" element={<AuthPage user={user} defaultIsLogin={true} />} />
                    <Route path="/signup" element={<AuthPage user={user} defaultIsLogin={false} />} />
                    <Route path="/app" element={<MainApp user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
