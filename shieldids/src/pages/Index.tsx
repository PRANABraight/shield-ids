import ThreatCard from "@/components/Dashboard/ThreatCard";
import ThreatMap from "@/components/Dashboard/ThreatMap";
import AlertsFeed from "@/components/Dashboard/AlertsFeed";
import ThreatPrediction from "@/components/Dashboard/ThreatPrediction";
import Layout from "@/components/Layout";
import LandingPage from "@/components/LandingPage";

const Index: React.FC = () => {
  return (
    
      <LandingPage />
    

    // <Router>
    //   <AuthProvider>
    //     <Routes>
    //       <Route path="/login" element={<AuthForm isLogin={true} />} />
    //       <Route path="/register" element={<AuthForm isLogin={false} />} />
    //       <Route path="/" element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       } />
    //     </Routes>
    //   </AuthProvider>
    // </Router>
  );
};

export default Index;