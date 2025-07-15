const Backdrop = ({ b }) => {
  return (
    <div className="bg">
      <img
        className="ibg"
        src={`https://image.tmdb.org/t/p/w1280${b.backdrop_path}`}
      />
      <h1 className="it">{b.title}</h1>
    </div>
  );
};

export default Backdrop;
