import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Signin} from './pages/Signin'
import {Signup} from './pages/Signup'
import {Blog} from './pages/Blog'
import {Blogs} from './pages/Blogs'
import {Publish} from './pages/Publish'
import PageNotFound from './pages/PageNotFound'
import { BlogSKelton } from './components/BlogsSkelton'

// import './App.css'

function App() {

  return (
    <div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path='/signin' element={<Signin/>}></Route>
          <Route path='/blogs' element={<Blogs/>}></Route>
          <Route path='/blog/:id' element={<Blog/>}></Route>
          <Route path='/publish' element={<Publish/>}></Route>
          <Route path="/xman" element={<BlogSKelton />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
