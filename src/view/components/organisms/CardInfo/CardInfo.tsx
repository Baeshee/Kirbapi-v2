import { useEffect, useState } from "react";
import CloseButton from "../../atoms/CloseButton/CloseButton";
import $ from "./cardinfo.module.scss";
import { cx } from "../../../../core/helpers/join-classnames";
import Game from "../../molecules/Game/Game";
import { useBreakpoint } from "../../../../core/services/hooks";

interface Props {
  ability: Record<string, any> | null;
  setIndex: (index: number | null) => void;
  games: Record<string, string>[];
}

const CardInfo: React.FC<Props> = ({ ability, setIndex, games }) => {
  const breakpoint = useBreakpoint();
  const [content, setContent] = useState<number>(0);
  const [gameDetails, setGameDetails] = useState<Record<string, string>[]>([]); // [firstGame, lastGame
  let infoContent = null;

  useEffect(() => {
    const firstGame = games.find((game) => game.name === ability!.first_game);
    const lastGame = games.find((game) => game.name === ability!.last_game);
    setGameDetails([firstGame!, lastGame!]);
  }, [ability]);

  if (ability) {
    switch (content) {
      case 0:
        infoContent = (
          <section className={$.infoContent}>
            <p className={$.label}>Description</p>
            <p className={$.value}>{ability.description}</p>
            <p className={$.label}>Type</p>
            <p className={$.value}>{ability.type}</p>
            <p className={$.label}>Primary provider</p>
            <p className={$.value}>{ability.primary}</p>
            <p className={$.label}>Extra power</p>
            <p className={$.value}>{ability.extra_power}</p>
          </section>
        );
        break;
      case 1:
        infoContent = (
          <section className={$.infoContent}>
            {typeof ability.kirby_appearance === "object" ? (
              ability.kirby_appearance.map(
                (appearance: string, index: number) => (
                  <div className={$.contentWrap}>
                    <p className={$.label}>
                      {appearance.slice(0, appearance.indexOf(":"))}
                    </p>
                    <p key={index} className={$.value}>
                      {appearance.slice(
                        appearance.indexOf(":") + 2,
                        appearance.length
                      )}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className={$.value}>{ability.kirby_appearance}</p>
            )}
          </section>
        );
        break;
      case 2:
        infoContent = (
          <section className={$.infoContent}>
            <p className={$.label}>Total appearances</p>
            <p className={$.value}>{ability.appearances}</p>
            <section className={$.gameWrapper}>
              <Game
                label={"First game"}
                img={gameDetails[0].image}
                game_name={ability.first_game}
                year={ability.f_year}
              />
              <Game
                label={"Last game"}
                img={gameDetails[1].image}
                game_name={ability.last_game}
                year={ability.l_year}
              />
            </section>
          </section>
        );
    }
  }

  if (!ability) return null;
  return (
    <div className={$.cardInfo}>
      {breakpoint === "phone" ? (
        <CloseButton icon={"close"} setIndex={setIndex} />
      ) : null}
      <figure
        className={$.imageContainer}
        style={{ backgroundColor: `${ability.color}` }}
      >
        <img src={ability.image} />
      </figure>
      <section className={$.cardInfo__body}>
        <h2>{ability.name}</h2>
        <section className={$.typeWrapper}>
          {ability.type.split(", ").map((type: string, index: number) => (
            <p
              key={index}
              className={cx(
                $.typeBase,
                type.toLowerCase().includes("melee") ? $.blue : null,
                type.toLowerCase().includes("elemental") ? $.yellow : null,
                type.toLowerCase().includes("transformational") ? $.pink : null,
                type.toLowerCase().includes("weapon") ? $.blueLight : null,
                type.toLowerCase().includes("physical") ? $.purple : null,
                type.toLowerCase().includes("psychic") ? $.purpleLight : null,
                type.toLowerCase().includes("energy") ? $.red : null,
                type.toLowerCase().includes("none") ||
                  type.toLocaleLowerCase().includes("activates")
                  ? $.grey
                  : null,
                type.toLowerCase().includes("one-use") ||
                  type.toLowerCase().includes("1-use") ||
                  type.toLowerCase().includes("3-use")
                  ? $.pink
                  : null,
                type.toLowerCase().includes("magical") ? $.pink : null,
                type.toLowerCase().includes("projectile") ? $.aqua : null
              )}
            >
              {type}
            </p>
          ))}
        </section>
        <section className={$.contentHeaders}>
          <p
            className={cx(content === 0 ? $.headerActive : $.header)}
            onClick={() => setContent(0)}
          >
            About
          </p>
          <p
            className={cx(content === 1 ? $.headerActive : $.header)}
            onClick={() => setContent(1)}
          >
            Appearance
          </p>
          <p
            className={cx(content === 2 ? $.headerActive : $.header)}
            onClick={() => setContent(2)}
          >
            games
          </p>
        </section>
        {infoContent}
      </section>
    </div>
  );
};

export default CardInfo;
