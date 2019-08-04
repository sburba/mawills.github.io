import React from "react";
import "./Choices.css";

interface ChoiceProps {
  choices: string[];
  onChoiceSelected(choice: string): void;
}

const Choices = (props: ChoiceProps) => {
  return (
    <div className={"Choices-container"}>
      {props.choices.map((choice, i) => (
        <button
          key={choice}
          className="Choices-btn qa-choice-btn"
          onClick={props.onChoiceSelected.bind(props, choice)}
        >
          {i === props.choices.length - 1 ? choice : choice + ","}
        </button>
      ))}
    </div>
  );
};

export default Choices;
