"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { OnboardingModal } from "./OnboardingModal";

interface OnboardingWrapperProps {
  children: React.ReactNode;
}

export function OnboardingWrapper({ children }: OnboardingWrapperProps) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const profile = useUserStore((state) => state.profile);

  // Wait for Zustand hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Check if we need to show onboarding after hydration
  useEffect(() => {
    if (isHydrated && !profile?.hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [isHydrated, profile]);

  const handleComplete = () => {
    setShowOnboarding(false);
  };

  // Don't render anything until hydrated to prevent flash
  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <>
      {children}
      <OnboardingModal isOpen={showOnboarding} onComplete={handleComplete} />
    </>
  );
}
