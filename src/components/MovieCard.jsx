import { useState } from 'react';
import { 
  FaHeart, 
  FaRegHeart, 
  FaStar, 
  FaPlay, 
  FaCheck, 
  FaClock, 
  FaXmark 
} from 'react-icons/fa6';

/**
 * Composant pour afficher une carte de film ou de série.
 */

export default function MovieCard({ 
  movie, 
  type, 
  isFavorite, 
  isWatched, 
  isWatchLater, 
  onToggleFavorite,
  onToggleWatched,
  onToggleWatchLater
}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const isMovie = type === 'movie' || movie.title !== undefined;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Récupération de la bande-annonce depuis TMDB (YouTube)
  const fetchTrailer = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/${isMovie ? 'movie' : 'tv'}/${movie.id}/videos?api_key=${API_KEY}&language=fr-FR`
      );
      const data = await res.json();
      // On cherche une vidéo de type "Trailer" sur YouTube
      const trailer = data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      ) || data.results[0];
      
      if (trailer) {
        setTrailerKey(trailer.key);
        setShowTrailer(true);
      } else {
        alert('Bande-annonce non disponible.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <li className="bg-white dark:bg-gray-800 shadow-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 relative group flex flex-col h-full border border-gray-100 dark:border-gray-700">
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Survol (Overlay) : bouton lecture et résumé */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center gap-4 p-4 text-center">
            <button
               onClick={fetchTrailer}
               className="bg-amber-500 hover:bg-amber-600 text-white p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
            >
              <FaPlay className="ml-1" />
            </button>
            <p className="text-white text-xs line-clamp-4 px-2">{movie.overview}</p>
          </div>
          
          <span className={`absolute top-3 left-3 px-2 py-1 text-[10px] font-black uppercase text-white shadow-sm ${isMovie ? 'bg-blue-600' : 'bg-purple-600'}`}>
            {isMovie ? 'Film' : 'Série'}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie);
            }}
            className="absolute top-3 right-3 p-2.5 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 text-amber-500 transition-all shadow-md z-10 cursor-pointer"
            aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>

        <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
          <div>
            <h3 className="text-base font-black mb-1 line-clamp-1 dark:text-gray-100" title={title}>{title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">{year}</span>
              <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                <FaStar className="mb-0.5" />
                <span>{rating}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => onToggleWatched(movie)}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-[10px] font-black uppercase transition-all ${
                isWatched 
                ? 'bg-green-500 text-white shadow-inner' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-50'
              }`}
            >
              <FaCheck /> {isWatched ? 'Vu' : 'Marquer vu'}
            </button>
            <button
              onClick={() => onToggleWatchLater(movie)}
              className={`flex items-center justify-center gap-2 py-2 px-3 text-[10px] font-black uppercase transition-all ${
                isWatchLater 
                ? 'bg-blue-500 text-white shadow-inner' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-50'
              }`}
            >
              <FaClock /> {isWatchLater ? 'Plus tard' : 'À voir'}
            </button>
          </div>
        </div>
      </li>

      {/* Modal pour la bande-annonce (iframe YouTube) */}
      {showTrailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl aspect-video overflow-hidden shadow-2xl border border-white/10">
            <button 
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 z-10 transition-colors"
            >
              <FaXmark size={24} />
            </button>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}

