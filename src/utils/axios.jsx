import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NGU0YTYwOGJjMTQyMTBhMjgxNjM1Mjg1YjdiYzVlMyIsIm5iZiI6MTcyNjkwMjMxOS4wNjc4NTUsInN1YiI6IjY2ZWU2ZGI3NmZkN2NjN2Q0MjNhZjFiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cSpQtMOhc9UauHwNeu1fDTpgg1csF75HvI6F087dX6s",
  },
});

export default instance;
