import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Navbar } from './components/ui/Navbar';
import { ErrorBoundary } from './components/ErrorBoundary';

const Landing = lazy(() => import('./pages/Landing'));
const Auth = lazy(() => import('./pages/Auth'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Charities = lazy(() => import('./pages/Charities'));
const CleanWaterAlliance = lazy(() => import('./pages/charities/CleanWaterAlliance'));
const GlobalScholarsFund = lazy(() => import('./pages/charities/GlobalScholarsFund'));
const ReforestProject = lazy(() => import('./pages/charities/ReforestProject'));
const SolarImpact = lazy(() => import('./pages/charities/SolarImpact'));
const Scores = lazy(() => import('./pages/Scores'));
const Draws = lazy(() => import('./pages/Draws'));
const DrawResults = lazy(() => import('./pages/DrawResults'));
const Charity = lazy(() => import('./pages/Charity'));
const Admin = lazy(() => import('./pages/Admin'));

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-surface text-on-surface font-body selection:bg-primary/30 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={
              <div className="flex h-[50vh] items-center justify-center">
                <div className="animate-pulse w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-t-2 border-primary animate-spin"></div>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Auth />} />
                <Route path="/signup" element={<Auth />} />
                
                {/* Routes requiring Auth but not necessarily an active subscription */}
                <Route element={<ProtectedRoute requireSubscription={false} />}>
                  <Route path="/subscribe" element={<Subscribe />} />
                </Route>

                {/* Core protected routes requiring active subscription */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/charities" element={<Charities />} />
                  <Route path="/charities/clean-water-alliance" element={<CleanWaterAlliance />} />
                  <Route path="/charities/global-scholars-fund" element={<GlobalScholarsFund />} />
                  <Route path="/charities/reforest-project" element={<ReforestProject />} />
                  <Route path="/charities/solar-impact" element={<SolarImpact />} />
                  <Route path="/scores" element={<Scores />} />
                  <Route path="/draws" element={<Draws />} />
                  <Route path="/results" element={<DrawResults />} />
                  <Route path="/charity" element={<Charity />} />
                </Route>

                <Route element={<ProtectedRoute adminOnly={true} />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
