import Link from "next/link";
import StoryBackgroundWrapper from "../StoryBackgroundWrapper";

type ButtonProps = {
  url: string;
  label: string;
  theme: "default" | "outline";
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
};

const Button = ({
  label,
  url,
  theme,
  backgroundColor,
  size = "medium",
}: ButtonProps) => {
  const sizeClassMap = {
    small: "py-2 px-4 text-sm",
    medium: "py-3 px-8 text-base",
    large: "py-4 px-10 text-lg",
  };

  const getThemeClasses = () => {
    if (theme === "outline") {
      return "border-black text-black hover:text-gray-500 hover:border-gray-500 bg-transparent";
    }

    // default theme
    if (backgroundColor === "red") {
      return "border-red-600 bg-red-600 text-white hover:bg-red-700 hover:border-red-700";
    }

    return "border-violet-800 bg-violet-800 text-white hover:bg-violet-600 hover:border-violet-600";
  };

  return (
    <StoryBackgroundWrapper>
      <Link href={url} passHref legacyBehavior>
        <a
          className={`inline-block border rounded-md transition-all duration-300 font-medium ${sizeClassMap[size]} ${getThemeClasses()}`}
        >
          {label}
        </a>
      </Link>
    </StoryBackgroundWrapper>
  );
};

export default Button;
