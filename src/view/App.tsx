import { useEffect, useState } from "react";
import { getData } from "../core/services/firebase/handlers";

const App: React.FC = () => {
  const [abilities, setAbilities] = useState<Record<string, string>[]>([]);

  useEffect(() => {
    const getAbilities = async () => {
      const res = await getData();

      setAbilities(res);
      sessionStorage.setItem("abilities", JSON.stringify(res));
    };

    if (!sessionStorage.getItem("abilities")) {
      getAbilities();
    } else {
      setAbilities(JSON.parse(sessionStorage.getItem("abilities") ?? "{}"));
    }
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

export default App;
