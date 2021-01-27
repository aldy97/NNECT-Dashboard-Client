import { createContext } from "react";

export const backgroundColors = {
  primary: "primary",
  blue: "blue",
  green: "#14E5C6",
};

export const BackgroundColorContext = createContext({
  color: backgroundColors.green,
  changeColor: (color) => {},
});
