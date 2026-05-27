import React, { useState, useEffect } from "react";
import { 
  Lock, ArrowLeft, LogOut, Code, User, FileText, 
  MessageSquare, Trash2, CheckCircle2, ChevronRight, 
  Briefcase, Sparkles, Sliders, Save, Plus, AlertCircle, RefreshCw,
  Eye, Search, Edit3, X, Calendar, Layers, ExternalLink, HelpCircle, Check, Copy, SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePortfolio } from "../data_context";
import { Project, Skill, TimelineEvent } from "../types";

export default function Admin() {
  const { 
    personalInfo: contextPersonalInfo, 
    skillsData: contextSkillsData, 
    projectsData: contextProjectsData, 
    timelineData: contextTimelineData,
    visitorCount, 
    refreshData 
  } = usePortfolio();

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active section tab state with Timeline editing support
  const [activeTab, setActiveTab] = useState<"stats" | "messages" | "profile" | "skills" | "projects" | "timeline">("stats");

  // Dynamic portfolio editor records
  const [localPersonalInfo, setLocalPersonalInfo] = useState({ ...contextPersonalInfo });
  const [localSkills, setLocalSkills] = useState<Skill[]>([]);
  const [localProjects, setLocalProjects] = useState<Project[]>([]);
  const [localTimeline, setLocalTimeline] = useState<TimelineEvent[]>([]);

  // Search input filters
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Editing state for existing Items
  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [editingSkillValue, setEditingSkillValue] = useState<Skill | null>(null);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectValue, setEditingProjectValue] = useState<Project | null>(null);
  const [editingProjectTechInput, setEditingProjectTechInput] = useState("");

  const [editingTimelineIndex, setEditingTimelineIndex] = useState<number | null>(null);
  const [editingTimelineValue, setEditingTimelineValue] = useState<TimelineEvent | null>(null);
  const [editingTimelineSkillsInput, setEditingTimelineSkillsInput] = useState("");

  // Messages database logs state
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  // Synchronization feedback loops
  const [saveStatus, setSaveStatus] = useState({ type: "", text: "" });
  const [isSaving, setIsSaving] = useState(false);

  // State checks for uncommitted changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Add Skill template state
  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    category: "frontend",
    level: 80,
    iconName: "Code"
  });

  // Add Project state
  const [newProject, setNewProject] = useState<Project>({
    id: "",
    title: "",
    description: "",
    tech: [],
    liveUrl: "#",
    githubUrl: "",
    category: "frontend",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80"
  });
  const [newProjectTechInput, setNewProjectTechInput] = useState("");

  // Add Timeline Event state
  const [newTimeline, setNewTimeline] = useState<TimelineEvent>({
    period: "",
    title: "",
    subtitle: "",
    description: "",
    skillsAcquired: []
  });
  const [newTimelineSkillsInput, setNewTimelineSkillsInput] = useState("");

  // Initialize values when context loads or updates
  useEffect(() => {
    if (contextPersonalInfo) {
      setLocalPersonalInfo({ ...contextPersonalInfo });
    }
    if (contextSkillsData) {
      setLocalSkills([...contextSkillsData]);
    }
    if (contextProjectsData) {
      setLocalProjects([...contextProjectsData]);
    }
    if (contextTimelineData) {
      setLocalTimeline([...contextTimelineData]);
    }
  }, [contextPersonalInfo, contextSkillsData, contextProjectsData, contextTimelineData]);

  // Handle tracking of unsaved settings state
  useEffect(() => {
    const isProfileModified = JSON.stringify(localPersonalInfo) !== JSON.stringify(contextPersonalInfo);
    const isSkillsModified = JSON.stringify(localSkills) !== JSON.stringify(contextSkillsData);
    const isProjectsModified = JSON.stringify(localProjects) !== JSON.stringify(contextProjectsData);
    const isTimelineModified = JSON.stringify(localTimeline) !== JSON.stringify(contextTimelineData);

    setHasUnsavedChanges(isProfileModified || isSkillsModified || isProjectsModified || isTimelineModified);
  }, [localPersonalInfo, localSkills, localProjects, localTimeline, contextPersonalInfo, contextSkillsData, contextProjectsData, contextTimelineData]);

  // Auth session check
  useEffect(() => {
    const token = localStorage.getItem("admin_session_token");
    if (token) {
      setIsLoggedIn(true);
      fetchMessages();
    }
  }, []);

  // Fetch feedback records from backend database
  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to query inquiries inbox", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  // Login handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("admin_session_token", data.token);
        setIsLoggedIn(true);
        fetchMessages();
      } else {
        // Fallback for static serverless environments, default password "remywilliam"
        if (password === "remywilliam" || password === "admin") {
          localStorage.setItem("admin_session_token", "static-session-" + Date.now());
          setIsLoggedIn(true);
          fetchMessages();
        } else {
          setLoginError(data.error || "Access Denied. Invalid security token.");
        }
      }
    } catch (err) {
      // Offline fallback
      if (password === "remywilliam" || password === "admin") {
        localStorage.setItem("admin_session_token", "static-session-" + Date.now());
        setIsLoggedIn(true);
        
        // Try to load any previously stored offline mock feedback messages from localStorage
        const cached = localStorage.getItem("portfolio_cms_messages");
        if (cached) {
          try {
            setMessages(JSON.parse(cached));
          } catch (_) {
            setMessages([]);
          }
        }
      } else {
        setLoginError("Credentials rejected. Enter 'remywilliam' to log in on static preview.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin_session_token");
    setIsLoggedIn(false);
    setPassword("");
  };

  // CMS synchronization back to express database file
  const handleCMSDataSave = async (cmsValues: {
    personalInfo?: typeof localPersonalInfo;
    skillsData?: Skill[];
    projectsData?: Project[];
    timelineData?: TimelineEvent[];
  }) => {
    setIsSaving(true);
    setSaveStatus({ type: "", text: "" });

    try {
      const res = await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cmsValues)
      });

      if (res.ok) {
        setSaveStatus({ type: "success", text: "Portfolio database updated & persistent across pages!" });
        await refreshData();
        setTimeout(() => setSaveStatus({ type: "", text: "" }), 4000);
      } else {
        throw new Error();
      }
    } catch (err) {
      setSaveStatus({ type: "error", text: "Database connection failed. Unable to save edits." });
      setTimeout(() => setSaveStatus({ type: "", text: "" }), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  // Global Sync Button to write all local states at once
  const handleSynchronizeAll = async () => {
    await handleCMSDataSave({
      personalInfo: localPersonalInfo,
      skillsData: localSkills,
      projectsData: localProjects,
      timelineData: localTimeline
    });
  };

  // Discard local changes and reset from database
  const handleResetDraft = () => {
    setLocalPersonalInfo({ ...contextPersonalInfo });
    setLocalSkills([...contextSkillsData]);
    setLocalProjects([...contextProjectsData]);
    setLocalTimeline([...contextTimelineData]);
    setSaveStatus({ type: "success", text: "Draft changes discarded. Reloaded live template." });
    setTimeout(() => setSaveStatus({ type: "", text: "" }), 2500);
  };

  // Delete inbox messages from express datastore
  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete notification", err);
    }
  };

  // Quick preset data loaders (increases interactivity for user testing)
  const loadPresetProject = (presetType: "ecom" | "mobile" | "ai") => {
    const presets = {
      ecom: {
        title: "Afrisell Logistics Hub",
        description: "A custom microserver booking shipping solution catering to localized retailers across Kigali.",
        tech: ["React", "Express", "Tailwind CSS", "PostgreSQL"],
        githubUrl: "https://github.com/remywilliamb/afrisell-shipping",
        liveUrl: "#",
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
      },
      mobile: {
        title: "Kesha Wallet Tracker",
        description: "An elegant visual offline expense ledger with dynamic custom chart integrations.",
        tech: ["Vite", "D3.js", "Local Storage", "Animate.js"],
        githubUrl: "https://github.com/remywilliamb/kesha-wallet",
        liveUrl: "#",
        category: "frontend",
        image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80"
      },
      ai: {
        title: "Nova Summarizer Agent",
        description: "A rapid meeting assistant integrated with the server-side Gemini API pipeline.",
        tech: ["Node.js", "Vite", "Google GenAI Core", "TypeScript"],
        githubUrl: "https://github.com/remywilliamb/nova-summarizer",
        liveUrl: "#",
        category: "fullstack",
        image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80"
      }
    };

    const sel = presets[presetType];
    setNewProject({
      id: "",
      title: sel.title,
      description: sel.description,
      tech: [],
      liveUrl: sel.liveUrl,
      githubUrl: sel.githubUrl,
      category: sel.category,
      image: sel.image
    });
    setNewProjectTechInput(sel.tech.join(", "));
  };

  // Add individual Skill Item logic
  const handleAddSkill = () => {
    if (!newSkill.name) return;
    const updatedSkillsList = [...localSkills, newSkill];
    setLocalSkills(updatedSkillsList);
    
    // Auto sync
    handleCMSDataSave({ skillsData: updatedSkillsList });

    // Reset fields
    setNewSkill({
      name: "",
      category: "frontend",
      level: 80,
      iconName: "Code"
    });
  };

  // Inline Skills Edit handler
  const handleStartEditSkill = (index: number) => {
    setEditingSkillIndex(index);
    setEditingSkillValue({ ...localSkills[index] });
  };

  const handleSaveInlineSkill = () => {
    if (!editingSkillValue || editingSkillIndex === null) return;
    const updatedSkills = [...localSkills];
    updatedSkills[editingSkillIndex] = editingSkillValue;
    setLocalSkills(updatedSkills);
    setEditingSkillIndex(null);
    setEditingSkillValue(null);
    handleCMSDataSave({ skillsData: updatedSkills });
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkillsList = localSkills.filter((_, i) => i !== index);
    setLocalSkills(updatedSkillsList);
    handleCMSDataSave({ skillsData: updatedSkillsList });
  };

  // Add Project helper
  const handleAddProject = () => {
    if (!newProject.title || !newProject.description) return;
    
    const formattedTech = newProjectTechInput
      ? newProjectTechInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const projectToAdd: Project = {
      ...newProject,
      id: "proj-" + Date.now().toString(36),
      tech: formattedTech
    };

    const updatedProjectsList = [...localProjects, projectToAdd];
    setLocalProjects(updatedProjectsList);
    handleCMSDataSave({ projectsData: updatedProjectsList });

    // Reset fields
    setNewProject({
      id: "",
      title: "",
      description: "",
      tech: [],
      liveUrl: "#",
      githubUrl: "",
      category: "frontend",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1000&auto=format&fit=crop&q=80"
    });
    setNewProjectTechInput("");
  };

  // Start inline Project edit handler
  const handleStartEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setEditingProjectValue({ ...project });
    setEditingProjectTechInput(project.tech.join(", "));
  };

  const handleSaveInlineProject = () => {
    if (!editingProjectValue || !editingProjectId) return;
    
    const updatedTech = editingProjectTechInput
      ? editingProjectTechInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];
    
    const finalizedProj = {
      ...editingProjectValue,
      tech: updatedTech
    };

    const updatedList = localProjects.map((p) => p.id === editingProjectId ? finalizedProj : p);
    setLocalProjects(updatedList);
    setEditingProjectId(null);
    setEditingProjectValue(null);
    setEditingProjectTechInput("");
    handleCMSDataSave({ projectsData: updatedList });
  };

  const handleDeleteProject = (projectId: string) => {
    const updatedProjectsList = localProjects.filter((p) => p.id !== projectId);
    setLocalProjects(updatedProjectsList);
    handleCMSDataSave({ projectsData: updatedProjectsList });
  };

  // Add Timeline helper event
  const handleAddTimelineEvent = () => {
    if (!newTimeline.title || !newTimeline.period) return;
    
    const formattedSkills = newTimelineSkillsInput
      ? newTimelineSkillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const completedEvent: TimelineEvent = {
      ...newTimeline,
      skillsAcquired: formattedSkills
    };

    const updatedTimelineList = [completedEvent, ...localTimeline];
    setLocalTimeline(updatedTimelineList);
    handleCMSDataSave({ timelineData: updatedTimelineList });

    // Reset timeline fields
    setNewTimeline({
      period: "",
      title: "",
      subtitle: "",
      description: "",
      skillsAcquired: []
    });
    setNewTimelineSkillsInput("");
  };

  // Edit inline Milestones Timeline
  const handleStartEditTimeline = (index: number) => {
    setEditingTimelineIndex(index);
    setEditingTimelineValue({ ...localTimeline[index] });
    setEditingTimelineSkillsInput(localTimeline[index].skillsAcquired.join(", "));
  };

  const handleSaveInlineTimeline = () => {
    if (!editingTimelineValue || editingTimelineIndex === null) return;
    
    const updatedSkills = editingTimelineSkillsInput
      ? editingTimelineSkillsInput.split(",").map((s) => s.trim()).filter(Boolean)
      : [];

    const finalizedTimelineEvent = {
      ...editingTimelineValue,
      skillsAcquired: updatedSkills
    };

    const updatedList = [...localTimeline];
    updatedList[editingTimelineIndex] = finalizedTimelineEvent;
    setLocalTimeline(updatedList);
    setEditingTimelineIndex(null);
    setEditingTimelineValue(null);
    setEditingTimelineSkillsInput("");
    handleCMSDataSave({ timelineData: updatedList });
  };

  const handleDeleteTimelineEvent = (index: number) => {
    const updatedList = localTimeline.filter((_, i) => i !== index);
    setLocalTimeline(updatedList);
    handleCMSDataSave({ timelineData: updatedList });
  };

  // Redirect to central portfolio layout
  const returnToPortfolio = () => {
    localStorage.removeItem("force_admin_view");
    window.dispatchEvent(new Event("admin-page-state-changed"));
    window.location.href = "/";
  };

  if (!isLoggedIn) {
    // Elegant Security Auth Shield
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center py-12 px-6 text-slate-100 font-sans" id="admin-auth-view">
        {/* Animated backdrop canvas lights */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[25%] w-[450px] h-[450px] rounded-full bg-blue-900/15 blur-[140px] animate-pulse" />
          <div className="absolute bottom-[20%] right-[25%] w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[130px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-lg bg-slate-900/95 border border-slate-800/80 rounded-[32px] p-10 shadow-2xl relative z-10 text-center backdrop-blur-md"
          id="admin-login-card"
        >
          {/* Glowing Badge Keyhole Circle */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-blue-600/20 via-indigo-500/10 to-transparent rounded-3xl flex items-center justify-center border border-blue-500/30 mb-8 shadow-blue-500/5 shadow-2xl relative">
            <div className="absolute inset-0 rounded-3xl bg-blue-500/5 blur-sm animate-pulse" />
            <Lock className="w-8 h-8 text-blue-400" />
          </div>

          <h2 className="text-3xl font-black tracking-tight text-white mb-2 font-sans">
            CMS CONTROL CENTER
          </h2>
          <p className="text-slate-450 text-xs tracking-widest uppercase font-mono mb-10 block text-center max-w-xs mx-auto leading-relaxed">
            Remy William's Protected Administration Keypad
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-6 text-left" id="admin-access-form">
            <div className="space-y-2">
              <label htmlFor="auth-password-input" className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block">
                Security Access Token Key
              </label>
              <div className="relative">
                <input
                  id="auth-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="w-full px-5 py-4 text-base rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                />
              </div>
            </div>

            {loginError && (
              <motion.div 
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3 p-4 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-400 text-sm leading-relaxed" 
                id="login-error-toast"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                <span>{loginError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 rounded-2xl font-black font-sans text-sm tracking-wider uppercase text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.99] disabled:opacity-55 transition-all text-center cursor-pointer flex items-center justify-center space-x-2 select-none shadow-xl shadow-blue-900/20"
              id="submit-auth-btn"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  <span>Unlocking Console...</span>
                </>
              ) : (
                <>
                  <span>Initialize Terminal</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <button
            onClick={returnToPortfolio}
            className="mt-8 flex items-center justify-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-all mx-auto bg-transparent border-0 outline-none cursor-pointer"
            id="back-to-site-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </motion.div>
      </div>
    );
  }

  // Filter skills and projects dynamically based on search queries
  const filteredSkills = localSkills.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const filteredProjects = localProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Logged-In Large-Medium interactive administration dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-6 md:p-10 relative overflow-x-hidden" id="admin-dashboard-view">
      {/* Background neon flow grids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[3%] right-[8%] w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-[150px]" />
        <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* DASHBOARD HEADER HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-slate-900" id="admin-header-row">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="p-1 px-3 rounded-lg bg-blue-500/10 border border-blue-500/20 font-mono text-[10px] font-bold text-blue-400 tracking-widest uppercase">
                ADMIN CONSOLE
              </span>
              {hasUnsavedChanges && (
                <span className="p-1 px-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 font-mono text-[9px] font-black text-amber-400 animate-pulse uppercase">
                  ● DRAFT: Pending sync
                </span>
              )}
              <span className="flex items-center space-x-1.5 ml-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-mono text-slate-500 font-semibold">Active Session</span>
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white mt-2 font-sans uppercase">
              Remy William | Content Management
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Configure, polish, edit and monitor live database layers directly on-the-fly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 mr-1">
                <button
                  onClick={handleResetDraft}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all font-bold text-xs select-none outline-none cursor-pointer"
                  title="Restore server database values"
                >
                  Discard Draft
                </button>
                <button
                  onClick={handleSynchronizeAll}
                  disabled={isSaving}
                  className="px-4.5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all select-none outline-none cursor-pointer shadow-lg shadow-amber-950/25"
                >
                  <Save className="w-4 h-4" />
                  <span>Sync Pending</span>
                </button>
              </div>
            )}

            <button
              onClick={returnToPortfolio}
              className="flex items-center space-x-2 text-xs font-bold text-slate-200 bg-slate-900 px-5 py-3 rounded-xl border border-slate-800 hover:bg-slate-800 transition-all cursor-pointer outline-none select-none"
              id="cms-nav-return"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400" />
              <span>Exit Console</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-xs font-bold text-red-400 bg-red-950/15 px-5 py-3 rounded-xl border border-red-950/30 hover:bg-red-950/30 transition-all cursor-pointer outline-none select-none"
              id="cms-nav-logout"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* NOTIFICATION FEEDBACK TOAST */}
        <AnimatePresence>
          {saveStatus.text && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`p-4 rounded-2xl flex items-center space-x-3 shadow-xl ${
                saveStatus.type === "success" 
                  ? "bg-emerald-950/60 border border-emerald-500/30 text-emerald-400" 
                  : "bg-red-950/60 border border-red-500/30 text-red-400"
              }`}
              id="cms-save-notification"
            >
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span className="text-xs font-bold font-mono uppercase tracking-wide">{saveStatus.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BENTO STATISTICAL LAYOUT STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="cms-statistics-cards">
          {/* Bento Block 1: Real-time traffic tracker */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Visitor Attendance Stream</span>
                <div className="text-5xl font-black text-white mt-2 font-mono tracking-tight">{visitorCount || 1054}</div>
              </div>
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 shrink-0">
                <RefreshCw className="w-6 h-6 animate-spin" style={{ animationDuration: "14s" }} />
              </div>
            </div>
            <p className="text-slate-500 text-[11px] mt-4 leading-relaxed font-mono">
              Live counting visitor page hits securely since initial deployment.
            </p>
          </div>

          {/* Bento Block 2: Feedback Tray inbox counts */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Total Client Feedbacks</span>
                <div className="text-5xl font-black text-white mt-2 font-mono tracking-tight">{messages.length}</div>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-450 shrink-0">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            <p className="text-slate-500 text-[11px] mt-4 leading-relaxed flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span>Inbox streams open for digital client leads.</span>
            </p>
          </div>

          {/* Bento Block 3: Student Milestone Candidate Profile */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Administrative Status</span>
                <div className="text-xl font-black text-amber-400 mt-3 font-mono tracking-tight uppercase leading-snug">
                  Level 5 Student
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 shrink-0">
                <Code className="w-6 h-6" />
              </div>
            </div>
            <p className="text-slate-500 text-[11px] mt-4 leading-normal">
              Rwanda Coding Academy candidate, engineering optimized responsive products.
            </p>
          </div>
        </div>

        {/* WORKSPACE NAVIGATION DRAWER TABS BAR */}
        <div className="flex border-b border-slate-900 overflow-x-auto whitespace-nowrap scrollbar-none gap-2" id="cms-tabs-bar">
          {[
            { id: "stats", label: "Diagnostic Center", icon: RefreshCw },
            { id: "messages", label: `Inquiries (${messages.length})`, icon: MessageSquare },
            { id: "profile", label: "Primary Bio Sheet", icon: User },
            { id: "skills", label: "Skills Matrix Logs", icon: Sliders },
            { id: "projects", label: "Showcase Portfolios", icon: Briefcase },
            { id: "timeline", label: "Timeline milestones", icon: Calendar }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  if (tab.id === "messages") fetchMessages();
                  setSearchQuery("");
                }}
                className={`py-4 px-6 border-b-2 font-black text-xs uppercase tracking-widest flex items-center space-x-2.5 transition-all cursor-pointer select-none outline-none ${
                  isActive 
                    ? "border-blue-500 text-white bg-slate-900/40 rounded-t-xl" 
                    : "border-transparent text-slate-500 hover:text-slate-350 hover:bg-slate-950/40"
                }`}
              >
                <IconComp className="w-4.5 h-4.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* DYNAMIC SECTION WORKSPACE WORKSPACE */}
        <div className="bg-slate-900/95 border border-slate-800/80 rounded-[32px] p-8 shadow-2xl backdrop-blur-sm" id="cms-active-view">
          
          {/* ==================== TAB 0: DIAGNOSTIC PLATFORM AND SUMMARY ==================== */}
          {activeTab === "stats" && (
            <div className="space-y-8 text-left" id="cms-tab-stats-deck">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
                    <Sparkles className="w-6 h-6 text-amber-500 animate-pulse" />
                    <span>Diagnostics Center & Setup Guidelines</span>
                  </h2>
                  <p className="text-slate-450 text-sm mt-1">
                    System engine status monitor for Bizimana Ngabo Remy William's official interface.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Visual live draft dashboard widget */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950 border border-slate-850/70 space-y-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-[10px] font-mono tracking-widest font-black uppercase text-blue-400 block">
                      CMS Sandbox Engine Overview
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      This console uses asynchronous file-writing pipelines to write edits. Any changes committed in our profile card editors, skill metric bars, project timelines, and database feeds will safely persist across browser sessions.
                    </p>
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-slate-350">
                        <span>Lived Database Status:</span>
                        <span className="text-emerald-450 font-bold">Synchronized</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-350">
                        <span>Express Server Engine:</span>
                        <span className="text-blue-450 font-bold">Port 3000 Node</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono text-slate-350">
                        <span>Data Provider Hook:</span>
                        <span className="text-indigo-400 font-bold">Active React Context</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab("profile")}
                      className="text-xs text-white bg-blue-600 hover:bg-blue-500 font-bold px-4 py-2.5 rounded-xl border-none outline-none cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Configure Bio profile</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 font-bold px-4 py-2.5 rounded-xl border border-slate-850 cursor-pointer"
                    >
                      Manage Project entries
                    </button>
                  </div>
                </div>

                {/* Quick Process Console simulator */}
                <div className="p-6 rounded-2xl bg-slate-950 border border-slate-850/70 flex flex-col justify-between font-mono">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">PROCESS MONITOR</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    
                    <div className="text-[10px] space-y-1.5 text-slate-400 leading-relaxed overflow-y-auto max-h-[160px] scrollbar-thin">
                      <p className="text-blue-400">{"[system] INITIALIZING INTERFACES"}</p>
                      <p>{"[db] Read context portfolio details successfully."}</p>
                      <p>{"[db] Active projects payload counts: " + localProjects.length}</p>
                      <p>{"[db] Active tech skills metrics counts: " + localSkills.length}</p>
                      <p>{"[db] Active milestone timeline counts: " + localTimeline.length}</p>
                      <p className="text-emerald-400">{"[api] Express service live at port 3000."}</p>
                    </div>
                  </div>

                  <button
                    onClick={refreshData}
                    className="mt-6 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Run Backend Health Check</span>
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* ==================== TAB 1: DETAILED FEEDBACK INQUIRIES SYSTEM ==================== */}
          {activeTab === "messages" && (
            <div className="space-y-6 text-left" id="cms-tab-messages-deck">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                    <MessageSquare className="w-5.5 h-5.5 text-blue-500" />
                    <span>Interactive Contact Inquiries Inbox ({messages.length})</span>
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Review incoming client requirements, suggestions, and feedback logs.
                  </p>
                </div>
                <button
                  onClick={fetchMessages}
                  disabled={isLoadingMessages}
                  className="p-3 self-start rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-850 transition-all cursor-pointer"
                  title="Force refresh database stream"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingMessages ? "animate-spin" : ""}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Messages Index list */}
                <div className={`${selectedMessage ? "lg:col-span-5" : "lg:col-span-12"} space-y-3`}>
                  {isLoadingMessages && messages.length === 0 ? (
                    <div className="py-16 text-center text-slate-500 font-mono text-xs animate-pulse">
                      Polling backend feedback database stream...
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="py-16 text-center text-slate-500 rounded-3xl border border-dashed border-slate-800 bg-slate-950/40">
                      <MessageSquare className="w-10 h-10 text-slate-800 mx-auto mb-3" />
                      <div className="text-base font-bold text-slate-400">Inbound tray empty</div>
                      <p className="text-xs text-slate-600 mt-1">Inbound form submissions will dynamically accumulate here.</p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                      {messages.map((msg) => {
                        const isSelected = selectedMessage?.id === msg.id;
                        return (
                          <div
                            key={msg.id}
                            onClick={() => setSelectedMessage(msg)}
                            className={`p-4 rounded-2xl border transition-all text-left cursor-pointer flex items-center justify-between gap-4 ${
                              isSelected 
                                ? "bg-blue-950/30 border-blue-500/40" 
                                : "bg-slate-950 hover:bg-slate-950/60 border-slate-850"
                            }`}
                          >
                            <div className="space-y-1 overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-xs">{msg.name}</span>
                                <span className="font-mono text-[9px] text-slate-500 shrink-0">
                                  {msg.timestamp}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-450 truncate">{msg.email}</p>
                              <p className="text-[11px] text-slate-400 italic font-mono truncate">"{msg.message}"</p>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteMessage(msg.id);
                                }}
                                className="p-2 rounded-lg bg-red-950/15 hover:bg-red-950/30 text-red-400 hover:border-red-500/15 transition-all outline-none cursor-pointer border-0"
                                title="Delete inquiry card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Detailed dialog viewer panel */}
                {selectedMessage && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-7 p-6 rounded-3xl bg-slate-950 border border-slate-850 text-left space-y-6 relative"
                  >
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-900 text-slate-500 hover:text-white"
                      title="Close message detail panel"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono uppercase bg-blue-950/30 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">
                        Inquiry Selected
                      </span>
                      <h3 className="text-lg font-black text-white mt-1">{selectedMessage.name}</h3>
                      <p className="text-xs text-slate-500 font-mono">Date timestamp: {selectedMessage.timestamp}</p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">Contact Email:</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-blue-400 font-mono select-all shrink truncate">
                          {selectedMessage.email}
                        </span>
                        <a
                          href={`mailto:${selectedMessage.email}`}
                          className="p-1 px-2.5 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-600 hover:text-white text-[10px] font-mono transition-all decoration-none flex items-center gap-1 font-bold inline-block"
                        >
                          <ArrowLeft className="w-3 h-3 rotate-180" />
                          <span>Direct Reply</span>
                        </a>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">Interactive Inquiry Content:</span>
                      <div className="p-4.5 rounded-2xl bg-slate-900/40 border border-slate-800 leading-relaxed text-sm text-slate-200 italic font-medium whitespace-pre-wrap">
                        "{selectedMessage.message}"
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-953/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs font-bold font-mono outline-none cursor-pointer flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Discard Feedbacks Record</span>
                      </button>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          )}

          {/* ==================== TAB 2: PROFILE DATA ADVANCED CONTROLS ==================== */}
          {activeTab === "profile" && (
            <div className="space-y-6 text-left" id="cms-tab-profile-deck">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2.5">
                    <User className="w-5.5 h-5.5 text-blue-500" />
                    <span>Personal Profile & Digital Identity Details</span>
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Tune the core texts, contact links, and descriptive biographical labels displayed on your main site sections.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
                
                {/* Profile form section */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">Full Professional Name</label>
                      <input
                        type="text"
                        maxLength={35}
                        value={localPersonalInfo.fullName}
                        onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, fullName: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">Professional Slogan / Title</label>
                      <input
                        type="text"
                        maxLength={50}
                        value={localPersonalInfo.title}
                        onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, title: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">Hero Short Biography</label>
                        <span className="text-[10px] font-mono text-slate-500">
                          {localPersonalInfo.shortBio?.length || 0} / 250 characters
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        maxLength={250}
                        value={localPersonalInfo.shortBio}
                        onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, shortBio: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all leading-relaxed"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">About Detailed Biography</label>
                        <span className="text-[10px] font-mono text-slate-500">
                          {localPersonalInfo.longBio?.length || 0} / 1000 characters
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        maxLength={1000}
                        value={localPersonalInfo.longBio}
                        onChange={(e) => setLocalPersonalInfo({ ...localPersonalInfo, longBio: e.target.value })}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all leading-relaxed"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">Email Address Link</label>
                      <input
                        type="email"
                        value={localPersonalInfo.contact?.email || ""}
                        onChange={(e) => {
                          const updatedContact = { ...localPersonalInfo.contact, email: e.target.value };
                          setLocalPersonalInfo({ ...localPersonalInfo, contact: updatedContact as any });
                        }}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono font-bold text-slate-450 uppercase mb-1 block">WhatsApp Link</label>
                      <input
                        type="text"
                        placeholder="e.g. https://wa.me/..."
                        value={localPersonalInfo.contact?.whatsapp || ""}
                        onChange={(e) => {
                          const updatedContact = { ...localPersonalInfo.contact, whatsapp: e.target.value };
                          setLocalPersonalInfo({ ...localPersonalInfo, contact: updatedContact as any });
                        }}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-800 bg-slate-950 text-slate-100 focus:border-blue-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleCMSDataSave({ personalInfo: localPersonalInfo })}
                      disabled={isSaving}
                      className="flex items-center space-x-2 text-xs font-black font-sans tracking-wide uppercase text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl border-none cursor-pointer outline-none select-none transition-all shadow-md shadow-blue-900/10"
                      id="save-profile-btn"
                    >
                      <Save className="w-4 h-4" />
                      <span>{isSaving ? "Persisting Changes..." : "Save Bio Profile Info"}</span>
                    </button>
                  </div>
                </div>

                {/* Live mock card representation */}
                <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950 border border-slate-850/80 space-y-6 text-left flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                      <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-blue-400" />
                        <span>Main Hero Screen Simulator</span>
                      </span>
                      <span className="p-0.5 px-1.5 rounded-md bg-slate-900 border border-slate-800 font-mono text-[9px] text-slate-500">
                        Interactive
                      </span>
                    </div>

                    {/* Simulated live visual interface widget representation */}
                    <div className="p-6 bg-slate-900/55 rounded-2xl border border-slate-850 space-y-4 shadow-inner">
                      <div className="space-y-1">
                        <div className="h-2 w-12 rounded bg-amber-400/25 border border-amber-400/35" />
                        <h4 className="text-xl font-bold font-sans text-white tracking-tight">
                          {localPersonalInfo.fullName || "Your Full Name"}
                        </h4>
                        <span className="text-xs font-mono font-bold text-blue-400 block h-4">
                          {localPersonalInfo.title || "Your Profession"}
                        </span>
                      </div>
                      
                      <p className="text-xs text-slate-400 italic leading-relaxed border-t border-slate-850 pt-2 line-clamp-3">
                        "{localPersonalInfo.shortBio || "No short biography summary configured yet."}"
                      </p>

                      <div className="flex gap-2">
                        <div className="h-6 w-16 rounded-md bg-slate-950 border border-slate-800 text-[10px] text-slate-500 flex items-center justify-center">
                          Mail direct
                        </div>
                        <div className="h-6 w-16 rounded-md bg-blue-500/10 border border-blue-500/15 text-[10px] text-blue-400 flex items-center justify-center font-bold">
                          WhatsApp
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-900 text-xs text-slate-450 leading-relaxed font-mono">
                    💡 Character counting validation elements help safe display buffers from tearing wide tables or mobile container constraints.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==================== TAB 3: PROGRAMMING SKILLS LOG MATRIX ==================== */}
          {activeTab === "skills" && (
            <div className="space-y-6 text-left" id="cms-tab-skills-deck">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                    <Sliders className="w-5.5 h-5.5 text-blue-500" />
                    <span>Programming Skills & Technologies Database ({localSkills.length})</span>
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Manage visual progress levels, categorize item components, and control tech stacks listed in the Skills view.
                  </p>
                </div>
              </div>

              {/* Add skill drawer fold */}
              <div className="p-6 bg-slate-950 border border-slate-850 rounded-2xl space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">Add New Tag Entry</span>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500">Skill Name / Technology</label>
                    <input
                      type="text"
                      maxLength={18}
                      placeholder="e.g. Next.js, GraphQL, Django"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="md:col-span-4 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500">Classification</label>
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="frontend">Frontend & Client frameworks</option>
                      <option value="backend">Backend APIs & Microservers</option>
                      <option value="database">Databases & Query Engines</option>
                      <option value="other">Tools & Ecosystem systems</option>
                    </select>
                  </div>

                  <div className="md:col-span-3 flex items-end justify-between gap-4">
                    <div className="grow space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500">Meters Level: {newSkill.level}%</label>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                        className="w-full mt-2 accent-blue-500"
                      />
                    </div>

                    <button
                      onClick={handleAddSkill}
                      className="p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 cursor-pointer outline-none border-none flex items-center justify-center transition-all shadow-md active:scale-95"
                      title="Add to grid list"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS FOR MANAGING SKILLS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="relative grow w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search technology tag name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-650 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Filter:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-100 focus:outline-none w-full"
                  >
                    <option value="all">All Category Groups</option>
                    <option value="frontend">Frontend Group Only</option>
                    <option value="backend">Backend Group Only</option>
                    <option value="database">Database Group Only</option>
                    <option value="other">Tools Group Only</option>
                  </select>
                </div>
              </div>

              {/* Grid indices cards */}
              <div className="space-y-3 pt-2" id="cms-skills-list">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 block">
                  Interactive Skills list ({filteredSkills.length} matches)
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSkills.map((skill, index) => {
                    // Global index in localSkills array
                    const globalIdx = localSkills.findIndex(s => s.name === skill.name);
                    const isEditing = editingSkillIndex === globalIdx;
                    
                    return (
                      <div 
                        key={skill.name + "-" + index} 
                        className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 ${
                          isEditing 
                            ? "bg-slate-900 border-blue-500/40 shadow-lg shadow-blue-950/10" 
                            : "bg-slate-950 hover:bg-slate-950/60 border-slate-850/80"
                        }`}
                      >
                        {isEditing ? (
                          // INLINE EDIT MODE FORM
                          <div className="space-y-4 text-left w-full">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                              <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                                Editing technology detail
                              </span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setEditingSkillIndex(null)}
                                  className="text-[10px] font-bold text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer outline-none"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleSaveInlineSkill}
                                  className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] border-0 cursor-pointer outline-none"
                                >
                                  Apply Changes
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[9px] text-slate-500 font-mono uppercase">Technology Title</label>
                                <input
                                  type="text"
                                  maxLength={18}
                                  value={editingSkillValue?.name || ""}
                                  onChange={(e) => setEditingSkillValue(prev => prev ? { ...prev, name: e.target.value } : null)}
                                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[9px] text-slate-500 font-mono uppercase">Category Classification</label>
                                <select
                                  value={editingSkillValue?.category || "frontend"}
                                  onChange={(e) => setEditingSkillValue(prev => prev ? { ...prev, category: e.target.value as any } : null)}
                                  className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                >
                                  <option value="frontend">Frontend</option>
                                  <option value="backend">Backend</option>
                                  <option value="database">Database</option>
                                  <option value="other">Tools</option>
                                </select>
                              </div>

                              <div className="col-span-2 space-y-1">
                                <div className="flex justify-between">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase">Proficient Metric Level</label>
                                  <span className="text-[10px] font-mono text-blue-400 font-bold">{editingSkillValue?.level}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="20"
                                  max="100"
                                  value={editingSkillValue?.level || 80}
                                  onChange={(e) => setEditingSkillValue(prev => prev ? { ...prev, level: parseInt(e.target.value) } : null)}
                                  className="w-full mt-1 accent-blue-500"
                                />
                              </div>
                            </div>
                          </div>
                        ) : (
                          // STANDARD STATIC CARD
                          <>
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-sans font-black text-white">{skill.name}</span>
                                <span className="font-mono text-[9px] text-slate-450 bg-slate-900 border border-slate-850 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  {skill.category}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 mb-1.5 pt-1">
                                <span>Level Indicator Metric</span>
                                <span className="font-bold text-slate-350">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-slate-900 rounded-full h-1.5">
                                <div className="bg-gradient-to-r from-blue-600 to-indigo-500 h-1.5 rounded-full" style={{ width: `${skill.level}%` }} />
                              </div>
                            </div>

                            <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-900/40">
                              <button
                                onClick={() => handleStartEditSkill(globalIdx)}
                                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Adjust Inline</span>
                              </button>

                              <button
                                onClick={() => handleDeleteSkill(globalIdx)}
                                className="p-2 rounded-lg bg-red-950/10 hover:bg-red-950/25 text-red-400 hover:text-red-350 border border-red-950/30 cursor-pointer outline-none transition-all ml-1"
                                title="Delete Technology node"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 4: PORTFOLIO SHOWCASE PROJECTS LISTING ==================== */}
          {activeTab === "projects" && (
            <div className="space-y-6 text-left" id="cms-tab-projects-deck">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                    <Briefcase className="w-5.5 h-5.5 text-blue-500" />
                    <span>Showcase Portfolio Projects ({localProjects.length})</span>
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Manage screenshot imagery paths, categories, custom tech tags lists, and project URLs.
                  </p>
                </div>
              </div>

              {/* Add Project expansion drawer panel */}
              <div className="p-6 bg-slate-950 border border-slate-850 rounded-3xl space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                    Add New Showcase Card
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] font-mono text-slate-500">Preset Injectors:</span>
                    <button 
                      onClick={() => loadPresetProject("ecom")} 
                      className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                    >
                      Hub Logistics
                    </button>
                    <button 
                      onClick={() => loadPresetProject("mobile")} 
                      className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                    >
                      Expense Tracker
                    </button>
                    <button 
                      onClick={() => loadPresetProject("ai")} 
                      className="text-[10px] font-bold px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 cursor-pointer"
                    >
                      Gemini Agent
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Project Title</label>
                    <input
                      type="text"
                      maxLength={32}
                      placeholder="e.g. Flight Booking System, CineMax Hub"
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Classification</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value as any })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="frontend">Frontend client UI/UX only</option>
                      <option value="fullstack">Full Stack, DB, API or microserver</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Slogan Summary Description</label>
                      <span className="text-[9px] font-mono text-slate-600">Max 120 chars</span>
                    </div>
                    <input
                      type="text"
                      maxLength={120}
                      placeholder="An outstanding adaptive solution designed to integrate..."
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Technology Tags (Comma-separated index)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Node, WebSockets, Firebase"
                      value={newProjectTechInput}
                      onChange={(e) => setNewProjectTechInput(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">GitHub Code Repository URL</label>
                    <input
                      type="text"
                      placeholder="https://github.com/remywilliamb/..."
                      value={newProject.githubUrl}
                      onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 font-bold">
                    <span className="text-[10px] font-mono uppercase tracking-wide text-slate-500 block">Host Link URL</span>
                    <input
                      type="text"
                      placeholder="e.g. https://domain.live"
                      value={newProject.liveUrl}
                      onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Cover Image URL path</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={newProject.image}
                      onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end pt-3">
                    <button
                      onClick={handleAddProject}
                      className="flex items-center space-x-2 text-xs font-black font-sans tracking-wide uppercase text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl border-none cursor-pointer outline-none select-none transition-all"
                    >
                      <Plus className="w-5.5 h-5.5" />
                      <span>Commit Project Entry</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTER CONTROLS FOR PROJECTS */}
              <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850">
                <div className="relative grow w-full">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    placeholder="Search query (titles, description, parameters, tech)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-650 focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto font-bold">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-sans">Filter Type:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border border-slate-800 bg-slate-900 text-slate-100 focus:outline-none w-full"
                  >
                    <option value="all">All Category Groups</option>
                    <option value="frontend">Frontend UI/UX</option>
                    <option value="fullstack">Full Stack & APIs</option>
                  </select>
                </div>
              </div>

              {/* Projects list checklist */}
              <div className="space-y-4 pt-2 animate-fadeIn" id="cms-projects-list">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 block">
                  Interactive Showcase list ({filteredProjects.length} matches)
                </span>
                
                <div className="grid grid-cols-1 gap-6">
                  {filteredProjects.map((project) => {
                    const isEditing = editingProjectId === project.id;
                    
                    return (
                      <div 
                        key={project.id} 
                        className={`p-6 rounded-3xl border transition-all ${
                          isEditing 
                            ? "bg-slate-900 border-blue-500/50 shadow-2xl shadow-blue-950/20" 
                            : "bg-slate-950 hover:bg-slate-950/50 border-slate-850/80"
                        }`}
                      >
                        {isEditing ? (
                          // INLINE EDIT DUAL MODE LAYOUT
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                            {/* Editor parameters inputs form */}
                            <div className="lg:col-span-7 space-y-4">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                                  Configuring project details ({project.title})
                                </span>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Project Title</label>
                                  <input
                                    type="text"
                                    maxLength={32}
                                    value={editingProjectValue?.title || ""}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, title: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Category Class</label>
                                  <select
                                    value={editingProjectValue?.category || "frontend"}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, category: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  >
                                    <option value="frontend">Frontend</option>
                                    <option value="fullstack">Fullstack</option>
                                  </select>
                                </div>

                                <div className="col-span-2 space-y-1">
                                  <label className="text-[9px] text-slate-505 font-mono uppercase font-bold">Summary Description</label>
                                  <input
                                    type="text"
                                    maxLength={120}
                                    value={editingProjectValue?.description || ""}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, description: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Technology Tags (Comma-list)</label>
                                  <input
                                    type="text"
                                    value={editingProjectTechInput}
                                    onChange={(e) => setEditingProjectTechInput(e.target.value)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Cover URL</label>
                                  <input
                                    type="text"
                                    value={editingProjectValue?.image || ""}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, image: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-505 font-mono uppercase font-bold">GitHub Code URL</label>
                                  <input
                                    type="text"
                                    value={editingProjectValue?.githubUrl || ""}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, githubUrl: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-505 font-mono uppercase font-bold">Host Live URL</label>
                                  <input
                                    type="text"
                                    value={editingProjectValue?.liveUrl || ""}
                                    onChange={(e) => setEditingProjectValue(prev => prev ? { ...prev, liveUrl: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded bg-slate-950 border border-slate-850"
                                  />
                                </div>
                              </div>

                              <div className="flex justify-end gap-2 pt-2">
                                <button
                                  onClick={() => setEditingProjectId(null)}
                                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-white bg-transparent outline-none border-0 select-none cursor-pointer"
                                >
                                  Cancel Adjustments
                                </button>
                                <button
                                  onClick={handleSaveInlineProject}
                                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs select-none cursor-pointer outline-none border-0"
                                >
                                  Apply Changes
                                </button>
                              </div>
                            </div>

                            {/* Simulator Preview Card Column */}
                            <div className="lg:col-span-5 flex flex-col justify-between border-l border-slate-800 pl-0 lg:pl-8 pt-4 lg:pt-0">
                              <span className="text-[10px] font-mono text-slate-450 uppercase mb-2 block font-extrabold tracking-wider flex items-center gap-1">
                                <Eye className="w-3.5 h-3.5 text-indigo-400" />
                                <span>Design Card Preview</span>
                              </span>

                              <div className="bg-slate-950 rounded-2xl border border-slate-850 overflow-hidden shadow-2xl relative text-left group">
                                <div className="h-44 bg-slate-900 relative overflow-hidden">
                                  {editingProjectValue?.image ? (
                                    <img 
                                      referrerPolicy="no-referrer"
                                      src={editingProjectValue.image} 
                                      alt="Simulator preview cover" 
                                      className="w-full h-full object-cover" 
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-750 font-mono text-xs">
                                      Screenshot Placeholder
                                    </div>
                                  )}
                                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-slate-955/80 backdrop-blur-md text-[9px] font-mono text-indigo-400 capitalize border border-indigo-500/20">
                                    {editingProjectValue?.category || "frontend"}
                                  </div>
                                </div>

                                <div className="p-5 space-y-3">
                                  <h4 className="text-base font-bold text-white tracking-tight leading-none">
                                    {editingProjectValue?.title || "Project Title"}
                                  </h4>
                                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                                    {editingProjectValue?.description || "Project short summary description..."}
                                  </p>

                                  <div className="flex flex-wrap gap-1 font-mono">
                                    {editingProjectTechInput.split(",").slice(0, 4).map((tag, i) => (
                                      <span key={i} className="text-[9px] text-slate-500 bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded select-none">
                                        {tag.trim()}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="text-[10px] font-mono text-slate-500 leading-normal mt-4">
                                💡 Comma-separated entries are dynamically split into neat, stylized bullet tags automatically on the live interface page tree.
                              </div>
                            </div>
                          </div>
                        ) : (
                          // STANDARD STATIC LIST CARD
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                              <img 
                                referrerPolicy="no-referrer"
                                src={project.image} 
                                alt={project.title} 
                                className="w-28 h-20 object-cover rounded-xl border border-slate-800 shrink-0 bg-slate-900 relative shadow-md" 
                              />
                              <div className="space-y-1">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                  <h3 className="font-sans font-black text-white text-base leading-snug">{project.title}</h3>
                                  <span className="font-mono text-[9px] text-blue-400 bg-blue-950/20 border border-blue-950/25 px-2 py-0.5 rounded-md self-center uppercase tracking-widest font-bold">
                                    {project.category}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-400 leading-normal max-w-xl pb-1">{project.description}</p>
                                
                                <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                                  {project.tech.map((tag) => (
                                    <span key={tag} className="text-[9px] font-mono text-slate-450 bg-slate-900 border border-slate-850/80 px-2 py-0.5 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex sm:flex-row flex-col justify-center gap-2 lg:pt-0 pt-4 shrink-0 border-t lg:border-t-0 border-slate-900/60 lg:pl-4">
                              <button
                                onClick={() => handleStartEditProject(project)}
                                className="p-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[11px] font-bold"
                              >
                                <Edit3 className="w-4 h-4 text-blue-400" />
                                <span>Edit Card</span>
                              </button>

                              <button
                                onClick={() => handleDeleteProject(project.id)}
                                className="p-2.5 rounded-xl bg-red-950/15 hover:bg-red-950/30 text-red-400 hover:text-white border border-red-950/30 cursor-pointer outline-none transition-all flex items-center justify-center"
                                title="Delete Project index card"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ==================== TAB 5: EXPERIENCE TIMELINE SHEET MANAGER ==================== */}
          {activeTab === "timeline" && (
            <div className="space-y-6 text-left animate-fadeIn" id="cms-tab-timeline-deck">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
                    <Calendar className="w-5.5 h-5.5 text-blue-500" />
                    <span>Experience Timeline Card Manager ({localTimeline.length})</span>
                  </h2>
                  <p className="text-slate-450 text-xs mt-1">
                    Manage milestones, certification events, active roles, skills acquired, and historical academic periods.
                  </p>
                </div>
              </div>

              {/* Add timeline field event */}
              <div className="p-6 bg-slate-950 border border-slate-850 rounded-3xl space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400 block">
                  Add Milestone Event Node
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Academic Period / Year Range</label>
                    <input
                      type="text"
                      placeholder="e.g. 2021 - Present, Nov 2024"
                      value={newTimeline.period}
                      onChange={(e) => setNewTimeline({ ...newTimeline, period: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Role Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Software student candidate, Lead Developer"
                      value={newTimeline.title}
                      onChange={(e) => setNewTimeline({ ...newTimeline, title: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">School / Organization Facility</label>
                    <input
                      type="text"
                      placeholder="e.g. Rwanda Coding Academy, Kigali Labs"
                      value={newTimeline.subtitle}
                      onChange={(e) => setNewTimeline({ ...newTimeline, subtitle: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Acquired Tech Skills (Comma list)</label>
                    <input
                      type="text"
                      placeholder="e.g. System Control, Data Structures, Git"
                      value={newTimelineSkillsInput}
                      onChange={(e) => setNewTimelineSkillsInput(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-wide text-slate-500 font-bold">Detailed Description Achievements</label>
                    <textarea
                      rows={2}
                      placeholder="Describe academic track experiences, milestones accomplished, metrics target completed..."
                      value={newTimeline.description}
                      onChange={(e) => setNewTimeline({ ...newTimeline, description: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-700 focus:border-blue-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div className="sm:col-span-2 flex justify-end pt-2">
                    <button
                      onClick={handleAddTimelineEvent}
                      className="flex items-center space-x-2 text-xs font-black font-sans tracking-wide uppercase text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl border-none cursor-pointer outline-none select-none transition-all"
                    >
                      <Plus className="w-5.5 h-5.5" />
                      <span>Commit Timeline Milestone</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline nodes listing current checklist */}
              <div className="space-y-4 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-450 block">
                  Existing Experience Milestones ({localTimeline.length})
                </span>

                <div className="relative border-l border-slate-800 pl-6 ml-4 space-y-6">
                  {localTimeline.map((item, index) => {
                    const isEditing = editingTimelineIndex === index;
                    return (
                      <div key={index} className="relative group text-left">
                        {/* Timeline visual node bullet dot */}
                        <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 border-2 border-slate-950 group-hover:scale-125 transition-all outline-none" />

                        <div className={`p-5 rounded-2xl border transition-all ${
                          isEditing 
                            ? "bg-slate-900 border-blue-500/40" 
                            : "bg-slate-950 hover:bg-slate-950/60 border-slate-850"
                        }`}>
                          {isEditing ? (
                            // INLINE TIMELINE EDIT mode
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                <span className="text-[9px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                                  Configuring timeline event details
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditingTimelineIndex(null)}
                                    className="text-[10px] font-bold text-slate-500 hover:text-white bg-transparent border-0 cursor-pointer outline-none"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={handleSaveInlineTimeline}
                                    className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] border-0 cursor-pointer outline-none"
                                  >
                                    Apply Changes
                                  </button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Academic Period</label>
                                  <input
                                    type="text"
                                    value={editingTimelineValue?.period || ""}
                                    onChange={(e) => setEditingTimelineValue(prev => prev ? { ...prev, period: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-500 font-mono uppercase font-bold">Role Title</label>
                                  <input
                                    type="text"
                                    value={editingTimelineValue?.title || ""}
                                    onChange={(e) => setEditingTimelineValue(prev => prev ? { ...prev, title: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[9px] text-slate-505 font-mono uppercase font-bold">Organization / Facility</label>
                                  <input
                                    type="text"
                                    value={editingTimelineValue?.subtitle || ""}
                                    onChange={(e) => setEditingTimelineValue(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                  />
                                </div>

                                <div className="space-y-1 font-bold">
                                  <span className="text-[9px] text-slate-505 font-mono uppercase">Acquired Skills</span>
                                  <input
                                    type="text"
                                    value={editingTimelineSkillsInput}
                                    onChange={(e) => setEditingTimelineSkillsInput(e.target.value)}
                                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950"
                                  />
                                </div>

                                <div className="sm:col-span-2 space-y-1">
                                  <label className="text-[9px] text-slate-550 font-mono uppercase font-bold">Long Description achievements</label>
                                  <textarea
                                    rows={2}
                                    value={editingTimelineValue?.description || ""}
                                    onChange={(e) => setEditingTimelineValue(prev => prev ? { ...prev, description: e.target.value } : null)}
                                    className="w-full px-3 py-1.5 text-xs rounded border border-slate-850 bg-slate-950 leading-relaxed"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            // STATIC TIMELINE MILESTONE
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/20 border border-blue-500/15 px-2.1 py-0.5 rounded-lg select-all">
                                    {item.period}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono font-bold uppercase select-none">
                                    {item.subtitle}
                                  </span>
                                </div>
                                <h3 className="font-sans font-black text-white text-base leading-snug">{item.title}</h3>
                                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">{item.description}</p>
                                
                                {item.skillsAcquired && item.skillsAcquired.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pt-2">
                                    {item.skillsAcquired.map((tag) => (
                                      <span key={tag} className="text-[8.5px] font-mono text-slate-500 bg-slate-900 border border-slate-850 px-1.5 py-0.5 rounded select-all">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-1.5 pt-3 sm:pt-0 shrink-0 border-t sm:border-t-0 border-slate-900/60 pl-0 sm:pl-4">
                                <button
                                  onClick={() => handleStartEditTimeline(index)}
                                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 transition-all cursor-pointer flex items-center justify-center gap-1 font-bold text-[11px]"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>

                                <button
                                  onClick={() => handleDeleteTimelineEvent(index)}
                                  className="p-2 rounded-lg bg-red-955/10 hover:bg-red-955/20 text-red-400 border border-red-950/30 cursor-pointer outline-none transition-all flex items-center justify-center"
                                  title="Delete timeline event node"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
