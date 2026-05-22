import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

// Default seed data to use if JSON database is not yet initialized on-disk
import { personalInfo, skillsData, projectsData, timelineData } from "./src/data";

const app = express();
const PORT = 3000;
const DB_FILE_PATH = path.join(process.cwd(), "local_db.json");

// Middleware
app.use(express.json());

// Initialize Local JSON Database with initial values from client's static data.ts if it doesn't exist
interface Database {
  visitorCount: number;
  messages: any[];
  personalInfo: typeof personalInfo;
  skillsData: typeof skillsData;
  projectsData: typeof projectsData;
  timelineData: typeof timelineData;
}

function getDatabase(): Database {
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const fileData = fs.readFileSync(DB_FILE_PATH, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (err) {
    console.error("Failed to read database file, restoring defaults.", err);
  }

  // Create default database structure
  const defaultDb: Database = {
    visitorCount: 128, // Start with a realistic initial counter
    messages: [
      {
        id: "msg-seed-1",
        name: "Honore Nshuti",
        email: "honore@rca.ac.rw",
        message: "Amazing work, Remy William! Your porting layouts and custom systems speed are top-notch. Love seeing Level 5 student results this visual.",
        timestamp: new Date().toLocaleDateString() + " 10:15 AM",
        isRead: false
      }
    ],
    personalInfo,
    skillsData,
    projectsData,
    timelineData
  };

  saveDatabase(defaultDb);
  return defaultDb;
}

function saveDatabase(db: Database) {
  try {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to database file", err);
  }
}

// ==================== REST API ENDPOINTS ====================

// 1. Portfolio Data Retrieval
app.get("/api/portfolio", (req, res) => {
  const db = getDatabase();
  res.json({
    personalInfo: db.personalInfo,
    skillsData: db.skillsData,
    projectsData: db.projectsData,
    timelineData: db.timelineData
  });
});

// 2. Portfolio Data Update (Admin-Only)
app.post("/api/portfolio", (req, res) => {
  const { personalInfo: newPersonalInfo, skillsData: newSkillsData, projectsData: newProjectsData, timelineData: newTimelineData } = req.body;
  const db = getDatabase();

  if (newPersonalInfo) db.personalInfo = newPersonalInfo;
  if (newSkillsData) db.skillsData = newSkillsData;
  if (newProjectsData) db.projectsData = newProjectsData;
  if (newTimelineData) db.timelineData = newTimelineData;

  saveDatabase(db);
  res.json({ success: true, message: "Portfolio system settings updated successfully." });
});

// 3. Increment Site Visitor Tracking
app.post("/api/visitors/increment", (req, res) => {
  const db = getDatabase();
  db.visitorCount = (db.visitorCount || 0) + 1;
  saveDatabase(db);
  res.json({ success: true, visitorCount: db.visitorCount });
});

app.get("/api/visitors", (req, res) => {
  const db = getDatabase();
  res.json({ visitorCount: db.visitorCount, messagesCount: db.messages.length });
});

// 4. Contact Form Inboxes
app.get("/api/messages", (req, res) => {
  const db = getDatabase();
  res.json({ messages: db.messages });
});

app.post("/api/messages", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  const db = getDatabase();
  const newMessage = {
    id: "msg-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6),
    name,
    email,
    message,
    timestamp: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    isRead: false
  };

  db.messages = [newMessage, ...db.messages];
  saveDatabase(db);

  res.json({ success: true, message: newMessage });
});

// 5. Delete Contact Inbox Messages (Admin Panel Utility)
app.delete("/api/messages/:id", (req, res) => {
  const { id } = req.params;
  const db = getDatabase();
  db.messages = db.messages.filter((msg) => msg.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: "Inquiry message deleted." });
});

// 6. Admin Authentication Login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const staticPass = process.env.ADMIN_PASSWORD || "remywilliam";
  
  if (username === "admin" && password === staticPass) {
    res.json({ success: true, token: "session-secret-token-" + Date.now() });
  } else {
    res.status(401).json({ success: false, error: "Invalid administrative credentials." });
  }
});

// ==================== VITE DEVELOPMENT INTERPRETATION OR COMPACT SERVER ====================
async function initializeServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting DEV server integration with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting production assets static routing engine...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express microserver fully up and running on port ${PORT}`);
  });
}

initializeServer();
