import { useEffect, useState } from "react";
import { getData } from "../core/services/firebase/handlers";
import CardContainer from "./components/organisms/CardContainer/CardContainer";
import InputField from "./components/atoms/InputField/InputField";
import $ from "../styles/app.module.scss";
import CardInfo from "./components/organisms/CardInfo/CardInfo";
import { useBreakpoint } from "../core/services/hooks";
import CardPlaceholder from "./components/molecules/CardPlaceholder/CardPlaceholder";

const App: React.FC = () => {
  const breakpoint = useBreakpoint();
  const [abilities, setAbilities] = useState<Record<string, string>[]>([]);
  const [games, setGames] = useState<Record<string, string>[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [index, setIndex] = useState<number | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (index !== null && window.innerWidth < 799) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  useEffect(() => {
    const getAbilities = async () => {
      const res = await getData("kirbapi_abilities");

      setAbilities(res);
      sessionStorage.setItem("abilities", JSON.stringify(res));
    };

    if (!sessionStorage.getItem("abilities")) {
      getAbilities();
    } else {
      setAbilities(JSON.parse(sessionStorage.getItem("abilities") ?? "{}"));
    }
  }, []);

  useEffect(() => {
    const getGames = async () => {
      const res = await getData("kirbapi_games");

      setGames(res);
      sessionStorage.setItem("games", JSON.stringify(res));
    };

    if (!sessionStorage.getItem("games")) {
      getGames();
    } else {
      setGames(JSON.parse(sessionStorage.getItem("games") ?? "{}"));
    }
  }, []);

  return (
    <article className={$.app}>
      <InputField onChange={onChange} />
      <section className={$.body}>
        <CardContainer
          abilities={abilities}
          filter={filter}
          setIndex={setIndex}
        />
        {breakpoint === "desktop" ? (
          <CardPlaceholder
            ability={abilities[index!]}
            setIndex={setIndex}
            games={games}
          />
        ) : null}
      </section>

      {index !== null && breakpoint === "phone" ? (
        <CardInfo
          ability={abilities[index!]}
          setIndex={setIndex}
          games={games}
        />
      ) : null}
    </article>
  );
};

export default App;
