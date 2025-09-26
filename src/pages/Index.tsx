import { useState } from "react";
import { Hero } from "@/components/landing/Hero";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { TechStack } from "@/components/landing/TechStack";
import { Benefits } from "@/components/landing/Benefits";
import { Curriculum } from "@/components/landing/Curriculum";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { Modal } from "@/components/landing/Modal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCTAClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Hero onCTAClick={handleCTAClick} />
      <ProblemSolution onCTAClick={handleCTAClick} />
      <TechStack />
      <Benefits onCTAClick={handleCTAClick} />
      <Curriculum onCTAClick={handleCTAClick} />
      <Testimonials />
      <FAQ onCTAClick={handleCTAClick} />
      <Footer onCTAClick={handleCTAClick} />
      
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Index;
