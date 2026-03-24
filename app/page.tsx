import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import CareerSection from '@/components/CareerSection'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <CareerSection />
    </main>
  )
}
