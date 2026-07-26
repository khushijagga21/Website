import { HomeHero } from '../components/sections/home/HomeHero'
import { AboutSections } from '../components/pages/AboutSections'
import { HomeServices } from '../components/sections/home/HomeServices'
import { HomeContact } from '../components/sections/home/HomeContact'

export function Home() {
  return (
    <>
      <HomeHero />
      <AboutSections />
      <HomeServices />
      <HomeContact />
    </>
  )
}
