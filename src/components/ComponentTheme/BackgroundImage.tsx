import Image from "next/image";
import bgBlue from "@/images/background-blue.jpg";
import bgLight from "@/images/background-light.jpg";

const BackgroundImage = ({
  theme,
}: {
  theme: "Blue" | "Dark" | "Light" | "White" | "Green";
}) => {
  if (theme === "Blue") {
    return (
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        src={bgBlue}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
    );
  }
  if (theme === "Light") {
    return (
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
        src={bgLight}
        alt=""
        width={2245}
        height={1636}
        unoptimized
      />
    );
  }
};

export default BackgroundImage;
