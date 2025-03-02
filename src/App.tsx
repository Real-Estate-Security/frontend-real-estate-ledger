import {Routes, Route} from 'react-router-dom'

import Layout from './pages/Layout'
import Home from './pages/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/frontend-real-estate-ledger' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
