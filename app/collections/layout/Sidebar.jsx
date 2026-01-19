import { X } from 'lucide-react';
import { ANIMATIONS_DATA } from '../../constants/animations';

export const Sidebar = ({ currentSlug, onNavigate, isOpen, onClose }) => (
  <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
    <div className="sidebar-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
        <div style={{ width: '32px', height: '32px', backgroundColor: '#eab308', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>B</div>
        <span>MOTION BITS</span>
      </div>
      <button onClick={onClose} className="lg-hide-btn"> <X size={20} /> </button>
    </div>
    <nav className="nav-section">
      {Object.entries(ANIMATIONS_DATA).map(([key, cat]) => (
        <div key={key} style={{ marginBottom: '2rem' }}>
          <div className="category-label">{cat.icon} {cat.title}</div>
          {cat.items.map(item => (
            <button 
              key={item.id} 
              className={`nav-item ${currentSlug === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.name}
              {currentSlug === item.id && <div style={{ width: '4px', height: '4px', background: '#eab308', borderRadius: '50%' }} />}
            </button>
          ))}
        </div>
      ))}
    </nav>
  </aside>
);