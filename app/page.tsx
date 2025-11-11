"use client";

import React, { useState, useEffect } from 'react';

// --- Icon Placeholders ---
const icons = {
  Mail: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Phone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Github: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>,
  Linkedin: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>,
  Twitter: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>,
  Facebook: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>,
  Behance: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12Z"></path><path d="M19 12c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7 7-3.13 7-7Z"></path><path d="M16 12H19"></path><path d="M5 12H8"></path><path d="M12 5V8"></path><path d="M12 16v3"></path></svg>,
  Instagram: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>,
  Pinterest: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.16 2.05c-3.15 0-5.71 2.56-5.71 5.71 0 1.25.4 2.4 1.09 3.32.22.28-.01.69-.32.74l-1.92.3c-.2.03-.38-.13-.42-.32C4.3 9.4 4 8.5 4 7.76c0-4.43 3.57-8 8-8s8 3.57 8 8c0 2.21-1.03 4.2-2.6 5.5l-.23.19c-.3.26-.77.17-1.02-.13-.25-.3-.16-.77.13-1.02l.23-.19c1.3-1.09 2.07-2.7 2.07-4.48 0-3.32-2.68-6-6-6z"></path><path d="M12 12c-1.38 0-2.5 1.12-2.5 2.5v4.5c0 .55.45 1 1 1s1-.45 1-1v-4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4.5c0 .55.45 1 1 1s1-.45 1-1v-4.5c0-1.38-1.12-2.5-2.5-2.5z"></path></svg>,
  Briefcase: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>,
  Code: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>,
  Smartphone: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>,
  Database: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>,
  Server: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>,
  ArrowRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>,
  Menu: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
  Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
  Download: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>,
  Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>,
  ExternalLink: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
  // --- NEW ICONS ADDED ---
  Palette: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.34 0 2.62-.26 3.8-.73M20 9c0 4.42-3.58 8-8 8"></path><path d="M12 2a10 10 0 0 0-3.8 19.27C10.63 21.74 13.9 20.3 16 17c3-4.4 2-11-2-11"></path><path d="M14 6c0 2.21-1.79 4-4 4"></path></svg>,
  Laravel: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8.5v-3l6 4v3l-6 4v-3l-6 4v-3l6-4v3l6-4v-3l-6-4zM6 15.5v-3l-6 4v3l6 4v-3l6-4v-3l-6-4z"/></svg>,
  Android: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zM12 18c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM8.5 6.5h7M8.5 8.5h7"/></svg>,
  Wordpress: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-3.1 0-7.3-1.4-7.3-1.4C3.8 10 3 11 3 12c0 3.9 5.8 7 9 7s9-3.1 9-7c0-1-0.8-2-1.7-2.6C19.3 10.6 15.1 12 12 12z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 5.5 4.5 10 10 10s10-4.5 10-10C22 6.5 17.5 2 12 2z"/><path d="M12.4 4.1c-1 0-2.2 0.5-2.2 1.6 0 0.8 0.9 1.3 1.6 1.3 0.9 0 2-0.7 2-1.6 0-1.1-1.2-1.3-1.4-1.3zM8.5 9.1c0 0.6 0.4 1 0.8 1s0.8-0.4 0.8-1-0.4-1-0.8-1-0.8 0.4-0.8 1zM14.7 9.1c0 0.6 0.4 1 0.8 1s0.8-0.4 0.8-1-0.4-1-0.8-1-0.8 0.4-0.8 1zM6.2 6c0 1 0.6 1.7 1.2 1.7s1.2-0.7 1.2-1.7-0.6-1.7-1.2-1.7-1.2 0.7-1.2 1.7zM15.6 6c0 1 0.6 1.7 1.2 1.7s1.2-0.7 1.2-1.7-0.6-1.7-1.2-1.7-1.2 0.7-1.2 1.7z"/></svg>,
  Photoshop: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M11 10c0-2.5 1.5-4 4-4"/><path d="M12 10s2.5 0 2.5 2.5-1 2.5-2.5 2.5"/><path d="M10 14c0 2.5 1.5 4 4 4"/></svg>,
  // --- START: ADDED NEW ICONS ---
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
  Html5: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z"/><path d="M9.5 10.5l5 0 0.5-2h-6l0.5 2zM10 14.5l2 0.5 2-0.5 0.5-2.5h-5l0.5 2.5z"/></svg>,
  Css3: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4z"/><path d="M9.5 10.5h5l-0.5-2h-4l-0.5 2zM10 14.5l2 0.5 2-0.5 0.5-2.5h-5l0.5 2.5z"/></svg>,
  Javascript: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M10 9v6h2a2 2 0 0 0 0-4h-2"/><path d="M14 15v-4.5a2.5 2.5 0 0 1 5 0V15"/></svg>,
  Php: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="10" ry="9"/><path d="M8 9v6h2.5a2.5 2.5 0 0 0 0-5H8zm9 0v6h2.5a2.5 2.5 0 0 0 0-5H17z"/></svg>,
  Vscode: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 12l6-6L14 12l-5.5 6-6-6zM15 4l5.5 5.5-2.5 2.5-5.5-5.5L15 4zM15 20l5.5-5.5-2.5-2.5-5.5 5.5L15 20z"/></svg>,
  Git: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4v.01"/><path d="M16 12a4 4 0 0 0-4-4"/></svg>,
  // --- END: ADDED NEW ICONS ---
  Figma: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"></path><path d="M12 15a3 3 0 1 0 0-6"></path><path d="M12 9a3 3 0 1 0 0 6"></path><path d="M15 12a3 3 0 1 0-6 0"></path><path d="M12 12a3 3 0 1 0 0-6"></path><path d="M9 12a3 3 0 1 0 6 0"></path><path d="M15 12a3 3 0 1 0 0 6"></path><path d="M12 15a3 3 0 1 0 0-6"></path><path d="M12 9a3 3 0 1 0 0 6"></path><path d="M16.8 7.2a3 3 0 1 0-4.8 4.8 3 3 0 1 0 4.8-4.8z"></path></svg>,
  React: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="12" rx="11" ry="4.2"></ellipse><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)"></ellipse><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)"></ellipse><circle cx="12" cy="12" r="1.5"></circle></svg>,
  NodeJs: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.23a2.02 2.02 0 0 0-1.28.48L5.2 6.69A2 2 0 0 0 4 8.41v7.18a2 2 0 0 0 1.2 1.72l5.52 3.98a2.02 2.02 0 0 0 2.56 0l5.52-3.98A2 2 0 0 0 20 15.59V8.41a2 2 0 0 0-1.2-1.72l-5.52-3.98A2.02 2.02 0 0 0 12 2.23z"></path><path d="M10.2 11.26v1.48a1.65 1.65 0 0 0 2.6 1.4L15 12l-2.2-1.14a1.65 1.65 0 0 0-2.6 1.4z"></path></svg>,
  Lightbulb: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1.3.5 2.6 1.5 3.5.7.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>,
};

// Create a Type for the icon names
type IconName = keyof typeof icons;

// Define props for the Icon component
type IconProps = {
  name: IconName;
  className?: string; // className can be optional
};

const Icon = ({ name, className }: IconProps) => {
  const IconComponent = icons[name] || (() => <div className={className}>?</div>);
  // Add the className to the SVG component
  const SvgComponent = IconComponent();
  return React.cloneElement(SvgComponent, { className });
};
// --- End Icon Placeholders ---


// --- Header Component ---
// Add 'activeSection' to the props
const Header = ({ activeSection }: { activeSection: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // --- FIXED: ADDED MISSING NAV ITEMS ---
  const navItems = [ "About Me", "Skills", "Resume", "Technologies", "Projects", "Design", "Writings", "Contact"];

  return (
    // Updated Header classes: removed relative, z-50. Added max-w-7xl
    <header className="relative bg-gray-900 bg-opacity-40 backdrop-blur-md rounded-full border border-white/10 max-w-7xl mx-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated padding and height */}
        <div className="flex justify-between items-center h-16 px-6">
          {/* Logo Updated */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Icon name="Code" className="h-6 w-6 text-lime-400" />
            <a href="#" className="text-2xl font-bold text-white">
              Jisan
            </a>
          </div>

          {/* Desktop Navigation - Updated to lg breakpoint */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                // Updated href logic for "About Me"
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                // Updated styling for active "Home" item
                className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  // Use activeSection prop instead of hard-coding "Home"
                  activeSection === item.toLowerCase().replace(" ", "-") ? "text-lime-400" : ""
                }`}
              >
                {item}
                {/* Added underline for "Home" */}
                {/* Use activeSection prop instead of hard-coding "Home" */}
                {activeSection === item.toLowerCase().replace(" ", "-") && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-lime-400 rounded-full"></span>
                )}
              </a>
            ))}
          </nav>

          {/* Hire Me Button (Desktop) - Updated to lg breakpoint */}
          <div className="hidden lg:block ml-6">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all transform hover:scale-105"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button - Updated to lg breakpoint */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <Icon name="X" className="h-6 w-6" />
              ) : (
                <Icon name="Menu" className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Updated to lg breakpoint */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 bg-opacity-50 backdrop-blur-md absolute top-full left-0 right-0 rounded-b-2xl shadow-lg border border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsMenuOpen(false)}
                // Updated styling for active "Home" item
                className={`text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  // Use activeSection prop instead of hard-coding "Home"
                  activeSection === item.toLowerCase().replace(" ", "-") ? "text-lime-400" : ""
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="pb-4 px-5">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// --- Hero Component ---
const Hero = () => {
  const socialLinks: { name: string; icon: IconName; url: string }[] = [
    { name: "Github", icon: "Github", url: "https://github.com/rafijuljisan/" },
    { name: "Linkedin", icon: "Linkedin", url: "https://www.linkedin.com/in/jisan-sheikh-5828441b3/" },
    { name: "Twitter", icon: "Twitter", url: "https://x.com/Jisan01741770/" },
    { name: "Facebook", icon: "Facebook", url: "https://www.facebook.com/jesan0195/" },
    { name: "Behance", icon: "Behance", url: "https://www.behance.net/mdjs" },
    { name: "Instagram", icon: "Instagram", url: "https://www.instagram.com/jesan0195/" },
    { name: "Pinterest", icon: "Pinterest", url: "https://www.pinterest.com/rafijuljisan/" }, // Updated icon name:}
  ];

  return (
    // Updated padding-top to 'pt-32' to account for the new sticky header
    // --- UPDATED THIS LINE ---
    <section id="home" className="min-h-screen flex items-center text-white">
      {/* --- HEADER REMOVED FROM HERE --- */}
      
      {/* --- UPDATED THIS LINE (removed mt-16, added padding) --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16"> 
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              Web Developer & Visual Designer
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              Performance-oriented developer and designer, dedicated to optimizing
              human-computer interactions for diverse applications.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-lime-400 transition-colors"
                >
                  <Icon name={link.icon} className="w-6 h-6" />
                </a>
              ))}
            </div>
            <a
              href="./Jisan Sheikh Resome_CV.pdf" // Placeholder link
              download
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all transform hover:scale-105"
            >
              Download CV <Icon name="Download" className="ml-2 -mr-1 h-5 w-5" />
            </a>
          </div>

          {/* Right Side: Image */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 lg:w-[36rem] lg:h-[36rem] rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
                <img
                  src="/jisan_image.jpg" // --- FIXED IMAGE PATH ---
                  alt="Jisan Sheikh - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Optional: Floating skill tags like in the image */}
              <SkillTag name="Laravel" position="top-10 -left-10" />
              <SkillTag name="WordPress" position="top-1/3 -right-12" />
              <SkillTag name="Android Apps" position="bottom-1/3 -left-16" />
              <SkillTag name="Photoshop" position="bottom-10 -right-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper component for floating skill tags in Hero
type SkillTagProps = {
  name: string;
  position: string;
};
const SkillTag = ({ name, position }: SkillTagProps) => (
  <div
    className={`absolute ${position} bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 text-white text-sm px-4 py-2 rounded-full shadow-lg hidden lg:block`}
  >
    {name}
  </div>
);

// --- Stats Component ---
const Stats = () => {
  return (
    <section id="about-me" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info Card */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border-white/10 p-6 rounded-lg border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <InfoItem
                icon="Mail"
                label="Email"
                value="rafijuljisan@gmail.com"
                href="mailto:rafijuljisan@gmail.com"
              />
              <InfoItem
                icon="Phone"
                label="Phone"
                value="+880 1957-850240"
                href="tel:+8801957850240"
              />
              <InfoItem
                icon="MapPin"
                label="Location"
                value="Mirpur-1, Dhaka-1216"
              />
            </div>
          </div>

          {/* Services Card */}
          <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border-white/10 p-6 rounded-lg border border-gray-800 shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">My Services</h3>
            <div className="space-y-4">
              <ServiceItem
                icon="Code"
                title="Web Development"
                description="Robust Laravel, React, and WordPress solutions."
              />
              <ServiceItem
                icon="Smartphone"
                title="App Development"
                description="Building modern and responsive Android apps."
              />
              <ServiceItem
                icon="Palette"
                title="Visual & UI Design"
                description="Crafting assets with Photoshop, Illustrator, and Figma."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type InfoItemProps = {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

const InfoItem = ({ icon, label, value, href }: InfoItemProps) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-full flex items-center justify-center">
      <Icon name={icon} className="w-6 h-6 text-lime-400" />
    </div>
    <div className="ml-4">
      <span className="block text-sm text-gray-400">{label}</span>
      {href ? (
        <a
          href={href}
          className="block text-lg font-medium text-white hover:text-lime-400 transition-colors"
        >
          {value}
        </a>
      ) : (
        <span className="block text-lg font-medium text-white">{value}</span>
      )}
    </div>
  </div>
);

type ServiceItemProps = {
  icon: IconName;
  title: string;
  description: string;
};

const ServiceItem = ({ icon, title, description }: ServiceItemProps) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-12 h-12 bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg flex items-center justify-center">
      <Icon name={icon} className="w-6 h-6 text-lime-400" />
    </div>
    <div className="ml-4">
      <h4 className="text-lg font-medium text-white">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

// --- Skills Component ---
const Skills = () => {
  const skills = [
    { name: "HTML / CSS / JavaScript", level: "75%" },
    { name: "AI Automation", level: "85%" },
    { name: "Laravel (PHP)", level: "90%" },
    { name: "Android (Native/Hybrid)", level: "70%" },
    { name: "WordPress / Plugin Dev", level: "90%" },
    { name: "Adobe Photoshop / Illustrator", level: "95%" },
    { name: "Adobe Premiere Pro / After Effects", level: "85%" },
    { name: "Database (SQL / MongoDB)", level: "80%" },
    { name: "Digital Marketing", level: "90%" },
    { name: "Server Management", level: "85%" },
    { name: "Version Control (Git & GitHub)", level: "80%" },
    { name: "Project Management", level: "90%" },
  ];

  return (
    <section id="skills" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 bg-opacity-50 backdrop-blur-md border-white/10 p-6 md:p-8 rounded-lg border border-gray-800 shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {skills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

type SkillBarProps = {
  name: string;
  level: string;
};

const SkillBar = ({ name, level }: SkillBarProps) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-base font-medium text-gray-200">{name}</span>
      <span className="text-sm font-medium text-gray-400">{level}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-lime-400 h-2.5 rounded-full"
        style={{ width: level }}
      ></div>
    </div>
  </div>
);

// --- Resume (Experience & Education) Component ---
const Resume = () => {
  const experience = [
    {
      date: "2022 - Present",
      title: "Senior Graphic Designer",
      company: "Nixsoletech, Mirpur",
      description:
        "Develop graphics for emails, websites, and promotional materials. Maintained brand consistency and edited video content.",
    },
    {
      date: "2022 - Present",
      title: "Visual Content Developer",
      company: "Open Window, Mirpur",
      description:
        "Integrated visuals into websites using CMS (WordPress). Designed custom graphics, logos, and managed digital assets.",
    },
    {
      date: "2018 - 2022",
      title: "Manager & Sales Executive",
      company: "Turbo Motors, Dhaka",
      description:
        "Managing all the sales and marketing activities of the company.",
    },
  ];

  const education = [
    {
      date: "2021 - 2022",
      title: "Bachelor of Social Science (BSS)",
      company: "Savar Govt. College",
      description: "Completed Bachelor of Social Science (BSS).",
    },
    {
      date: "2019 - 2020",
      title: "Higher Secondary Certificate (HSC)",
      company: "Govt Ainuddin College",
      description: "Completed Higher Secondary School Certificate.",
    },
    {
      date: "2019 - 2020",
      title: "Secondary School Certificate (SSC)",
      company: "Vushna-Laxmandia High School",
      description: "Completed Secondary School Certificate.",
    },
  ];

  return (
    // --- FIXED: ADDED ID FOR SCROLL-SPY ---
    <section id="resume" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Experience Column */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <Icon name="Briefcase" className="inline-block w-8 h-8 mr-2 -mt-1 text-lime-400" />
              Experience
            </h2>
            <Timeline items={experience} />
          </div>

          {/* Education Column */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              <Icon name="Star" className="inline-block w-8 h-8 mr-2 -mt-1 text-lime-400" />
              Education
            </h2>
            <Timeline items={education} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Timeline component
type TimelineItemProps = {
  date: string;
  title: string;
  company: string;
  description: string;
};

type TimelineProps = {
  items: TimelineItemProps[];
};

const Timeline = ({ items }: TimelineProps) => (
  <div className="relative border-l-2 border-gray-700 pl-6">
    {items.map((item, index) => (
      <div key={index} className="mb-8 relative">
        {/* Timeline Dot */}
        <div className="absolute -left-8 top-1.5 w-4 h-4 bg-lime-400 rounded-full border-4 border-gray-900"></div>
        {/* Date Badge */}
        <span className="inline-block bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 text-gray-300 text-xs font-semibold px-3 py-1 rounded-full mb-2">
          <Icon name="Calendar" className="inline-block w-3 h-3 mr-1.5" />
          {item.date}
        </span>
        {/* Title & Company */}
        <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
        <h4 className="text-md font-medium text-gray-400 mb-2">
          {item.company}
        </h4>
        {/* Description */}
        <p className="text-gray-300">{item.description}</p>
      </div>
    ))}
  </div>
);

// --- Technologies Component ---
const Technologies = () => {
  // List of tools from your image
  const toolsList: { name: string; icon: IconName }[] = [
    { name: "Photoshop", icon: "Photoshop" },
    { name: "Illustrator", icon: "Palette" }, // Using 'Palette' as a placeholder
    { name: "After Effects", icon: "Briefcase" }, // Using 'Briefcase' as a placeholder
    { name: "Premiere Pro", icon: "Briefcase" }, // Using 'Briefcase' as a placeholder
    { name: "Bootstrap", icon: "Code" }, // Using 'Code' as a placeholder
    { name: "Cloudflare", icon: "Server" }, // Using 'Server' as a placeholder
    { name: "Discord", icon: "Phone" }, // Using 'Phone' as a placeholder
    { name: "SVG", icon: "Code" }, // Using 'Code' as a placeholder
    { name: "Node.js", icon: "NodeJs" }, // --- THIS LINE WAS FIXED ---
    { name: "Figma", icon: "Figma" },
    { name: "WordPress", icon: "Wordpress" },
    { name: "PHP", icon: "Php" },
    { name: "HTML5", icon: "Html5" },
    { name: "CSS3", icon: "Css3" },
    { name: "JavaScript", icon: "Javascript" },
    { name: "VS Code", icon: "Vscode" },
    { name: "GitHub", icon: "Github" },
    { name: "Git", icon: "Git" },
  ];
  const techs: { name: string; icon: IconName }[] = [
    { name: "React", icon: "React" },
    { name: "Node.js", icon: "NodeJs" },
    { name: "Laravel", icon: "Laravel" },
    { name: "Android", icon: "Android" },
    { name: "WordPress", icon: "Wordpress" },
    { name: "Photoshop", icon: "Photoshop" },
    { name: "Figma", icon: "Figma" },
    { name: "Firebase", icon: "Server" },
  ];

  return (
    // --- FIXED: ADDED ID FOR SCROLL-SPY ---
    
    <section id="technologies" className="relative overflow-hidden py-16 text-white">
      
      {/* --- WRAP EXISTING CONTENT in relative z-10 container --- */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- "TECHNOLOGIES" SECTION NOW FIRST --- */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Technologies I work with
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          I am proficient in a wide range of modern web, app, and design technologies, allowing
          me to build scalable and efficient applications.
        </p>

        {/* Tech Icons Grid */}
        <div className="relative flex justify-center items-center">
           {/* Center Image */}
           <img
              src="/jisan_image.jpg" // --- FIXED IMAGE PATH ---
              alt="Jisan"
              className="w-24 h-24 rounded-full z-10 border-4 border-gray-700 object-cover"
            />
            
            {/* Surrounding Tech Icons */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 absolute w-full max-w-lg">
                {techs.map((tech) => (
                    <TechIcon key={tech.name} name={tech.name} icon={tech.icon} />
                ))}
            </div>
            {/* Simple grid fallback */}
             <div className="grid grid-cols-4 md:grid-cols-8 gap-8 opacity-0">
                {/* --- FIXED THE KEY ERROR --- */}
                {techs.map((tech, index) => (
                    // Using index as key since tech object isn't used here, just for spacing
                    <TechIcon key={index} name="Code" icon="Code" />
                ))}
            </div>
        </div>
        
        {/* A more standard grid layout (easier to implement) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 mt-20">
            {techs.map((tech) => (
                 <div key={tech.name} className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all transform hover:-translate-y-1">
                    <Icon name={tech.icon} className="w-12 h-12 text-lime-400 mb-2" />
                    <span className="text-sm font-medium">{tech.name}</span>
                </div>
            ))}
        </div>
        
        {/* --- "SKILLS & TOOLS" GRID NOW SECOND --- */}
        <h2 className="text-3xl font-bold mt-20 mb-10 flex items-center gap-3">
          <Icon name="Settings" className="w-8 h-8 text-lime-400" />
          Skills & Tools
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 mb-20">
          {toolsList.map((tool) => (
            <div 
              key={tool.name} 
              className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg border border-gray-800 hover:bg-gray-800 transition-all transform hover:-translate-y-1"
              title={tool.name} // Add tooltip for the name
            >
              <Icon name={tool.icon} className="w-10 h-10 text-lime-400" />
              {/* --- ADDED THIS LINE --- */}
              <span className="text-xs text-gray-300 mt-2 text-center break-words">{tool.name}</span>
            </div>
          ))}
        </div>
        {/* --- END OF MOVED GRID --- */}

      </div>
      {/* --- END OF CONTENT WRAPPER --- */}
    </section>
  );
};

type TechIconProps = {
  name: string;
  icon: IconName;
};

const TechIcon = ({ name, icon }: TechIconProps) => (
    <div className="flex flex-col items-center p-3 bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-full border border-gray-700 shadow-lg">
        <Icon name={icon} className="w-8 h-8 text-lime-400" />
    </div>
);


// --- Projects (Works) Component ---
const Projects = () => {
  // --- REMOVED filter state ---

  // --- REPLACED 'projects' with 'allProjects' and expanded ---
  const allProjects: ProjectProps[] = [
    {
  year: "2025",
  title: "School Website",
  description: "A modern, responsive website for a local school, featuring event management, news updates, and an integrated blog using Next.js and MDX for content management.",
  tags: ["Next.js", "Tailwind CSS", "MDX", "Education", "Responsive Design"],
  imgSrc: "./School Website.png",
  liveSiteUrl: "https://escl.openwindowbd.com/",
  layout: "2-col",
},
{
  year: "2025",
  title: "Task Management Extension for Chrome",
  description: "A Chrome extension that helps users manage their tasks efficiently with features like task categorization, deadlines, and reminders, built using React and Tailwind CSS.",
  tags: ["Chrome Extension", "React", "Tailwind CSS", "Productivity", "Task Manager"],
  imgSrc: "./Task Management extension for chrome.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://technomenia.com/",
  layout: "1-col",
},
{
  year: "2023",
  title: "WordPress Newspaper Website",
  description: "A dynamic news website built with WordPress, featuring custom post types, categories, and a user-friendly interface for easy content management and reader engagement.",
  tags: ["WordPress", "PHP", "MySQL", "News Portal", "Responsive Design"],
  imgSrc: "./News site.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://bhorerdut.com/",
  layout: "1-col",
},
{
  year: "2024",
  title: "Complete School Management Apps",
  description: "A comprehensive school management system with modules for student information, attendance, grading, and fee management, built with a focus on usability and scalability.",
  tags: ["React", "Next.js", "Tailwind CSS", "School ERP", "Full Stack"],
  imgSrc: "./School Management apps.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://escl.openwindowbd.com/login/",
  layout: "1-col",
},
{
  year: "2025",
  title: "WordPress E-commerce Site",
  description: "E-commerce website built on WordPress with custom themes and plugins, optimized for performance and SEO, providing a seamless shopping experience.",
  tags: ["WordPress", "WooCommerce", "PHP", "E-commerce", "SEO Optimization"],
  imgSrc: "./Wordpress ecommerce site.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://technomenia.com/",
  layout: "1-col",
},
{
  year: "2023",
  title: "Task Management App",
  description: "A full-stack task management application with user authentication, real-time database sync using Firebase, and drag-and-drop functionality.",
  tags: ["React", "Firebase", "Tailwind CSS", "Authentication", "Drag-and-Drop"],
  imgSrc: "./Wordpress ecommerce web.jpg.png",
  sourceCodeUrl: "https://github.com/rafijuljisan/Chrome-Task-Extension",
  layout: "2-col",
},
{
  year: "2024",
  title: "Automatic Photocard Download Plugin",
  description: "A custom plugin, likely for WordPress, to automatically generate and allow users to download photocards based on user data.",
  tags: ["WordPress", "PHP", "Plugin Development", "Automation", "Media Tools"],
  imgSrc: "./Automatic Photocard downlooad plugin.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://bhorerdut.com",
  layout: "1-col",
},
{
  year: "2024",
  title: "Next.js Portfolio Site",
  description: "A modern, fast, and responsive personal portfolio website built using Next.js, React, and Tailwind CSS to showcase projects and skills.",
  tags: ["Next.js", "React", "Tailwind CSS", "Portfolio", "Responsive Design"],
  imgSrc: "./Next JS Portfolio site.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://jisan.technomenia.com",
  layout: "1-col",
},
{
  year: "2024",
  title: "Consultancy Management App",
  description: "A comprehensive web application for consultancy firms to manage clients, appointments, payments, and visa processing statuses.",
  tags: ["Laravel", "React", "MySQL", "Management System", "Dashboard"],
  imgSrc: "./Consultancy Management apps.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://app.openwindowbd.com/",
  layout: "1-col",
},
{
  year: "2023",
  title: "Education Consultancy Website",
  description: "A professional, responsive website for an education consultancy, showcasing services, partner universities, and student testimonials.",
  tags: ["WordPress", "Elementor", "Responsive Design", "Consultancy", "Landing Page"],
  imgSrc: "./Education Consultancy Website.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://openwindowbd.com",
  layout: "1-col",
},
{
  year: "2025",
  title: "Finance Management Dashboard",
  description: "A data-driven finance dashboard to track income, expenses, and investments, featuring charts and downloadable reports.",
  tags: ["React", "Tailwind CSS", "Chart.js", "Finance", "Dashboard UI"],
  imgSrc: "./Finance management.jpg.png",
  sourceCodeUrl: "#",
  liveSiteUrl: "https://ac.openwindowbd.com",
  layout: "2-col",
},
{
  year: "2024",
  title: "Automatic Recent Tab Loader for Chrome",
  description: "A Google Chrome extension to improve productivity by automatically reloading recent or pinned tabs at user-defined intervals.",
  tags: ["Chrome Extension", "JavaScript", "Automation", "Productivity", "Browser API"],
  imgSrc: "./Automatic Recent Tab Loader for Chrome.png",
  sourceCodeUrl: "https://github.com/rafijuljisan/Recent-Tab-Loader-Plugin",
  layout: "1-col",
},

  ];

  // --- REMOVED categories and filteredProjects logic ---

  return (
    <section id="projects" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          My Recent Works
        </h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Here are a few projects I've worked on recently, from web apps to WordPress plugins.
        </p>

        {/* --- FILTER BUTTONS REMOVED --- */}

        {/* --- UPDATED GRID to lg:grid-cols-3 --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- UPDATED THIS LINE to use allProjects --- */}
          {allProjects.map((project) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              // --- UPDATED CLASSNAME to use layout prop ---
              className={project.layout === '2-col' ? 'lg:col-span-2' : 'lg:col-span-1'} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- UPDATED ProjectProps type ---
type ProjectProps = {
  year: string;
  title: string;
  description: string;
  tags: string[];
  imgSrc?: string; // --- MADE IMGSRC OPTIONAL ---
  sourceCodeUrl?: string; 
  liveSiteUrl?: string;
  layout: '1-col' | '2-col'; // --- ADDED LAYOUT PROP ---
};

// --- UPDATED ProjectCardProps type ---
type ProjectCardProps = {
  project: ProjectProps;
  className?: string; // Add className prop
};

// --- UPDATED ProjectCard component ---
const ProjectCard = ({ project, className = '' }: ProjectCardProps) => (
  <div className={`group bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg overflow-hidden border border-gray-700 shadow-xl flex flex-col ${className}`}>
    {/* --- ADDED CONDITIONAL RENDERING FOR IMAGE --- */}
    {project.imgSrc && (
      <div className="overflow-hidden">
        <img
          src={project.imgSrc}
          alt={project.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )}
    <div className="p-6 flex flex-col flex-grow">
      <span className="block text-sm text-gray-400 mb-1">{project.year}</span>
      <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
      <p className="text-gray-300 text-sm mb-4 flex-grow">{project.description}</p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs text-lime-400 bg-lime-900 bg-opacity-50 px-3 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-gray-700">
        {project.sourceCodeUrl && (
          <a 
            href={project.sourceCodeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm text-gray-300 hover:text-lime-400 transition-colors"
          >
            Source Code <Icon name="ExternalLink" className="w-4 h-4 ml-1.5" />
          </a>
        )}
        {project.liveSiteUrl && (
          <a 
            href={project.liveSiteUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-sm text-gray-300 hover:text-lime-400 transition-colors"
          >
            Live Site <Icon name="ExternalLink" className="w-4 h-4 ml-1.5" />
          </a>
        )}
      </div>
    </div>
  </div>
);
// --- ADD THIS NEW COMPONENT ---
const DesignPortfolioCTA = () => (
  <section id="design" className="py-16 text-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      {/* Use the same card style for consistency */}
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg border border-gray-700 shadow-xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Side: Image */}
        {/* Create a simple 600x400 collage of your best designs and save it in /public as 'design-preview.jpg' */}
        <div className="md:w-1/2">
          <img 
            src="./Design preview.png" 
            alt="Design Portfolio Preview" 
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400/333/FFF?text=My+Design+Work')}
          />
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Palette" className="w-5 h-5 text-lime-400" />
            <span className="text-sm font-medium text-lime-400 uppercase tracking-wider">
              Visual & UI/UX Design
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white mb-4">
            See My Design Portfolio
          </h3>
          <p className="text-gray-300 mb-8">
            As a visual designer, I create brand identities, custom graphics, and pixel-perfect UI/UX mockups. My developer background ensures every design is feasible and functional.
          </p>
          
          {/* --- FIXED Button Container --- */}
          <div className="flex flex-col sm:flex-row">
            {/* Behance Button (Primary) */}
            <a
              href="https://behance.net/mdjis" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all transform hover:scale-105 mb-4 sm:mb-0 sm:mr-4"
            >
              <Icon name="Behance" className="w-5 h-5 mr-2" />
              View on Behance
            </a>
            
            {/* Pinterest Button (Secondary) */}
            <a
              href="https://pinterest.ph/rafijuljisan" // <-- I got this from your CV!
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-full shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all transform hover:scale-105"
            >
              <Icon name="Pinterest" className="w-5 h-5 mr-2" />
              View on Pinterest
            </a>
          </div>
          {/* --- END Button Container --- */}
          
        </div>
      </div>
    </div>
  </section>
);
// --- END OF NEW COMPONENT ---
// --- Contact Teaser Component ---
const ContactTeaser = () => {
  return (
    <section id="contact" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Let's Build Something Great!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ContactTeaserCard
            icon="Phone"
            title="Call Me"
            value="+880 1957-850240"
            href="tel:+8801957850240"
          />
          <ContactTeaserCard
            icon="Mail"
            title="Email Me"
            value="rafijuljisan@gmail.com"
            href="mailto:rafijuljisan@gmail.com"
          />
          <ContactTeaserCard
            icon="MapPin"
            title="Location"
            value="Mirpur-1, Dhaka-1216"
          />
        </div>
      </div>
    </section>
  );
};

type ContactTeaserCardProps = {
  icon: IconName;
  title: string;
  value: string;
  href?: string;
};

const ContactTeaserCard = ({ icon, title, value, href }: ContactTeaserCardProps) => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md border-white/10 p-6 rounded-lg border border-gray-700 shadow-xl text-center flex flex-col items-center">
    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 border-2 border-lime-400">
      <Icon name={icon} className="w-8 h-8 text-lime-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
    {href ? (
        <a href={href} className="text-gray-300 hover:text-lime-400 transition-colors break-all">{value}</a>
    ) : (
        <p className="text-gray-300">{value}</p>
    )}
  </div>
);


// --- Blogs Component ---
const Blogs = () => {
  const blogs = [
    {
      title: "Why Laravel is a Great Choice for Web Apps",
      imgSrc: "https://taglineinfotech.com/wp-content/uploads/2024/02/What-is-Ruby-on-Rails-Why-is-it-used-for-Web-Applications.webp",
      date: "Nov 10, 2025",
    },
    {
      title: "Developing Your First WordPress Plugin",
      imgSrc: "https://media.licdn.com/dms/image/v2/D4D12AQHbb0F9yy3PHg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1711710866378?e=2147483647&v=beta&t=UBdcW1evC4ZwWfivt6RdqfLrQk5pC6ZUW92TyrLVMec",
      date: "Nov 05, 2025",
    },
    {
      title: "From Photoshop to a Live Website",
      imgSrc: "https://i.ytimg.com/vi/D02SQRaDxDU/maxresdefault.jpg",
      date: "Oct 28, 2025",
    },
  ];

  return (
    <section id="writings" className="py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Latest Blogs</h2>
        <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Check out my latest articles and tutorials on development and
          design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.title} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

type BlogProps = {
  title: string;
  imgSrc: string;
  date: string;
};

type BlogCardProps = {
  blog: BlogProps;
};

const BlogCard = ({ blog }: BlogCardProps) => (
    <div className="group bg-gray-900 bg-opacity-50 backdrop-blur-md border-white/10 rounded-lg overflow-hidden border border-gray-800 shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="overflow-hidden">
            <img
            src={blog.imgSrc}
            alt={blog.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
            />
        </div>
        <div className="p-6">
            <span className="block text-sm text-gray-400 mb-2">
                <Icon name="Calendar" className="inline-block w-4 h-4 mr-1.5" />
                {blog.date}
            </span>
            <h3 className="text-xl font-semibold text-white mb-3 hover:text-lime-400 transition-colors">
                <a href="#">{blog.title}</a>
            </h3>
            <a href="#" className="font-medium text-lime-400 hover:text-lime-300 flex items-center group-hover:gap-2 transition-all">
                Read More
                <Icon name="ArrowRight" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
    </div>
);


// --- Footer Component ---
const Footer = () => {
  return (
    <footer className=" text-gray-400">
      {/* CTA Section */}
      <div className=" py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to start your project?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            I'm available for freelance work. Let's build something amazing
            together.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-black bg-lime-400 hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-all transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} Jisan Sheikh. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
// --- ADD THIS NEW PRELOADER COMPONENT ---
// --- REPLACE OLD PRELOADER WITH THIS ---
const Preloader = ({ step, isFading }: { step: number; isFading: boolean }) => {
  const bootLines = [
    "Booting JisanOS v2.5...",
    "Initializing creative core...",
    "Loading developer modules... [OK]",
    "Compiling design assets... [OK]",
    "Connecting to the matrix... [CONNECTED]",
    "Welcome."
  ];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black
                  text-lime-400 font-mono
                  transition-opacity duration-500
                  ${isFading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="w-full max-w-lg px-4">
        {bootLines.map((line, index) => (
          // Conditionally render each line based on the 'step'
          <div key={index} className={`flex items-center ${step > index ? 'opacity-100' : 'opacity-0'}`}>
            <span className="text-gray-400 mr-2">&gt;</span>
            <p className="text-sm md:text-base">{line}</p>
            {/* Show blinking cursor on the last visible line */}
            {step === index + 1 && step < bootLines.length && (
              <span className="w-2 h-4 bg-lime-400 animate-blink ml-2"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
// --- END OF NEW PRELOADER ---
// --- Main App Component ---
// This is what you would put in your page.jsx or index.js
// --- Main App Component ---
// This is what you would put in your page.jsx or index.js
// --- Main App Component ---
// --- Main App Component ---
export default function App() {
  // Add state to track the active section
  const [activeSection, setActiveSection] = useState("home");
  
  // --- UPDATED PRELOADER STATE (now uses 'step') ---
  const [step, setStep] = useState(0); // Current step of the boot sequence
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  // Add a scroll listener to update the active section
  useEffect(() => {
    // ... (Your existing scroll listener logic stays the same)
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      sections.forEach(section => {
        const htmlSection = section as HTMLElement;
        const sectionTop = htmlSection.offsetTop;
        const sectionHeight = htmlSection.offsetHeight;
        const offset = 150; 
        if (window.scrollY >= sectionTop - offset && 
            window.scrollY < sectionTop + sectionHeight - offset) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- UPDATED PRELOADER TIMER (controls the 'step') ---
  useEffect(() => {
    const totalSteps = 6; // Total number of lines in 'bootLines'
    const stepDuration = 500; // 0.5 seconds per line

    const interval = setInterval(() => {
      setStep(prevStep => {
        if (prevStep >= totalSteps) {
          clearInterval(interval);
          
          // Hold at the end for a moment, then fade
          setTimeout(() => {
            setIsFading(true);
          }, 300); // Hold for 0.3s

          // Remove preloader from DOM after fade-out
          setTimeout(() => {
            setIsLoading(false);
          }, 800); // 0.3s hold + 0.5s fade

          return totalSteps;
        }
        return prevStep + 1;
      });
    }, stepDuration);

    // Clean up timers
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array ensures this runs only once on load

  return (
    // Your bg-black class is kept as requested
    <div className="bg-black min-h-screen relative overflow-hidden">

      {/* --- UPDATED PRELOADER (passes 'step') --- */}
      {isLoading && <Preloader step={step} isFading={isFading} />}

      {/* --- AURORA BACKGROUND (SIMPLIFIED & WORKING) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Aurora Layer 1 - Purple */}
        <div 
          className="absolute top-[5%] left-[15%] w-[800px] h-[800px] bg-purple-600 opacity-40 rounded-full animate-aurora-flow"
          style={{ filter: 'blur(120px)' }}
        />
        
        {/* Aurora Layer 2 - Blue/Indigo */}
        <div 
          className="absolute top-[25%] right-[10%] w-[900px] h-[900px] bg-indigo-600 opacity-30 rounded-full animate-aurora-2"
          style={{ filter: 'blur(130px)' }}
        />
        
        {/* Aurora Layer 3 - Violet */}
        <div 
          className="absolute bottom-[5%] left-[40%] w-[1000px] h-[1000px] bg-violet-600 opacity-35 rounded-full animate-aurora-3"
          style={{ filter: 'blur(140px)' }}
        />

        {/* Aurora Layer 4 - Pink/Fuchsia (for extra glow) */}
        <div 
          className="absolute top-[45%] left-[5%] w-[700px] h-[700px] bg-fuchsia-600 opacity-25 rounded-full animate-aurora-flow"
          style={{ filter: 'blur(110px)', animationDelay: '7s' }}
        />
      </div>
      {/* --- END OF AURORA BACKGROUND --- */}

      {/* --- WRAP ALL PAGE CONTENT TO BE ON TOP --- */}
      <div className="relative z-10">
        {/* --- HEADER MOVED BACK HERE, WRAPPED FOR STICKY POSITIONING --- */}
        <div className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8">
          {/* Pass the activeSection state to the Header */}
          <Header activeSection={activeSection} />
        </div>

        <main>
          <Hero />
          <Stats />
          <Skills />
          <Resume />
          <Technologies />
          <Projects />
          <DesignPortfolioCTA />
          <ContactTeaser />
          <Blogs />
        </main>
        <Footer />
      </div>
      {/* --- END OF CONTENT WRAPPER --- */}
    </div>
  );
}
