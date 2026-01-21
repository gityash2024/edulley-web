import React, { useEffect, useState, createContext, useRef } from "react";
import { Routes, Route, Navigate, useLocation, useNavigationType, useMatch } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import Courses from "./Pages/Courses";
import CourseList from "./Pages/CourseList";
import CompareCourse from "./Pages/CompareCourse";
import UniversitesPage from "./Pages/UniversitesPage";
import Scholarship from "./Pages/Scholarship";
import ExamIelts from "./Pages/exams/ExamIelts";
import TopicIlets from "./Pages/exams/TopicIlets";
import IletsCue from "./Pages/exams/IletsCue";
import IletsEssay from "./Pages/exams/IletsEssay";
import Blog from "./Pages/Blog";
import BlogDetail from "./Pages/BlogDetail";
import InstitutionDetail from "./Pages/InstitutionDetail";
import FAQ from "./components/Home/FAQ";
import TermCondition from "./Pages/TermCondition";
import PrivacyPolicy from "./Pages/privacy-policy";
import ContactUs from "./Pages/contact-us";
import RefundPolicy from "./Pages/refund-policy";
import ProfileForm from "./components/Home/Profile/profile-form";
import LoginModal from "./components/auth/login";
import { Toaster } from "react-hot-toast";
import './App.css';
import SOP from "./Pages/study-abroad/sop";
import LOR from "./Pages/study-abroad/lor";
import CourseDetails from "./components/courseDetails";
import CarrerPath from "./Pages/Carrer/carrer-path";
import CarrerPathDetails from "./Pages/Carrer/carrer-details";
import ChatSupport from "./Pages/chatSupport";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NotFound from "./Pages/notFound";
import { Helmet } from 'react-helmet-async';

export const ModalContext = createContext();

const Loader = () => (
  <div className="flex justify-center items-center h-full py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalType, setLoginModalType] = useState('signup');
  const location = useLocation();
  const action = useNavigationType();
  const pathname = location.pathname;
  const [loading, setLoading] = useState(false);
  const [needsRedirect, setNeedsRedirect] = useState(false);
  const [redirectTo, setRedirectTo] = useState('');
  const authChecked = useRef(false);

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    // Only run auth check once per session to prevent redirects on route changes
    if (!authChecked.current && typeof window !== 'undefined') {
      authChecked.current = true;
      try {
        const userStr = localStorage.getItem("_u");
        if (userStr) {
          const user = JSON.parse(userStr);
          setIsLoggedIn(!!user?.token);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.minHeight = "100vh";
    
    return () => {
      document.body.style.display = "";
      document.body.style.flexDirection = "";
      document.body.style.minHeight = "";
    };
  }, []);

  useEffect(() => {
    if (pathname !== '/' && pathname.endsWith('/')) {
      const withoutTrailingSlash = pathname.slice(0, -1);
      setNeedsRedirect(true);
      setRedirectTo(withoutTrailingSlash);
    } else {
      setNeedsRedirect(false);
    }
  }, [pathname]);

  const RequireAuth = ({ children }) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      setLoginModalType('signup');
      return <Navigate to="/" replace />;
    }
    return children;
  };

  if (needsRedirect) {
    return (
      <HelmetProvider>
        <div>
          <Helmet>
            <meta httpEquiv="refresh" content={`0;url=${redirectTo}`} />
            <link rel="canonical" href={`${window.location.origin}${redirectTo}`} />
            <script>{`
              if (window.history && window.history.replaceState) {
                window.history.replaceState(null, "", "${redirectTo}");
                window.location.href = "${redirectTo}";
              }
            `}</script>
          </Helmet>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
            <div className="ml-4">Redirecting...</div>
          </div>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <ModalContext.Provider value={{ showLoginModal, setShowLoginModal, loginModalType, setLoginModalType }}>
        <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <div className="content-wrapper" style={{ flex: '1 0 auto' }}>
            {loading ? (
              <Loader />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses-list" element={<CourseList />} />
                <Route path="/compare" element={<CompareCourse />} />
                <Route path="/institutions" element={<UniversitesPage />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/exam-ielts" element={<ExamIelts />} />
                <Route path="/ielts-topic" element={<TopicIlets />} />
                <Route path="/ielts-cue-card" element={<IletsCue />} />
                <Route path="/ielts-essay" element={<IletsEssay />} />
                <Route path="/sop" element={<SOP />} />
                <Route path="/lor" element={<LOR />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:heading" element={<BlogDetail />} />
                <Route path="/blog-details" element={<BlogDetail />} />
                <Route path="/institution-details" element={<InstitutionDetail />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms-and-condition" element={<TermCondition />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/career-path" element={<CarrerPath />} />
                <Route path="/course-details/:slug" element={<CourseDetails />} />
                <Route path="/carrer-details" element={<CarrerPathDetails />} />
                <Route path="/chat-support" element={<ChatSupport />} />
                <Route path="/profile" element={<RequireAuth><ProfileForm /></RequireAuth>} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            )}
          </div>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                backgroundColor: '#FF5573',
                color: '#FFFFFF',
              },
            }}
          />
          {showLoginModal && (
            <LoginModal
              isOpen={showLoginModal}
              onClose={() => setShowLoginModal(false)}
              initialTab={loginModalType}
            />
          )}
          <Footer style={{ flexShrink: 0 }} />
        </div>
      </ModalContext.Provider>
    </HelmetProvider>
  );
}

export default App;