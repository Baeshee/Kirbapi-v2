import $ from "./inputfield.module.scss";

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = ({ onChange }) => {
  return (
    <input
      className={$.input}
      type="text"
      placeholder="Search for an ability"
      onChange={onChange}
    />
  );
};

export default InputField;
