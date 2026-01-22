"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import {
  NavigationSliceSlice,
  NavigationSliceSliceDefaultPrimarySubmenuItem,
} from "../../../../prismicio-types";
import { isFilled } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";

type DesktopMenuProps = {
  navSlice: NavigationSliceSlice;
};

const Desktop = ({ navSlice }: DesktopMenuProps) => {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 5,
      rotateX: 0,
      transition: {
        duration: 0.25,
      },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.75,
      },
      transitionEnd: {
        display: "none",
      },
    },
  };

  const hasSubMenu = navSlice?.primary.submenu?.length;

  return (
    <div>
      <motion.li
        className="group/link"
        onHoverStart={() => {
          toggleHoverMenu();
        }}
        onHoverEnd={toggleHoverMenu}
        key={navSlice.id}
      >
        {/* if value & no submenu, wrap in a link */}
        {isFilled.richText(navSlice.primary.name) && !hasSubMenu && (
          <PrismicLink field={navSlice.primary.link}>
            <span className="flex-center tab-span group">
              <div className="group-hover:text-highlight">
                <PrismicRichText field={navSlice.primary.name} />
              </div>
            </span>
          </PrismicLink>
        )}

        {/* if value & submenu, display name with dropdown icon. Must ? : null or zeros will display on ui */}
        {isFilled.richText(navSlice.primary.name) && hasSubMenu ? (
          <span className="flex-center tab-span group">
            <PrismicRichText field={navSlice.primary.name} />
            <FontAwesomeIcon
              icon={faChevronDown}
              className="mt-[0.6px] group-hover/link:rotate-180 duration-200"
            />
          </span>
        ) : null}
        {hasSubMenu ? (
          <motion.div
            className="sub-menu"
            initial="exit"
            animate={isHover ? "enter" : "exit"}
            variants={subMenuAnimate}
          >
            <div className="submmenu-wrapper">
              {hasSubMenu &&
                navSlice.primary.submenu?.map(
                  (
                    submenu: NavigationSliceSliceDefaultPrimarySubmenuItem,
                    i: number,
                  ) => (
                    <div key={i}>
                      {isFilled.richText(submenu.name) && (
                        <PrismicLink field={submenu.link}>
                          <div
                            key={i}
                            id="submenu-link"
                            className="submenu-link group"
                          >
                            <div className="flex-center gap-x-4">
                              <div>
                                <div className="submenu-name group-hover:text-highlight">
                                  <PrismicRichText field={submenu.name} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </PrismicLink>
                      )}
                    </div>
                  ),
                )}
            </div>
          </motion.div>
        ) : null}
      </motion.li>
    </div>
  );
};

export default Desktop;
