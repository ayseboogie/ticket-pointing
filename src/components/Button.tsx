import cn from "classnames";
import { PrismicLink } from "@prismicio/react";
import type * as prismic from "@prismicio/client";
import type * as clsxT from "clsx";
import { ReactNode } from "react";

const baseStyles: clsxT.ClassDictionary = {
  solid:
    "group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none",
  link: "group inline-flex items-center justify-center py-2 px-4 text-sm font-semibold underline underline-offset-8 hover:underline-offset-4 transition-all duration-300 ease-in-out",
};

const variantStyles: clsxT.ClassDictionary = {
  solid: {
    slate:
      "bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900",
    blue: "bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600",
    white:
      "bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white",
  },
  outline: {
    slate:
      "ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300",
    white:
      "ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white",
  },
  link: {
    slate: "text-slate-700 hover:text-slate-900",
    white: "text-white hover:text-slate-100 active:text-slate-300",
  },
};

export function Button({
  variant = "solid",
  color = "slate",
  className,
  href = "#",
  field,
  document,
  submit,
  button,
  ...props
}: {
  variant?: string;
  color?: string;
  className?: string;
  children?: ReactNode;
  href?: string;
  field?: prismic.LinkField;
  document?: prismic.PrismicDocument;
  submit?: boolean;
  button?: boolean;
}) {
  className = cn(baseStyles[variant], variantStyles[variant][color], className);

  if (submit) {
    return <button type="submit" className={className} {...props} />;
  }

  if (button) {
    return <button type="button" className={className} {...props} />;
  }

  if (field) {
    return <PrismicLink className={className} {...props} field={field} />;
  }

  return document ? (
    <PrismicLink className={className} {...props} document={document} />
  ) : (
    <PrismicLink className={className} {...props} href={href} />
  );
}
