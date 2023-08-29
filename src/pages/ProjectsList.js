import CreateProject from "./CreateProject";
 
function ProjectsList() {
  const [movies, setMovies] = useState(moviesDataJSON);
 
  return (
    <div>
      <CreateProject /> {/* <==  ADD HERE ! */}
      { movies.map(movie => {
        return <MovieCard key={movie._id} movie={movie} />;
      }) }
    </div>
  );
}
 
export default MovieList;