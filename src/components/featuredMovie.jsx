import { FaStar } from 'react-icons/fa6';

/**
 * Composant pour afficher le film mis en avant (Featured Movie).
 * Affiche une grande bannière avec le titre, la description et la note.
 */

export default function FeaturedMovie({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const date = movie.release_date || movie.first_air_date || '';
  const year = date ? new Date(date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  // Définit l'image de fond : on utilise le backdrop_path pour un affichage large
  const imagePath = movie.backdrop_path || movie.poster_path;
  const backgroundImage = imagePath
    ? `https://image.tmdb.org/t/p/original${imagePath}`
    : 'https://placeholder.co/1920x1080?text=No+Image';

  return (
    <div className="relative h-[500px] w-full overflow-hidden shadow-2xl group">
      {/* Image de fond avec un dégradé pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0">
        <img
          src={backgroundImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Contenu textuel sur l'image */}
      <div className="relative h-full flex flex-col justify-center px-8 md:px-16 max-w-3xl">
        <h3 className="text-4xl md:text-6xl font-black mb-4 text-white drop-shadow-lg tracking-tight">
          {title}
        </h3>
        <p className="text-gray-200 text-lg md:text-xl mb-8 line-clamp-3 drop-shadow">
          {movie.overview}
        </p>
        
        <div className="flex items-center gap-6">
          {/* Note moyenne TMDB */}
          <div className="flex items-center gap-2 bg-amber-500/90 backdrop-blur-md px-4 py-2 font-black text-black">
            <FaStar />
            <span>{rating}/10</span>
          </div>
          {/* Année de sortie */}
          <span className="text-white font-bold text-lg bg-white/20 backdrop-blur-md px-4 py-2">
            {year}
          </span>
        </div>
      </div>
    </div>
  );
}
