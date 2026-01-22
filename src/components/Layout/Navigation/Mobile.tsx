"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  faBars,
  faChevronDown,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NavigationDocumentData,
  NavigationSliceSlice,
  NavigationSliceSliceDefaultPrimarySubmenuItem,
} from "../../../../prismicio-types";
import { isFilled } from "@prismicio/client";
import { PrismicLink, PrismicRichText } from "@prismicio/react";

type MobMenuProps = {
  Menus: NavigationDocumentData;
};

const Mobile = ({ Menus }: MobMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  return (
    <div>
      <button className="hamburger-menu" onClick={toggleDrawer}>
        {isOpen ? (
          <FontAwesomeIcon icon={faClose} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </button>

      <motion.div
        className="mobile-nav-wrapper"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {Menus.slices?.map(
            (navSlice: NavigationSliceSlice, index: number) => {
              const isClicked = clicked === index;
              const hasSubMenu = navSlice.primary.submenu?.length;

              return (
                <li key={index ?? ""}>
                  {/* if value & no submenu, wrap in a link */}
                  {isFilled.richText(navSlice.primary.name) && !hasSubMenu && (
                    <PrismicLink field={navSlice.primary.link}>
                      <span
                        className="flex-center-between mobile-menu-link"
                        onClick={() => setClicked(isClicked ? null : index)}
                      >
                        <PrismicRichText field={navSlice.primary.name} />
                      </span>
                    </PrismicLink>
                  )}
                  {/* if value & submenu, display name with dropdown icon. Must ? : null or zeros will display on ui */}
                  {isFilled.richText(navSlice.primary.name) && hasSubMenu ? (
                    <span
                      className="flex-center-between mobile-menu-link"
                      onClick={() => setClicked(isClicked ? null : index)}
                    >
                      <>
                        <PrismicRichText field={navSlice.primary.name} />
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={`ml-auto ${isClicked && "rotate-180"} `}
                        />
                      </>
                    </span>
                  ) : null}

                  {hasSubMenu ? (
                    <motion.ul
                      initial="exit"
                      animate={isClicked ? "enter" : "exit"}
                      variants={subMenuDrawer}
                      className="ml-5"
                    >
                      {navSlice.primary.submenu?.map(
                        (
                          submenu: NavigationSliceSliceDefaultPrimarySubmenuItem,
                          index: number,
                        ) => {
                          return (
                            <div key={index}>
                              {isFilled.richText(submenu.name) && (
                                <PrismicLink field={submenu.link}>
                                  <li
                                    key={index}
                                    className="flex-center mobile-submenu-link"
                                  >
                                    <PrismicRichText field={submenu.name} />
                                  </li>
                                </PrismicLink>
                              )}
                            </div>
                          );
                        },
                      )}
                    </motion.ul>
                  ) : null}
                </li>
              );
            },
          )}
        </ul>
      </motion.div>
    </div>
  );
};

export default Mobile;
