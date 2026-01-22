import { PropsWithChildren } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
>;

const NextButton: React.FC<PropType> = (props) => {
  const { ...restProps } = props;

  return (
    <button
      className="bg-transparent	touch-manipulation flex	cursor-pointer w-8 h-8 ml-8"
      type="button"
      {...restProps}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </button>
  );
};

export default NextButton;
