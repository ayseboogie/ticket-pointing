import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import FormSimple from "@/components/Slices/Form/FormSimple";
import FormWithDetails from "@/components/Slices/Form/FormWithDetails";
import FormCentered from "@/components/Slices/Form/FormCentered";

/**
 * Props for `Form`.
 */
export type FormProps = SliceComponentProps<Content.FormSlice>;

/**
 * Component for "Form" Slices.
 */
const Form = ({ slice }: FormProps) => {
  switch (slice.variation) {
    case "simple":
      return <FormSimple {...slice} />;
    case "withDetails":
      return <FormWithDetails {...slice} />;
    case "centered":
      return <FormCentered {...slice} />;
  }
};

export default Form;
