import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import FootballTurfLanding from '@/pages/Home'

export default function MainLayout() {
  
  return (
    <div>
      <Header/>
      <div className='  bg-backgroundColor  min-h-[calc(100vh-64px)]'> 
      <Outlet/>
      </div>
      <Footer/>
      {/* <FootballTurfLanding/> */}
    </div>
  )
}
