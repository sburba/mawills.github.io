import React, { useEffect, useState } from "react";
import "./App.css";
import Suggestions from "./Choices";
import Toast from "./Toast";
import RestaurantSuggester from "../domain/RestaurantSuggester";

interface AppProps {
  suggester: RestaurantSuggester;
}

const App: React.FC<AppProps> = (props: AppProps) => {
  const [choice, setChoice] = useState();
  const [choices] = useState(() => props.suggester.suggest(3));
  useEffect(() => choice && props.suggester.choose(choice));

  const msg = choice ? `${choice} it is` : undefined;
  return (
    <div className="App">
      <Suggestions
        choices={choices}
        onChoiceSelected={choice => setChoice(choice)}
      />
      <Toast msg={msg} />
    </div>
  );
};

export default App;
