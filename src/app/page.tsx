import { Navbar }    from '@/components/layout/Navbar'
import { Footer }    from '@/components/layout/Footer'
import { Hero }      from '@/components/sections/Hero'
import { Manifesto } from '@/components/sections/Manifesto'
import { VerticalsPreview } from '@/components/sections/VerticalsPreview'
import { Services }  from '@/components/sections/Services'
import { Stats }     from '@/components/sections/Stats'
import { Contact }   from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <VerticalsPreview />
        <Services />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
