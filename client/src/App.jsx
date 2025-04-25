import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Login, Public } from './pages/public'
import paths from './utils/paths'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from './app/asyncAction'
function App() {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.categories)
  useEffect(() => {
    dispatch(getCategories())
  }, [])


  return (
    <div className='m-h-screen font-main'>
      <Routes>
        <Route path={paths.PUBLIC} element={<Public />} >
          <Route path={paths.HOME} element={<Home />} />
          <Route path={paths.LOGIN} element={<Login />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
