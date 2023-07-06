import React, { useEffect } from 'react'
import { getCabins } from './services/apiCabins'

const App = () => {
  useEffect(() => {
    getCabins()
  }, [])

  return <div>App</div>
}

export default App
