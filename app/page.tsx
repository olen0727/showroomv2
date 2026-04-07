import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import CareerSection from '@/components/CareerSection'
import ContactSection from '@/components/ContactSection'
import ClientWrapper from '@/components/ClientWrapper'

export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CareerSection />
      <ContactSection />
    </ClientWrapper>
  )
}
