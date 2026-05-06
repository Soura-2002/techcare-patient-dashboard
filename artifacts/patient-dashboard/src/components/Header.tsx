import { Home, Users, Calendar, MessageSquare, CreditCard, Settings } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white h-[70px] flex items-center justify-between px-8 shadow-sm sticky top-0 z-50" data-testid="header">
      {/* Logo */}
      <div className="flex items-center gap-2" data-testid="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="20" rx="20" ry="20" fill="#01F0D0" fillOpacity="0.15" />
          <path d="M20 8C15 8 10 13 10 18C10 22 12 25 16 27L20 32L24 27C28 25 30 22 30 18C30 13 25 8 20 8Z" fill="#01F0D0" />
          <path d="M20 14C18 14 16 16 16 18C16 20 18 22 20 22C22 22 24 20 24 18C24 16 22 14 20 14Z" fill="white" />
        </svg>
        <span className="text-xl font-bold text-gray-900">Tech.Care</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-1" data-testid="main-nav">
        <NavItem icon={<Home size={16} />} label="Overview" />
        <NavItem icon={<Users size={16} />} label="Patients" active />
        <NavItem icon={<Calendar size={16} />} label="Schedule" />
        <NavItem icon={<MessageSquare size={16} />} label="Message" />
        <NavItem icon={<CreditCard size={16} />} label="Transactions" />
      </nav>

      {/* Doctor profile */}
      <div className="flex items-center gap-3" data-testid="doctor-profile">
        <img
          src="https://fedskillstest.ct.digital/2.png"
          alt="Dr. Jose Simmons"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">Dr. Jose Simmons</p>
          <p className="text-xs text-gray-500">General Practitioner</p>
        </div>
        <div className="w-px h-8 bg-gray-200 mx-1" />
        <button className="text-gray-400 hover:text-gray-600 transition-colors" data-testid="settings-button">
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        active
          ? "bg-[#01F0D0] text-gray-900"
          : "text-gray-600 hover:bg-gray-100"
      }`}
      data-testid={`nav-${label.toLowerCase()}`}
    >
      {icon}
      {label}
    </button>
  );
}
