import { useState, useEffect } from 'react';
import MovieList from './components/moviesList';
import Section from './components/section';
import FeaturedMovie from './components/featuredMovie';
import { FaHeart, FaMoon, FaSun } from 'react-icons/fa6';

/**
 * Composant principal de l'application Cinetech.
 * Gère l'état global (thème, favoris, films vus) et la structure de la page.
 */

export default function App() {
  // État du thème (sombre ou clair) avec persistance locale
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('cinetech_theme');
    return saved === 'dark';
  });

  // État des films favoris
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('cinetech_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // État des films déjà visionnés
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem('cinetech_watched');
    return saved ? JSON.parse(saved) : [];
  });

  // État des films à regarder plus tard
  const [watchLater, setWatchLater] = useState(() => {
    const saved = localStorage.getItem('cinetech_watchLater');
    return saved ? JSON.parse(saved) : [];
  });

  // Film mis en avant
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Persistance des données dans le localStorage lors des changements d'état
  useEffect(() => {
    localStorage.setItem('cinetech_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cinetech_watched', JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    localStorage.setItem('cinetech_watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  // Gestion de l'application du thème (classe CSS dark sur le document)
  useEffect(() => {
    localStorage.setItem('cinetech_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Récupération d'un film tendance pour la section "À la une"
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&language=fr-FR`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // On choisit aléatoirement un film parmi les 5 premiers résultats
          const randomIdx = Math.floor(Math.random() * 5);
          setFeaturedMovie(data.results[randomIdx]);
        }
      });
  }, []);

  // Ajoute ou retire un film des favoris
  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const exists = prev.some(m => m.id === movie.id);
      return exists ? prev.filter(m => m.id !== movie.id) : [...prev, movie];
    });
  };

  // Ajoute ou retire un film de la liste "Déjà vus"
  const toggleWatched = (movie) => {
    setWatched(prev => {
      const exists = prev.some(m => m.id === movie.id);
      return exists ? prev.filter(m => m.id !== movie.id) : [...prev, movie];
    });
  };

  // Ajoute ou retire un film de la liste "À regarder plus tard"
  const toggleWatchLater = (movie) => {
    setWatchLater(prev => {
      const exists = prev.some(m => m.id === movie.id);
      return exists ? prev.filter(m => m.id !== movie.id) : [...prev, movie];
    });
  };

  const favoriteIds = favorites.map(f => f.id);
  const watchedIds = watched.map(m => m.id);
  const watchLaterIds = watchLater.map(m => m.id);

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Barre de navigation */}
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-amber-500'} text-white p-4 shadow-md sticky top-0 z-50 transition-colors`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <img src="./images/logo.svg" alt="Logo" className="h-9 brightness-0 invert" />
          </a>
          <ul className="flex space-x-6 font-medium items-center">
            <li><a href="#" className="hover:text-amber-200 transition">Accueil</a></li>
            <li><a href="#films" className="hover:text-amber-200 transition">Films</a></li>
            <li><a href="#series" className="hover:text-amber-200 transition">Séries</a></li>
            <li className="flex items-center gap-4">
              {/* Bouton pour basculer entre mode sombre et clair */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-white/10 transition-colors"
                aria-label="Changer de thème"
              >
                {isDarkMode ? <FaSun className="text-amber-400" /> : <FaMoon />}
              </button>
              {/* Indicateur du nombre de favoris */}
              <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-amber-700'} px-3 py-1 text-sm font-bold flex items-center gap-2 shadow-inner`}>
                <FaHeart />
                {favorites.length}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto mt-8 px-4 flex-grow w-full space-y-12 pb-12">
        {featuredMovie && (
          <Section title="À la une">
            <FeaturedMovie movie={featuredMovie} />
          </Section>
        )}

        {/* Mes Listes */}
        <div className="space-y-8">
          <Section title="Ma Sélection">
            {favorites.length > 0 ? (
              <MovieList
                manualMovies={favorites}
                favorites={favoriteIds}
                watched={watchedIds}
                watchLater={watchLaterIds}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
                onToggleWatchLater={toggleWatchLater}
              />
            ) : (
              <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} p-8 text-center shadow-sm border italic text-gray-400`}>
                Aucun film ou série dans votre sélection pour le moment.
              </div>
            )}
          </Section>

          {watched.length > 0 && (
            <Section title="Déjà vus">
              <MovieList
                manualMovies={watched}
                favorites={favoriteIds}
                watched={watchedIds}
                watchLater={watchLaterIds}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
                onToggleWatchLater={toggleWatchLater}
              />
            </Section>
          )}

          {watchLater.length > 0 && (
            <Section title="À regarder plus tard">
              <MovieList
                manualMovies={watchLater}
                favorites={favoriteIds}
                watched={watchedIds}
                watchLater={watchLaterIds}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
                onToggleWatchLater={toggleWatchLater}
              />
            </Section>
          )}
        </div>

        {/* Films à l'affiche */}
        <div id="films">
          <Section title="Films à l'affiche">
            <MovieList
              endpoint="movie/now_playing"
              type="movie"
              favorites={favoriteIds}
              watched={watchedIds}
              watchLater={watchLaterIds}
              onToggleFavorite={toggleFavorite}
              onToggleWatched={toggleWatched}
              onToggleWatchLater={toggleWatchLater}
            />
          </Section>
        </div>

        {/* Séries Tendances */}
        <div id="series">
          <Section title="Séries du moment">
            <MovieList
              endpoint="trending/tv/day"
              type="tv"
              favorites={favoriteIds}
              watched={watchedIds}
              watchLater={watchLaterIds}
              onToggleFavorite={toggleFavorite}
              onToggleWatched={toggleWatched}
              onToggleWatchLater={toggleWatchLater}
            />
          </Section>
        </div>

        {/* Prochaines sorties */}
        <Section title="Prochainement au cinéma">
          <MovieList
            endpoint="movie/upcoming"
            type="movie"
            favorites={favoriteIds}
            watched={watchedIds}
            watchLater={watchLaterIds}
            onToggleFavorite={toggleFavorite}
            onToggleWatched={toggleWatched}
            onToggleWatchLater={toggleWatchLater}
          />
        </Section>
      </main>

      {/* Pied de page (Footer) */}
      <footer className={`${isDarkMode ? 'bg-gray-800' : 'bg-amber-500'} text-white py-12 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left space-y-4">
            <img src="./images/logo.svg" alt="Logo" className="h-9 brightness-0 invert" />
            <p className="opacity-80">&copy; {new Date().getFullYear()} Tous droits réservés.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-lg font-bold">Kaelian BAUDELET</p>
            <p className="text-sm opacity-70">Atelier Découverte React JS - EPSI Arras</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

