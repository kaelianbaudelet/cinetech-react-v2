import { useState, useMemo, useEffect } from 'react';
import {
  FaArrowUpWideShort,
  FaArrowDownWideShort,
  FaSort,
  FaArrowDownAZ,
  FaArrowUpAZ,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
  FaFilter
} from 'react-icons/fa6';
import MovieCard from './MovieCard';

/**
 * Composant de liste de films avec filtrage, tri et recherche.
 */

const GENRES = [
  { id: 'all', name: 'Tous les genres' },
  { id: 28, name: 'Action' },
  { id: 12, name: 'Aventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comédie' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drame' },
  { id: 14, name: 'Fantastique' },
  { id: 27, name: 'Horreur' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science-Fiction' },
];

const STATUS_FILTERS = [
  { id: 'all', name: 'Tous les statuts' },
  { id: 'favorites', name: 'Mes Favoris' },
  { id: 'watched', name: 'Déjà vus' },
  { id: 'watchLater', name: 'À voir plus tard' },
];

export default function MovieList({
  endpoint = 'movie/now_playing',
  type = 'movie',
  favorites = [],
  watched = [],
  watchLater = [],
  onToggleFavorite,
  onToggleWatched,
  onToggleWatchLater,
  manualMovies = null,
}) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(manualMovies ? false : true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'popularity', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Récupération des films via l'API TMDB ou utilisation des films passés manuellement
  useEffect(() => {
    if (manualMovies) {
      setMovies(manualMovies);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Calcul du numéro de page TMDB (TMDB renvoie 20 résultats par page)
    const tmdbPage = Math.ceil((currentPage * itemsPerPage) / 20);
    
    fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${API_KEY}&language=fr-FR&page=${tmdbPage}`
    )
      .then((res) => {
        if (!res.ok) throw new Error('Erreur réseau');
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [endpoint, manualMovies, currentPage]);

  // Logique combinée de filtrage (recherche, genre, statut) et de tri
  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    // Filtrage par recherche textuelle
    if (searchQuery) {
      result = result.filter(m => 
        (m.title || m.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtrage par genre
    if (selectedGenre !== 'all') {
      result = result.filter(m => m.genre_ids?.includes(Number(selectedGenre)) || (m.genre && m.genre === selectedGenre));
    }

    // Filtrage par statut (Favoris, Déjà vu, etc.)
    if (selectedStatus !== 'all') {
      switch(selectedStatus) {
        case 'favorites':
          result = result.filter(m => favorites.includes(m.id));
          break;
        case 'watched':
          result = result.filter(m => watched.includes(m.id));
          break;
        case 'watchLater':
          result = result.filter(m => watchLater.includes(m.id));
          break;
      }
    }

    // Tri des résultats
    if (sortConfig.key !== null) {
      result.sort((a, b) => {
        let valA, valB;
        
        switch(sortConfig.key) {
          case 'title':
            valA = (a.title || a.name || '').toLowerCase();
            valB = (b.title || b.name || '').toLowerCase();
            return sortConfig.direction === 'asc' 
              ? valA.localeCompare(valB) 
              : valB.localeCompare(valA);
          case 'date':
            valA = new Date(a.release_date || a.first_air_date || 0).getTime();
            valB = new Date(b.release_date || b.first_air_date || 0).getTime();
            break;
          case 'rating':
            valA = a.vote_average || 0;
            valB = b.vote_average || 0;
            break;
          case 'popularity':
            valA = a.popularity || 0;
            valB = b.popularity || 0;
            break;
          default:
            valA = a[sortConfig.key] || 0;
            valB = b[sortConfig.key] || 0;
        }

        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      });
    }

    // Gestion de la pagination (découpage du tableau)
    const startIndex = ((currentPage - 1) * itemsPerPage) % 20;
    return result.slice(startIndex, startIndex + itemsPerPage);
  }, [movies, sortConfig, searchQuery, selectedGenre, selectedStatus, currentPage, favorites, watched, watchLater]);

  // Change le mode de tri ou bascule la direction (asc/desc)
  const sortMovies = (key) => {
    let direction = 'desc';
    if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc';
    } else if (sortConfig.key === key && sortConfig.direction === 'asc') {
      setSortConfig({ key: 'popularity', direction: 'desc' });
      return;
    }
    setSortConfig({ key, direction });
  };

  // Récupère l'icône de tri correspondante
  const getIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="opacity-30" />;
    if (key === 'title') {
      return sortConfig.direction === 'asc' ? <FaArrowDownAZ /> : <FaArrowUpAZ />;
    }
    return sortConfig.direction === 'asc' ? <FaArrowUpWideShort /> : <FaArrowDownWideShort />;
  };

  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center py-20">
        <div className="h-1 w-24 bg-amber-500 animate-pulse"></div>
        <p className="mt-4 text-amber-600 font-black tracking-widest uppercase text-xs animate-pulse">Chargement...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 my-6 rounded-r shadow-sm">
        <p className="text-red-700 dark:text-red-400 font-bold flex items-center gap-2">
          <span>⚠️</span> Erreur : {error}
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-wrap gap-4 items-center bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-all">
        {/* Search */}
        <div className="relative flex-grow min-w-[250px]">
          <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700/50 border-none focus:ring-2 focus:ring-amber-500 transition-all text-sm outline-none"
          />
        </div>

        {/* Filters and Search grouped */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Genre Filter */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1">
            <FaFilter className="text-gray-400 text-xs" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent border-none py-1.5 text-xs font-bold focus:ring-0 outline-none transition-all cursor-pointer"
            >
              {GENRES.map(g => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 px-3 py-1">
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Statut:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none py-1.5 text-xs font-bold focus:ring-0 outline-none transition-all cursor-pointer"
            >
              {STATUS_FILTERS.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-[1px] bg-gray-200 dark:bg-gray-700 mx-2"></div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => sortMovies('popularity')}
              className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${sortConfig.key === 'popularity' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Populaire {getIcon('popularity')}
            </button>
            <button
              onClick={() => sortMovies('rating')}
              className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${sortConfig.key === 'rating' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Note {getIcon('rating')}
            </button>
            <button
              onClick={() => sortMovies('date')}
              className={`px-4 py-2 text-xs font-bold transition-all flex items-center gap-2 ${sortConfig.key === 'date' ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30' : 'bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Date {getIcon('date')}
            </button>
          </div>
        </div>
      </div>

      {filteredAndSortedMovies.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-800/30 border-2 border-dashed border-gray-200 dark:border-gray-700">
           <div className="text-5xl mb-4">🎬</div>
           <p className="text-gray-400 dark:text-gray-500 font-medium">Aucun film ne correspond à vos critères.</p>
           <button 
             onClick={() => { setSearchQuery(''); setSelectedGenre('all'); setSelectedStatus('all'); }}
             className="mt-4 text-amber-500 font-bold hover:underline"
           >
             Réinitialiser les filtres
           </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
          {filteredAndSortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              type={type}
              isFavorite={favorites.includes(movie.id)}
              isWatched={watched.includes(movie.id)}
              isWatchLater={watchLater.includes(movie.id)}
              onToggleFavorite={onToggleFavorite}
              onToggleWatched={onToggleWatched}
              onToggleWatchLater={onToggleWatchLater}
            />
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {!manualMovies && movies.length > 0 && (
        <div className="flex justify-center items-center gap-8 mt-16 py-8">
          <button
            onClick={() => { setCurrentPage(prev => Math.max(1, prev - 1)); }}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all font-black text-sm uppercase tracking-wider"
          >
            <FaChevronLeft /> Précédent
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Page</span>
            <span className="font-black text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-lg min-w-[3rem] text-center">
              {currentPage}
            </span>
          </div>

          <button
            onClick={() => { setCurrentPage(prev => prev + 1); }}
            className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all font-black text-sm uppercase tracking-wider"
          >
            Suivant <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}


