import React, { useState } from 'react';
import AnnouncementBar from './components/AnnouncementBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MindEverywhere from './components/MindEverywhere';
import Ticker from './components/Ticker';
import PracticeDestinationFinder from './components/PracticeDestinationFinder';
import CompanyStrip from './components/CompanyStrip';
import ExplorePractice from './components/ExplorePractice';
import QuestionBank from './components/QuestionBank';
import CampusLeaderboard from './components/CampusLeaderboard';
import PricingSection from './components/PricingSection';
import DailyRoutine from './components/DailyRoutine';
import FeatureOverview from './components/FeatureOverview';
import PlacementLevels from './components/PlacementLevels';
import SecurityConsole from './components/SecurityConsole';
import AudienceTabs from './components/AudienceTabs';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import Toast from './components/Toast';
import { LoginModal, ScholarshipModal, LevelBriefingModal } from './components/Modals';
import ScrollProgressBar from './components/ScrollProgressBar';
import PlacementCalculator from './components/PlacementCalculator';
import CommandPalette from './components/CommandPalette';
import FloatingNav from './components/FloatingNav';
import AiChatbot from './components/AiChatbot';

export default function App() {
  const [toastMessage, setToastMessage] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedPlanForScholarship, setSelectedPlanForScholarship] = useState(null);
  const [selectedLevelForBrief, setSelectedLevelForBrief] = useState(null);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  const handleSelectCompanyFromStrip = (compName) => {
    showToast(`Filtering for company: ${compName}`);
    const el = document.getElementById('destination');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-900 flex flex-col font-sans selection:bg-dk-yellow selection:text-slate-900">
      {/* Global Scroll Progress Bar at very top */}
      <ScrollProgressBar />

      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Navigation */}
      <Navbar
        onOpenLogin={() => setLoginModalOpen(true)}
        onToast={showToast}
        onOpenCommandPalette={() => setCmdPaletteOpen(true)}
      />

      <main className="flex-1">
        {/* 1. Hero with Interactive AI Guide scene & Typewriter headline */}
        <Hero
          onOpenAiRoadmap={() => showToast('AI Roadmap generator triggered!')}
          onToast={showToast}
        />

        {/* 2. Mind Everywhere: Tap a thought below (from PDF Pages 2 & 3) */}
        <MindEverywhere onToast={showToast} />

        {/* 3. Marquee Ticker */}
        <Ticker />

        {/* 4. Practice Destination Finder with Quick Targets & Surprise Me (PDF Page 4, 5, 6) */}
        <PracticeDestinationFinder onToast={showToast} />

        {/* 4.5. Creative Interactive Placement Readiness Calculator */}
        <PlacementCalculator onToast={showToast} />

        {/* 5. Company Brand Strip */}
        <CompanyStrip onSelectCompany={handleSelectCompanyFromStrip} />

        {/* 6. Explore Practice Categories & Rich Artwork Cards */}
        <ExplorePractice onToast={showToast} />

        {/* 7. Question Bank with In-Browser IDE & Runnable Testcases */}
        <QuestionBank onToast={showToast} />

        {/* 8. Campus Leaderboard with Podium & Exact Rankings Table (PDF Pages 7 & 8) */}
        <CampusLeaderboard onToast={showToast} />

        {/* 9. Pricing Section with Daily Breakdown & Annual Access (PDF Pages 9–12) */}
        <PricingSection
          onOpenScholarship={(plan) => setSelectedPlanForScholarship(plan)}
          onToast={showToast}
        />

        {/* 10. Daily Routine Checklist with XP & Celebration (PDF Page 14) */}
        <DailyRoutine onToast={showToast} />

        {/* 11. What's Actually Included: 5 Platform Pillars (PDF Page 15) */}
        <FeatureOverview />

        {/* 12. National Placement Map & Level Selection */}
        <PlacementLevels
          onOpenLevelBrief={(lvl) => setSelectedLevelForBrief(lvl)}
          onToast={showToast}
        />

        {/* 13. Assessment Integrity Command Center (PDF Page 16) */}
        <SecurityConsole onToast={showToast} />

        {/* 14. Audience Tabs: For Students, For Faculty & Placement Teams (PDF Page 18) */}
        <AudienceTabs onToast={showToast} />

        {/* 15. Testimonials Slider */}
        <Testimonials onToast={showToast} />

        {/* 16. FAQ Accordion with Search */}
        <FaqSection onToast={showToast} />

        {/* 17. Final Call to Action: One Goal. One Useful Next Step (PDF Page 19) */}
        <FinalCta />
      </main>

      {/* Footer with Contact, Address, Government Accreditations & CIN (PDF Pages 19, 20 & 21) */}
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onToast={showToast}
      />

      <ScholarshipModal
        isOpen={!!selectedPlanForScholarship}
        plan={selectedPlanForScholarship}
        onClose={() => setSelectedPlanForScholarship(null)}
        onToast={showToast}
      />

      <LevelBriefingModal
        isOpen={!!selectedLevelForBrief}
        level={selectedLevelForBrief}
        onClose={() => setSelectedLevelForBrief(null)}
      />

      {/* Toast Alert */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPaletteOpen(false)}
      />

      {/* Floating Nav HUD */}
      <FloatingNav />

      {/* Interactive AI Chatbot Agent (Floating Modal) */}
      <AiChatbot />
    </div>
  );
}
