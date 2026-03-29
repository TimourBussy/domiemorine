import { Header } from "./layout/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePages } from "./hooks/usePages";
import Home from "./pages/Home";
import Biography from "./pages/Biography";
import Ensembles from "./pages/Ensembles";
import Schedule from "./pages/Schedule";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

const pageComponentMap: Record<string, React.ComponentType> = {
  home: Home,
  biography: Biography,
  ensembles: Ensembles,
  schedule: Schedule,
  gallery: Gallery,
  contact: Contact,
};

export default function App() {
  const pages = usePages();
  const homePage = pages.find(
    (page) => !page.slug?.current || page.slug.current === ""
  );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {homePage && (
          <Route path="/" element={<Home />} />
        )}
        {pages
          .filter((page) => page.slug?.current && page.slug.current !== "")
          .map((page) => {
            const slug = page.slug.current.toLowerCase();
            const Component = pageComponentMap[slug] || (() => <div>{page.title.en_GB || page.title.fr_FR}</div>);
            return (
              <Route
                key={page._id}
                path={`/${page.slug.current}`}
                element={<Component />}
              />
            );
          })}
      </Routes>
    </BrowserRouter>
  );
}