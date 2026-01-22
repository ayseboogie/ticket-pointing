import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import SearchCmp from "@/components/Slices/Search/SearchCmp.tsx";

export type SearchProps = SliceComponentProps<Content.SearchSlice>;

const Search = ({ slice }: SearchProps) => {
  return <SearchCmp slice={slice} />;
};

export default Search;
