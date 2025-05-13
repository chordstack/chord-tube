
import { Route, Router, Routes } from "react-router-dom"
import Layout from "./layout"
import Home from "./pages/Home"
import Detail from "./pages/Detail"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/:name" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </Layout>
  )
}

export default App
