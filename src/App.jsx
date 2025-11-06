// import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import HomePage from './pages/HomePage'
// import AboutPage from './pages/AboutPage'
// import ContactUs from './pages/ContactUs'
// import ScrollToTop from './components/ScrollToTop'
// import DecodePage from './pages/DecodePage'
// import Level1 from './pages/Level1'

// function App() {
//   return (
//     <>
//       <ScrollToTop />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//         <Route path="/decode" element={<DecodePage />} />
//         <Route path="/level-one" element={<Level1 />} />
//       </Routes>
//     </>
//   )
// }

// export default App
// tanu code

import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactUs from "./pages/ContactUs";
import ScrollToTop from "./components/ScrollToTop";
import DecodePage from "./pages/DecodePage";
import DynamicLevelPage from "./pages/Level1";
import Layout from "./components/layout/Layout";
import AllRegistration from "./pages/AllRegistration";
import ContactsTable from "./pages/ContactsTable";
import PrivacyPolicy from "./components/PrivacyPolicy";
import FamilyConstellation from "./pages/FamilyConstellation";
import ICH from "./pages/ICH";
import ICHLevels from "./pages/ICH.Levels";
import Tasso from "./pages/Tasso";
import Practitioner from "./pages/Practitioner";
import HHME from "./pages/HHME";
import AdminLogin from "./pages/AdminLogin";
import AdminPage from "./pages/AdminPage";
import AwakenLimitlessHuman from "./pages/AdminPages/AwakenLimitlessHuman";
import ManageEvents from "./pages/AdminPages/ManageEvents";
import DecodeRegistrations from "./pages/AdminPages/DecodeRegistrations";
import FamilyRegistrationsPage from "./pages/AdminPages/FamilyRegistrations";
import TassoRegistrations from "./pages/AdminPages/TassoRegistrations";
import AdminContacts from "./pages/AdminPages/AdminContacts";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/decode" element={<DecodePage />} />
        <Route path="/family-constellation" element={<FamilyConstellation />} />
        <Route path="/tasso" element={<Tasso />} />
        <Route path="/schedule" element={<Practitioner />} />
        <Route path="/hhme" element={<HHME />} />
        <Route path="/ich" element={<ICH />} />
        <Route path="/ich/levels" element={<ICHLevels />} />
        <Route path="*" element={<PrivacyPolicy />} />
        {/* Dynamic route for all levels */}  
        <Route path="/level/:levelNumber" element={<DynamicLevelPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        {/* Backward compatibility routes */}
        <Route path="/level-one" element={<DynamicLevelPage />} />
        <Route path="/level-two" element={<DynamicLevelPage />} />
        <Route path="/level-three" element={<DynamicLevelPage />} />
        <Route path="/level-four" element={<DynamicLevelPage />} />
        <Route
          path="/all-registration-ekaausa.com.usa"
          element={<AllRegistration />}
        />
        <Route
          path="/all-contacts.ekaausa.com.usa"
          element={<ContactsTable />}
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/awaken-limitless-human" element={<AwakenLimitlessHuman />} />
        <Route path="/admin/manage-events" element={<ManageEvents />} />
        <Route path="/admin/decode-registrations" element={<DecodeRegistrations />} />
        <Route path="/admin/family-registrations" element={<FamilyRegistrationsPage />} />
        <Route path="/admin/tasso-registrations" element={<TassoRegistrations />} />
        <Route path="/admin/contacts" element={<AdminContacts />} />
        {/* Keep dashboard route for backward compatibility but redirect to new page */}
        <Route path="/admin/dashboard" element={<AwakenLimitlessHuman />} />
      </Routes>
    </>
  );
}

export default App;
