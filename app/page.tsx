"use client";

import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Stats from "./components/Stats";
import { useGithub } from "./lib/useGithub";

export default function HomePage() {
  const { user, repos, loading } = useGithub();

  return (
    <>
      <Hero user={user} loading={loading} />
      <Marquee />
      <Stats user={user} repos={repos} loading={loading} />
      <About user={user} loading={loading} />
      <Skills />
      <Projects repos={repos} loading={loading} />
      <Contact />
      <Footer />
    </>
  );
}
