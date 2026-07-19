import { HomeHero } from '../components/sections/home/HomeHero'
import { HomeStatement } from '../components/sections/home/HomeStatement'
import { HomeServices } from '../components/sections/home/HomeServices'
import { HomeContact } from '../components/sections/home/HomeContact'

export function Home() {
  return (
    <>
      <HomeHero />
      <HomeStatement />
      <HomeServices />
      <HomeContact />
    </>
  )
}
