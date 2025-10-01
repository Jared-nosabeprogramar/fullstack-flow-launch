import { useState, useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { TechStack } from "@/components/landing/TechStack";
import { Benefits } from "@/components/landing/Benefits";
import { Curriculum } from "@/components/landing/Curriculum";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Modal } from "@/components/landing/Modal";
import { ContactButton } from "@/components/landing/ContactButton";
import { Navbar } from "@/components/layout/Navbar";
import { LoginModal } from "@/components/auth/LoginModal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!auth);
  }, []);

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
    const auth = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!auth);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={handleLoginClick}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <div className="pt-16">
        <Hero onCTAClick={handleCTAClick} />
        <ProblemSolution onCTAClick={handleCTAClick} />
        <TechStack />
        <Benefits onCTAClick={handleCTAClick} />
        <Curriculum onCTAClick={handleCTAClick} />
        <Testimonials />
        <FAQ onCTAClick={handleCTAClick} />
        <Footer onCTAClick={handleCTAClick} />
      </div>
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      <ContactButton />
    </div>
  );
};

export default Index;
