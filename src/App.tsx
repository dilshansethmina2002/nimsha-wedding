import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { InviteGenerator } from "./pages/InviteGenerator.tsx"; 
import { Analytics } from "@vercel/analytics/react"
import RSVPList from "./components/wedding/RSVPList.tsx";

// 1. ADDED: react-hot-toast import කිරීම (නම පැටලෙන්නේ නැති වෙන්න HotToaster ලෙස ගෙන ඇත)
import { Toaster as HotToaster } from 'react-hot-toast';
import RSVPViewerList from "./components/wedding/RSVPViewerList.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      {/* 2. ADDED: react-hot-toast component එක මෙතනට දැම්මා */}
      <HotToaster position="top-center" reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin/Generator Routes */}
          <Route path="/invitegenerator" element={<InviteGenerator />} />
          <Route path="/admin/rsvps77" element={<RSVPList />} />
          <Route path="/viewrsvp" element={<RSVPViewerList />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;