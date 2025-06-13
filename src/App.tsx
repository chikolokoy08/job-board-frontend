import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'

import Header from './components/Header';
import JobList from './pages/JobList';
import PostJob from './pages/PostJob'
import JobModeration from './pages/JobModeration';

function App() {

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="p-4">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/job/approve" element={<JobModeration mode="approve" />} />
            <Route path="/job/spam" element={<JobModeration mode="spam" />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
