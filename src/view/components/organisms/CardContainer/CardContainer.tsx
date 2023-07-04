import Card from "../../molecules/Card/Card";
import $ from "./cardcontainer.module.scss";
import { useState } from "react";

interface Props {
  abilities: Record<string, string>[];
  filter: string;
  setIndex: (index: number | null) => void;
}

const CardContainer: React.FC<Props> = ({ abilities, filter, setIndex }) => {
  return (
    <section className={$.cardContainer}>
      {abilities
        .filter((ability) => ability.name.includes(filter))
        .map((ability: Record<string, string>, index: number) => (
          <Card
            key={index}
            index={index}
            ability={ability}
            setIndex={setIndex}
          />
        ))}
    </section>
  );
};

export default CardContainer;
