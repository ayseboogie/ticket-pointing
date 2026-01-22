import { useRefinementList, UseRefinementListProps } from "react-instantsearch";
import React from "react";

const CustomRefinementList = (props: UseRefinementListProps) => {
  const { items, refine } = useRefinementList(props);

  return (
    <div id="custom-refinement-list" className="flex flex-row">
      {items.map((item) => (
        <div key={item.label} className="flex pr-4">
          <input
            type="checkbox"
            checked={item.isRefined}
            onChange={() => refine(item.value)}
          />
          <div className="pl-2">{item.label}</div>
          <div> ({item.count})</div>
        </div>
      ))}
    </div>
  );
};

export default CustomRefinementList;
