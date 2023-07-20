import $ from "./closebutton.module.scss";

interface Props {
  icon: string;
  setIndex: (index: number | null) => void;
}

const CloseButton: React.FC<Props> = ({ setIndex, icon }) => {
  return (
    <button className={$.close} onClick={() => setIndex(null)}>
      <span className="material-symbols-outlined">{icon}</span>
    </button>
  );
};

export default CloseButton;
