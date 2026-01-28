import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "./components/ui/sidebar";

import Navbar from "./pages/Navbar";
import AppSidebar from "./pages/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Practices from "./pages/Practices";
import Partners from "./pages/Partners";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <SidebarProvider defaultOpen={false}>
                <div className="h-screen w-screen flex flex-col overflow-hidden bg-background text-foreground">
                  <Navbar />

                  <div className="flex flex-1 min-h-0 w-full overflow-hidden">
                    <AppSidebar />

                    <SidebarInset className="w-full overflow-hidden">
                      <main className="h-full w-full p-6 bg-muted/40 overflow-y-auto">
                        <Routes>
                          <Route path="dashboard" element={<Dashboard />} />
                          <Route path="practices" element={<Practices />} />
                          <Route path="partners" element={<Partners />} />

                          {/* fallback */}
                          <Route
                            path="*"
                            element={<Navigate to="/dashboard" replace />}
                          />
                        </Routes>
                      </main>
                    </SidebarInset>
                  </div>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
