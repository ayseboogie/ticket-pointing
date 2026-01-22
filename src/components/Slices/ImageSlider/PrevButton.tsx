import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const PrevButton: React.FC<PropType> = (props) => {
  const { ...restProps } = props;

  return (
    <button
      className="bg-transparent	touch-manipulation flex	cursor-pointer  w-8 h-8 mr-8"
      type="button"
      {...restProps}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
};

export default PrevButton;
