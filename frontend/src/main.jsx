import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import './index.css';
import OnStartAnimate from './components/OnStartAnimate.jsx';

const router = createBrowserRouter([
  {
    path: "/*",
    element: <OnStartAnimate />,
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider future={{
        v7_startTransition: true,
      }} router={router} />
    </HelmetProvider>
  </StrictMode>,
)
