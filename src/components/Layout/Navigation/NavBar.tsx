import {
  LayoutconstantsDocument,
  NavigationDocument,
  NavigationSliceSlice,
} from "../../../../prismicio-types";
import Link from "next/link";
import Desktop from "@/components/Layout/Navigation/Desktop.tsx";
import Mobile from "@/components/Layout/Navigation/Mobile.tsx";
import SuspenseImage from "@/components/Suspense/SuspenseImage.tsx";

type NavBarProps = {
  navigation: NavigationDocument;
  layoutConstants: LayoutconstantsDocument;
};

const NavBar = ({ navigation, layoutConstants }: NavBarProps) => {
  return (
    <div className="navBar-wrapper">
      <nav className="px-3.5 flex-center-between w-full mx-auto">
        <div className="flex-center gap-x-3 z-[9999] relative">
          <Link href="/">
            <SuspenseImage
              image={layoutConstants.data.logo}
              className="size-8"
            />
          </Link>
        </div>

        <ul className="gap-x-1 hidden md:flex-center">
          {navigation.data.slices.map(
            (navSlice: NavigationSliceSlice, index) => (
              <Desktop navSlice={navSlice} key={index} />
            ),
          )}
        </ul>
        <div className="flex-center gap-x-5">
          <div className="md:hidden">
            <Mobile Menus={navigation.data} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
