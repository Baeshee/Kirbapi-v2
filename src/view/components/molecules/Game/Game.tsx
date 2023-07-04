import $ from "./game.module.scss";

interface Props {
  label: string;
  img: string;
  game_name: string;
  year: string;
}

const Game: React.FC<Props> = ({ img, game_name, year, label }) => {
  return (
    <section className={$.game}>
      <p>{label}</p>
      <img src={img} />
      <section className={$.game__body}>
        <p className={$.name}>{game_name}</p>
        <p>{year}</p>
      </section>
    </section>
  );
};

export default Game;
