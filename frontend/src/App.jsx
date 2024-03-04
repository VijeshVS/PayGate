import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signup } from './components/Signup'
import { Dashboard } from './components/Dashboard'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
