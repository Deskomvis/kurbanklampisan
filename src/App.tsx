
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { YearProvider, useYear } from "./contexts/YearContext";
import { PenerimaProvider } from "./contexts/PenerimaContext";
import { KelompokKurbanProvider } from "./contexts/KelompokKurbanContext";
import { KeuanganProvider } from "./contexts/KeuanganContext";
import { PanitiaProvider } from "./contexts/PanitiaContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BackupProvider } from "./contexts/BackupContext";
import { CollaborativeWrapper } from "./components/collaborative/CollaborativeWrapper";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Panitia from "./pages/Panitia";
import KelompokKurban from "./pages/KelompokKurban";
import Keuangan from "./pages/Keuangan";
import PenerimaDaging from "./pages/PenerimaDaging";
import PembagianDaging from "./pages/PembagianDaging";
import Laporan from "./pages/Laporan";
import DataManagement from "./pages/DataManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wraps data providers with year-scoped keys; remounts each provider on year change
const YearAwareProviders = ({ children }: { children: ReactNode }) => {
  const { currentYear } = useYear();
  return (
    <KeuanganProvider key={`keuangan-${currentYear}`} year={currentYear}>
      <KelompokKurbanProvider key={`kelompok-${currentYear}`} year={currentYear}>
        <PenerimaProvider key={`penerima-${currentYear}`} year={currentYear}>
          <PanitiaProvider key={`panitia-${currentYear}`} year={currentYear}>
            <CollaborativeWrapper>
              {children}
            </CollaborativeWrapper>
          </PanitiaProvider>
        </PenerimaProvider>
      </KelompokKurbanProvider>
    </KeuanganProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
      <BackupProvider>
        <YearProvider>
          <YearAwareProviders>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/panitia" element={<Panitia />} />
                  <Route path="/kelompok-kurban" element={<KelompokKurban />} />
                  <Route path="/keuangan" element={<Keuangan />} />
                  <Route path="/penerima-daging" element={<PenerimaDaging />} />
                  <Route path="/pembagian-daging" element={<PembagianDaging />} />
                  <Route path="/laporan" element={<Laporan />} />
                  <Route path="/data-management" element={<DataManagement />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </YearAwareProviders>
        </YearProvider>
      </BackupProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
