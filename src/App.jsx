import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/modules/Navbar";
import Footer from "./components/modules/Footer";
import "./index.css";
import routers from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./services/Redux/store";


const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Provider store={store}>
          <AppContent />
        </Provider>
      </Router>
    </QueryClientProvider>
  );
};


const AppContent = () => {

  const location = useLocation();

  // route title
  useEffect(() => {
    const currentRoute = routers.find(
      (route) => route.path === location.pathname
    );
    if (currentRoute) {
      document.title = currentRoute.title;
    } else {
      document.title = "Adidas | not found";
    }
  }, [location.pathname]);

  return (
    <Routes>
      {routers.map((route) => (
        <Route
          key={route.title}
          path={route.path}
          element={
            <>
            {(route.path !== "/login" && route.path !== "/signup" && route.path !== "*") && <Navbar />}
            <route.element/>
            {(route.path !== "/login" && route.path !== "/signup" && route.path !== "*") && <Footer />}
          </>
          }
        />
      ))}
    </Routes>
  ) 
};

export default App;