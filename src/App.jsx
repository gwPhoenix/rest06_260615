import { HashRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import ChatWidget from './components/ChatWidget'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Course from './pages/Course'
import Checkout from './pages/Checkout'
import Instructors from './pages/Instructors'
import Reviews from './pages/Reviews'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Cursor />
        <Nav />
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/courses"     element={<Courses />} />
          <Route path="/course/:id"  element={<Course />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/instructors" element={<Instructors />} />
          <Route path="/reviews"     element={<Reviews />} />
          <Route path="/profile"     element={<Profile />} />
        </Routes>
        <Footer />
        <ChatWidget />
      </HashRouter>
    </AuthProvider>
  )
}
