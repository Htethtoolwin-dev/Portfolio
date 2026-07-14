import { lazy, Suspense } from "react";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import DeferredSection from "./components/ui/DeferredSection";

const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const CV = lazy(() => import("./components/sections/CV"));
const Contact = lazy(() => import("./components/sections/Contact"));

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <DeferredSection>
          <Suspense fallback={null}>
            <About />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={null}>
            <Skills />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={null}>
            <Projects />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={null}>
            <CV />
          </Suspense>
        </DeferredSection>
        <DeferredSection>
          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </DeferredSection>
      </main>
      <Footer />
    </>
  );
}
