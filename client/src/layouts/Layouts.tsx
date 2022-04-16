import React from 'react'
import Navbar from '../components/Navbar/Navbar'

interface ILayout {
    children?: React.ReactChild
}

const Layout: React.FC<ILayout> = ({children}) => {
  return (
    <div>
        <Navbar/>
        {children}
    </div>
  )
}

export default Layout