import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import CareerSection from '@/components/CareerSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </main>
  )
}
