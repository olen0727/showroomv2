import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import CareerSection from '@/components/CareerSection'
import ContactSection from '@/components/ContactSection'
import LoadingScreen from '@/components/LoadingScreen'

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </main>
  )
}
