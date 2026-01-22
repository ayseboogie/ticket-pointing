"use client";

import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import * as React from "react";
import {
  Configure,
  HitsPerPage,
  InstantSearch,
  Pagination,
  SearchBox,
} from "react-instantsearch";
import historyRouter from "instantsearch.js/es/lib/routers/history";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faSpinner,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { algoliasearch } from "algoliasearch";
import "instantsearch.css/themes/algolia-min.css";
import styles from "@/components/AlgoliaStyles/algoliaTheme.module.css";
import { HeadingWrapper } from "@/components/HeadingWrapper.tsx";
import CustomRefinementList from "@/components/Slices/Search/CustomRefinementList.tsx";
import CustomHits from "@/components/Slices/Search/CustomHits.tsx";
import { Content } from "@prismicio/client";
import { ThemeContainer } from "@/components/ComponentTheme/Theme";

type SearchCmpProps = {
  slice: Content.SearchSlice;
};

// const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "";
// const algoliaAdminKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_KEY ?? "";
//
// const searchClient = algoliasearch(algoliaAppId, algoliaAdminKey);

const SearchCmp = ({ slice }: SearchCmpProps) => {
  const themeColor =
    slice.primary.theme === "Blue" || slice.primary.theme === "Dark"
      ? "dark"
      : "light";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="grid gap-10 px-4 md:px-20 pt-10 md:pt-20">
        {prismic.isFilled.richText(slice.primary.heading) && (
          <HeadingWrapper size="5xl" className="text-center">
            <PrismicText field={slice.primary.heading} />
          </HeadingWrapper>
        )}

        {/* routing syncs the UI state and the URL */}
        {/*insights sends click events from search*/}
        {/*<InstantSearch*/}
        {/*  searchClient={searchClient}*/}
        {/*  indexName="PORTFOLIO"*/}
        {/*  insights={true}*/}
        {/*  routing={{*/}
        {/*    router: historyRouter({*/}
        {/*      cleanUrlOnDispose: false,*/}
        {/*    }),*/}
        {/*  }}*/}
        {/*  future={{*/}
        {/*    preserveSharedStateOnUnmount: true,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Configure ruleContexts={[]} />*/}
        {/*  <div className="flex flex-col md:flex-row">*/}
        {/*    /!* search box *!/*/}
        {/*    <div className="w-full md:pr-10">*/}
        {/*      <SearchBox*/}
        {/*        placeholder="search..."*/}
        {/*        autoFocus*/}
        {/*        submitIconComponent={() => (*/}
        {/*          <div className="w-4 h-4">*/}
        {/*            <FontAwesomeIcon icon={faMagnifyingGlass} />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        resetIconComponent={() => (*/}
        {/*          <div>*/}
        {/*            <FontAwesomeIcon icon={faX} className="w-3 h-3" />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        loadingIconComponent={() => (*/}
        {/*          <div className="w-4 h-4">*/}
        {/*            <FontAwesomeIcon icon={faSpinner} />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*        classNames={{*/}
        {/*          root: "w-full",*/}
        {/*          form: "block relative",*/}
        {/*          input:*/}
        {/*            "w-full relative rounded py-1 px-7 focus:outline-none focus:border-highlight focus:ring-highlight" +*/}
        {/*            " rounded-md focus:ring-1",*/}
        {/*          resetIcon: "w-3 h-3",*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}

        {/*    /!* how many results per pagination page *!/*/}
        {/*    /!* custom doc page - https://www.algolia.com/doc/api-reference/widgets/hits-per-page/react/?client=ts *!/*/}
        {/*    <HitsPerPage*/}
        {/*      items={[*/}
        {/*        { label: "9 hits per page", value: 9, default: true },*/}
        {/*        { label: "18 hits per page", value: 18 },*/}
        {/*      ]}*/}
        {/*      classNames={{*/}
        {/*        root: "hidden md:flex",*/}
        {/*        select: `py-1 px-3 md:px-7 bg-no-repeat bg-center rounded max-w-full ${styles.HitsPerPageSelect}`,*/}
        {/*        option: styles.HitsPerPageOption,*/}
        {/*      }}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*  /!* category filter *!/*/}
        {/*  <CustomRefinementList attribute="category" />*/}

        {/*  <ThemeContainer*/}
        {/*    theme={slice.primary.theme}*/}
        {/*    className="px-10 sm:px-16 py-8 sm:py-4"*/}
        {/*  >*/}
        {/*    <div*/}
        {/*      className={`${themeColor === "dark" ? "text-white" : "text-darkGrey"}`}*/}
        {/*    >*/}
        {/*      /!* results *!/*/}
        {/*      <CustomHits />*/}
        {/*      /!* pagination *!/*/}
        {/*      <Pagination*/}
        {/*        classNames={{*/}
        {/*          root: "pb-8",*/}
        {/*          list: styles.PaginationList,*/}
        {/*          item: styles.PaginationItem,*/}
        {/*          link: styles.PaginationLink,*/}
        {/*          selectedItem: styles.PaginationItemSelected,*/}
        {/*          disabledItem: styles.PaginationItemDisabled,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*  </ThemeContainer>*/}
        {/*</InstantSearch>*/}
      </div>
    </section>
  );
};

export default SearchCmp;
