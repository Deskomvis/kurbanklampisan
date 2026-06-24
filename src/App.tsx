
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
import { RabProvider } from "./contexts/RabContext";
import { RealisasiProvider } from "./contexts/RealisasiContext";
import { PasalProvider } from "./contexts/PasalContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BackupProvider } from "./contexts/BackupContext";
import { CollaborativeWrapper } from "./components/collaborative/CollaborativeWrapper";
import AutoSaveWatcher from "./components/AutoSaveWatcher";
import Layout from "./components/Layout";
import VillageLayout from "./components/VillageLayout";
import Home from "./pages/desa/Home";
import Agustusan from "./pages/desa/Agustusan";
import Dashboard from "./pages/Dashboard";
import Panitia from "./pages/Panitia";
import KelompokKurban from "./pages/KelompokKurban";
import Keuangan from "./pages/Keuangan";
import PenerimaDaging from "./pages/PenerimaDaging";
import PembagianDaging from "./pages/PembagianDaging";
import Laporan from "./pages/Laporan";
import Rab from "./pages/Rab";
import DataManagement from "./pages/DataManagement";
import Cetak from "./pages/Cetak";
import CetakKartuDaging from "./pages/CetakKartuDaging";
import PasalMusyawarah from "./pages/PasalMusyawarah";
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
            <RabProvider key={`rab-${currentYear}`} year={currentYear}>
              <RealisasiProvider key={`realisasi-${currentYear}`} year={currentYear}>
                <AutoSaveWatcher />
                <CollaborativeWrapper>
                  {children}
                </CollaborativeWrapper>
              </RealisasiProvider>
            </RabProvider>
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
      <PasalProvider>
      <BackupProvider>
        <YearProvider>
          <YearAwareProviders>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Portal Desa Klampisan */}
                <Route element={<VillageLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/agustusan" element={<Agustusan />} />
                </Route>

                {/* Aplikasi Kurban */}
                <Route element={<Layout />}>
                  <Route path="/kurban" element={<Dashboard />} />
                  <Route path="/kurban/panitia" element={<Panitia />} />
                  <Route path="/kurban/kelompok-kurban" element={<KelompokKurban />} />
                  <Route path="/kurban/keuangan" element={<Keuangan />} />
                  <Route path="/kurban/penerima-daging" element={<PenerimaDaging />} />
                  <Route path="/kurban/pembagian-daging" element={<PembagianDaging />} />
                  <Route path="/kurban/laporan" element={<Laporan />} />
                  <Route path="/kurban/rab" element={<Rab />} />
                  <Route path="/kurban/data-management" element={<DataManagement />} />
                  <Route path="/kurban/cetak" element={<Cetak />} />
                  <Route path="/kurban/cetak/kartu-daging" element={<CetakKartuDaging />} />
                  <Route path="/kurban/pasal-musyawarah" element={<PasalMusyawarah />} />
                </Route>

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </YearAwareProviders>
        </YearProvider>
      </BackupProvider>
      </PasalProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
