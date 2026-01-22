"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import DefaultTeam from "@/components/Slices/Team/DefaultTeam.tsx";

/**
 * Props for `Team`.
 */
export type TeamProps = SliceComponentProps<Content.TeamSlice>;

/**
 * Component for "Team" Slices.
 */
const Team = ({ slice }: TeamProps) => {
  return <DefaultTeam slice={slice} />;
};

export default Team;
