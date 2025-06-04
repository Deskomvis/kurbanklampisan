
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PenerimaProvider } from "./contexts/PenerimaContext";
import { KelompokKurbanProvider } from "./contexts/KelompokKurbanContext";
import { KeuanganProvider } from "./contexts/KeuanganContext";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BackupProvider>
        <KeuanganProvider>
          <KelompokKurbanProvider>
            <PenerimaProvider>
              <CollaborativeWrapper>
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
              </CollaborativeWrapper>
            </PenerimaProvider>
          </KelompokKurbanProvider>
        </KeuanganProvider>
      </BackupProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
