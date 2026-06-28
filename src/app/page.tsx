import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { Hero }         from '@/components/sections/Hero'
import { NameSection }  from '@/components/sections/NameSection'
import { Manifesto }    from '@/components/sections/Manifesto'
import { Services }     from '@/components/sections/Services'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NameSection />
        <Manifesto />
        <Services />
      </main>
      <Footer />
    </>
  )
}
