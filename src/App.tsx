import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Charts from "./pages/Charts";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-contact" element={<Contact />} />
        <Route path="/charts" element={<Charts />} />
      </Routes>
    </Layout>
  );
}

export default App;
