import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  
  return (
    <div>
      <Header/>
      <div className=' mx-auto bg-backgroundColor  p-4 min-h-[calc(100vh-64px)]'> 
      <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}
