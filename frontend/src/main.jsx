import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PostPage from './pages/PostPage.jsx'
import AddPost from './pages/AddPost.jsx'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/add' element={<AddPost/>}/>
      <Route path="/" element={<App/>}/>
      <Route path="/post-page/:id" element={<PostPage/>}/>
    </Routes>
    
    </BrowserRouter>

    
  </StrictMode>
)
