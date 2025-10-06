import { useState, useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { TechStack } from "@/components/landing/TechStack";
import { Benefits } from "@/components/landing/Benefits";
import { Curriculum } from "@/components/landing/Curriculum";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { ContactButton } from "@/components/landing/ContactButton";
import { Navbar } from "@/components/layout/Navbar";
import { LoginModal } from "@/components/auth/LoginModal";
import { supabase } from "@/integrations/supabase/client";
import { useAutoDarkMode } from "@/hooks/useAutoDarkMode";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useAutoDarkMode();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    checkAuth();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={handleLoginClick}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <div className="pt-20">
        <Hero />
        <ProblemSolution />
        <TechStack />
        <Benefits />
        <Curriculum />
        <Testimonials />
        <FAQ />
        <Footer />
      </div>
      
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      <ContactButton />
    </div>
  );
};

export default Index;
