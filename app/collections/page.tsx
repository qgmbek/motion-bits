"use client";

import { useState, useMemo } from 'react';
import { Sidebar } from './layout/Sidebar';

import {ANIMATIONS_DATA} from ".././constants/animations"
import './collections.css';

export default function CollectionsPage() {
  const [currentSlug, setCurrentSlug] = useState('blur-text');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeItem = useMemo(() => {
    const allItems = Object.values(ANIMATIONS_DATA).flatMap(cat => cat.items);
    return allItems.find(item => item.id === currentSlug) || allItems[0];
  }, [currentSlug]);

  return (
    <div className="app-container">
      <Sidebar 
        currentSlug={currentSlug} 
        onNavigate={setCurrentSlug} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <main className="main-viewport">
        <header className="top-bar">
          <button onClick={() => setSidebarOpen(true)} className="mobile-menu-btn">Menu</button>
          <div className="breadcrumb">Collections / {activeItem.name}</div>
          <button className="pro-btn">Get Pro</button>
        </header>

        <div style={{ padding: '3rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>{activeItem.name}</h1>
            <p style={{ color: '#a1a1aa', fontSize: '1.125rem', marginBottom: '2rem' }}>{activeItem.description}</p>
            
            <button className="copy-button">
              npx motion-bits add {activeItem.id}
            </button>

            <div className="stage-preview">
              <div style={{ textAlign: 'center' }}>
                <div style={{ color: '#eab308', fontSize: '12px', letterSpacing: '2px' }}>LIVE PREVIEW</div>
                <div style={{ fontSize: '24px', marginTop: '10px' }}>{activeItem.name} Component</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}