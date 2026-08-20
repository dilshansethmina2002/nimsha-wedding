import { useState } from "react";
import { WeddingProvider, useWedding } from "@/lib/wedding-context";
import { Navbar } from "@/components/wedding/Navbar";
import { Hero } from "@/components/wedding/Hero";
import { EnvelopeOpening } from "@/components/wedding/EnvelopeOpening";
import { IntroScreen } from "@/components/wedding/IntroScreen";
import { InvitationCard } from "@/components/wedding/InvitationCard";
import { Countdown } from "@/components/wedding/Countdown";
import { EventDetails } from "@/components/wedding/EventDetails";
import { Gallery } from "@/components/wedding/Gallery";
import { SaveTheDate } from "@/components/wedding/SaveTheDate";
import { Footer } from "@/components/wedding/Footer";
import { FloatingPetals } from "@/components/wedding/Decorations";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import RSVPForm from "@/components/wedding/RSVPForm";

type Stage = "intro" | "envelope" | "open";

const IndexInner = () => {
  const [stage, setStage] = useState<Stage>("intro");
  const { setTheme } = useWedding();

  return (
    <div className="min-h-screen relative">
      {stage === "intro" && (
        <IntroScreen onComplete={() => setStage("envelope")} />
      )}

      {stage !== "open" && (
        <EnvelopeOpening
          open={stage === "envelope"}
          onComplete={() => {
            setTheme("light");
            setStage("open");
          }}
        />
      )}

      {stage === "open" && (
        <>
          <FloatingPetals count={12} />
          <MusicPlayer shouldPlay={true} />
          <Navbar />
          <main>
            <Hero opened={true} onOpenInvitation={() => {}} />
            <InvitationCard />
            <Countdown />
            <EventDetails />
            <Gallery />
            <SaveTheDate />
            <RSVPForm />
            <Footer />
          </main>
        </>
      )}
    </div>
  );
};

const Index = () => (
  <WeddingProvider>
    <IndexInner />
  </WeddingProvider>
);

export default Index;
