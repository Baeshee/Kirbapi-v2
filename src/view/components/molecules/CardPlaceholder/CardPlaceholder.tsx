import $ from "./cardplaceholder.module.scss";
import CardInfo from "../../organisms/CardInfo/CardInfo";

interface Props {
  ability: Record<string, string> | null;
  setIndex: (index: number | null) => void;
  games: Record<string, string>[];
}

const CardPlaceholder: React.FC<Props> = ({ ability, setIndex, games }) => {
  if (!ability)
    return (
      <section className={$.wrapper}>
        <div className={$.placeholder} />
      </section>
    );
  return (
    <section className={$.wrapper}>
      <div className={$.placeholder}>
        <CardInfo ability={ability} setIndex={setIndex} games={games} />
      </div>
    </section>
  );
};

export default CardPlaceholder;
