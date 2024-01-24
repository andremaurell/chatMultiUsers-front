import './App.css';
import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
import Register from './components/Register/Register';
import { AuthProvider } from './context/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Join />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}


export default App;