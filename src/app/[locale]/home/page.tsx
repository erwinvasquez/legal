"use client"
import HomeHero from "./HomeHero"
import HomeProblems from "./HomeProblems"
import HomeSteps from "./HomeSteps"
import HomeScenarios from "./HomeScenarios"
import HomePlans from "./HomePlans"
import HomeCTA from "./HomeCTA"

export default function HomePage() {
  return (
    <main>
      <HomeHero />
      <HomeProblems />
      <HomeSteps />
      <HomeScenarios />
      <HomePlans />
      <HomeCTA />
    </main>
  )
}
