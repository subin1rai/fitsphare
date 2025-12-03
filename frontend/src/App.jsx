import "./App.css";
import HomePage from "./pages/homePage";
import Dashboard from "./pages/user/dashboard";
import Details from "./pages/auth/details";
import Login from "./pages/auth/login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate vloading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<Login />} />
            <Route path="/auth/details" element={<Details />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            /> */}
          </Routes>

          <ToastContainer
            position="top-right"
            autoClose={3000} // auto close after 3 seconds
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" // or "dark"
          />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;