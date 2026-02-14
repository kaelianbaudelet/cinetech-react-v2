/**
 * Liste de films de test (fallback) utilisée lorsque l'API rencontre un problème
 * ou pour l'affichage de sélections manuelles.
 */
const moviesList = [
  {
    id: 1,
    title: 'Zootopie 2',
    year: 2025,
    director: 'Jared Bush',
    rating: 7.7,
    image: 'https://image.tmdb.org/t/p/w1280/qq6MfHFDvBEzHhkE0Q5ozbkbde4.jpg',
    description:
      "Les agents de police Judy Hopps et Nick Wilde doivent suivre la piste sinueuse d'un mystérieux reptile qui arrive à Zootopie et met la métropole des mammifères sens dessus dessous.",
    genre: 'animation',
  },
  {
    id: 2,
    title: 'Dune, deuxième partie',
    year: 2024,
    director: 'Denis Villeneuve',
    rating: 8.4,
    image: 'https://image.tmdb.org/t/p/w1280/dM2eC02Dq3iMtBZZDFtXSLHfFKJ.jpg',
    description:
      'Paul Atreides s’allie aux Fremen pour lancer la guerre contre la Maison Harkonnen sur Arrakis — suite spectaculaire du premier volet, entre politique, trahisons et batailles interstellaires.',
    genre: 'science-fiction',
  },
  {
    id: 3,
    title: 'Furiosa : Une saga Mad Max',
    year: 2024,
    director: 'George Miller',
    rating: 7.5,
    image: 'https://image.tmdb.org/t/p/w1280/hbxqFdWXHeLIJfagMMhVG5SV5tb.jpg',
    description:
      'Prequel de Mad Max: Fury Road, ce film retrace les origines de Furiosa dans un monde post-apocalyptique brutal et impitoyable.',
    genre: 'action',
  },
  {
    id: 4,
    title: 'Mission : Impossible - The Final Reckoning',
    year: 2025,
    director: 'Christopher McQuarrie',
    rating: 7.2,
    image: 'https://image.tmdb.org/t/p/w1280/AozMgdALZuR1hDPZt2a1aXiWmL4.jpg',
    description:
      'Dernier épisode de la saga Mission: Impossible (pour l’instant) : Ethan Hunt et l’équipe tentent d’empêcher une intelligence artificielle destructrice de plonger le monde dans le chaos.',
    genre: 'action',
  },
  {
    id: 5,
    title: 'The Running Man',
    year: 2025,
    director: 'Edgar Wright',
    rating: 6.7,
    image: 'https://image.tmdb.org/t/p/w1280/7IwZANZ0V9ygf0LM7NsRVeIKZJR.jpg',
    description:
      "Dans un futur proche, \"The Running Man\" est 'une émission numéro un à la télévision: un jeu de survie impitoyable où des candidats, appelés les Runners, doivent échapper pendant 30 jours à des tueurs professionnels, sous l'oeil avide d'un public captivé.",
    genre: 'science-fiction',
  },
  {
    id: 6,
    title: 'All for One',
    year: 2024,
    director: 'Houda Benyamina',
    rating: 1.5,
    image: 'https://image.tmdb.org/t/p/w1280/3IaslOZjj3Woi9S3BPdS7d9oKEJ.jpg',
    description:
      'Aventure / cape-et-épée : quatre femmes — dans une intrigue inspirée vaguement des Trois Mousquetaires — sont chargées de protéger la reine de France.',
    genre: 'aventure',
  },
  {
    id: 7,
    title: 'Demain est un autre jour',
    year: 2025,
    director: 'Adam Brooks',
    rating: 6.5,
    image: 'https://image.tmdb.org/t/p/w1280/cxPVld83fyOxuepmks83pQyi5sH.jpg',
    description:
      'Comédie romantique / drame : après la perte de sa mère, Alex revisite ses rêves d’enfance, ce qui la pousse dans un voyage imprévisible vers l’acceptation et la reconstruction.',
    genre: 'drame',
  },
  {
    id: 8,
    title: 'Une bataille après l’autre',
    year: 2025,
    director: 'Paul Thomas Anderson',
    rating: 6.8,
    image: 'https://image.tmdb.org/t/p/w1280/mnlzDEFOiut55lzM9Lt9ga8xpwo.jpg',
    description:
      'Un groupe d’anciens révolutionnaires se réunit après 16 ans pour sauver la fille de l’un des leurs — promesse d’action et de drame.',
    genre: 'action',
  },
  {
    id: 9,
    title: 'Superman',
    year: 2025,
    director: 'James Gunn',
    rating: 7.1,
    image: 'https://image.tmdb.org/t/p/w1280/bL1U8TDb2ZiThIBFAdKHOfpv8lk.jpg',
    description:
      'Nouvelle vision ciné du super-héros — un conflit entre son héritage d’alien et son humanité dans un monde en crise.',
    genre: 'super-hero',
  },
  {
    id: 10,
    title: 'F1',
    year: 2025,
    director: 'Joseph Kosinski',
    rating: 7.7,
    image: 'https://image.tmdb.org/t/p/w1280/up0kyZZlLX24dE9SzDuTjXe6HFl.jpg',
    description:
      'Drame / action autour de la Formule 1 : un pilote sort de sa retraite pour encadrer un jeune talent — rivalités, vitesse et rédemption.',
    genre: 'drame',
  },
  {
    id: 11,
    title: 'Sinners',
    year: 2025,
    director: 'Ryan Coogler',
    rating: 7.6,
    image: 'https://image.tmdb.org/t/p/w1280/9ZmdDOIbiFCZOvRXBQ7muWUu32l.jpg',
    description:
      'Deux frères jumeaux retournent dans leur ville natale pour tenter de se reconstruire — mais un mal plus profond les attend. Drame puissant, selon les premières listes 2025.',
    genre: 'drame',
  },
  {
    id: 12,
    title: 'Tron: Ares',
    year: 2025,
    director: 'Joachim Rønning',
    rating: 6.5,
    image: 'https://image.tmdb.org/t/p/w1280/tkILExgVXhNLoxy4KNgCk9PC4lU.jpg',
    description:
      'Science-fiction / aventure : retour dans l’univers Tron, voyage numérique vers le monde humain — univers visuel et conceptuel fort.)',
    genre: 'science-fiction',
  },
  {
    id: 13,
    title: 'Captain America: Brave New World',
    year: 2025,
    director: 'Julius Onah',
    rating: 5.6,
    image: 'https://image.tmdb.org/t/p/w1280/wDRXmiAEJdhNIcuetM4016fOCx8.jpg',
    description:
      'Un nouveau chapitre pour Captain America — un film de super-héros moderne et engagé.',
    genre: 'super-hero',
  },
  {
    id: 14,
    title: 'Vice-versa 2',
    year: 2024,
    director: 'Kelsey Mann',
    rating: 7.5,
    image: 'https://image.tmdb.org/t/p/w1280/9Jic8z9NEeCEmSJFgFHZF1lWMFo.jpg',
    description:
      'Suite de l’animation culte — explore les émotions d’une adolescente et leurs complexités face à l’adolescence. Succès cinéma en 2024.',
    genre: 'animation',
  },
];

export default moviesList;
