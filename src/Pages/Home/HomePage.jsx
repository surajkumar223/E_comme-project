import React, { useContext } from 'react'
import Layoutc from '../../components/layout/Layoutc'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import HomePageProductCard from '../../components/homePageProductCard/HomePageProductCard'
import Track from '../../components/track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { useStateContext } from '../../context/myState'

function HomePage() {
  const {loading, setloading} = useStateContext();

  console.log("shihj", { loading });
  return (
    <Layoutc>
      <HeroSection />
      <Category />
      <HomePageProductCard />
      <Track />
      <Testimonial />
    </Layoutc>

  )
}
export default HomePage