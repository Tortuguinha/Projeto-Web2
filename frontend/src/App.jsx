import router from "./routes"
import { RouterProvider } from "react-router-dom"
import { AlertProvider } from "./context/AlertContext"
import { useLoadingWithRefresh } from "./hooks/useLoadingWithRefresh"

function App() {
  const { loading } = useLoadingWithRefresh()

  return (
    <>
      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center">Loading...</div>
      ) : (
        <AlertProvider>
          <RouterProvider router={router} />
        </AlertProvider>
      )}
  </>
  )
}

export default App
