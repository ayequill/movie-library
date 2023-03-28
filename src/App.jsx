import NavBar from './components/NavBar'
const API_KEY = import.meta.env.VITE_API_KEY


function App() {

  console.log(API_KEY)
  return (
    <div className="App">
      <NavBar />
    </div>
  )
}

export default App
