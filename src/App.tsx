import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme/ThemeProvider'
import { SmoothScroll } from './components/motion/SmoothScroll'
import { CustomCursor } from './components/ui/CustomCursor'
import { AnimatedBackground } from './components/visual/AnimatedBackground'
import { Navbar } from './components/nav/Navbar'
import { ScrollToTop } from './components/motion/ScrollToTop'
import { ScrollRouteNavigator } from './components/motion/ScrollRouteNavigator'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Projects } from './pages/Projects'
import { Contact } from './pages/Contact'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <SmoothScroll />
        <AnimatedBackground />
        <Navbar />
        <ScrollToTop />
        <ScrollRouteNavigator />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <CustomCursor />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
