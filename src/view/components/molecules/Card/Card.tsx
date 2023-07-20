import $ from "./card.module.scss";

interface Props {
  ability: Record<string, string>;
  setIndex: (index: number | null) => void;
  index: number;
}

const Card: React.FC<Props> = ({ ability, setIndex, index }) => {
  return (
    <div className={$.card} onClick={() => setIndex(index)}>
      <figure
        className={$.imageContainer}
        style={{ backgroundColor: `${ability.color}` }}
      >
        <img src={ability.image} />
      </figure>
      <section className={$.card__body}>
        <h2>{ability.name}</h2>
        <p>{ability.description}</p>
        <img className={$.logo} src={ability.logo} />
      </section>
    </div>
  );
};

export default Card;
