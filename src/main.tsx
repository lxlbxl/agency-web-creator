import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { initAdminUser } from "./utils/initAdminUser.ts";

// Initialize admin user
initAdminUser().catch(console.error);

createRoot(document.getElementById("root")!).render(<App />);