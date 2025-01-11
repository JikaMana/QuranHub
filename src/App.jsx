import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./styles/App.css";
import MainLayout from "./layouts/MainLayout";
import Homepage from "./pages/Homepage";
import Blog from "./components/Blog";
import MushafReader from "./pages/MushafReader";
import NotFoundPage from "./pages/NotFoundPage";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import SingleBlogDetail, { blogLoader } from "./pages/SingleBlogDetail";
import Timings from "./pages/Timings";
import AudioListener from "./pages/audioListener";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Homepage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route
          path="/blogs/:blogID"
          element={<SingleBlogDetail />}
          loader={blogLoader}
        />
        <Route path="/reader" element={<MushafReader />} />
        <Route path="/audio" element={<AudioListener />} />
      </Route>
      <Route path="/salat" element={<Timings />} />

      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 200,
    });
    AOS.refresh();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
