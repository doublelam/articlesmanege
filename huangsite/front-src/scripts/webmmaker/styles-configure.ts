import {
  Duration,
  StrokeStyles,
} from "../types/types";
export const DEFAULT_STROKE_STYLE: StrokeStyles = {
  colors: [
    "#9E9E9E",
    "#F44336",
    "#E91E63",
    "#9C27B0",
    "#673AB7",
    "#3F51B5",
    "#2196F3",
    "#03A9F4",
    "#00BCD4",
    "#009688",
    "#4CAF50",
    "#8BC34A",
    "#CDDC39",
    "#FFEB3B",
    "#FFC107",
    "#FF9800",
    "#FF5722",
    "#795548",
    "#607D8B",
  ],
  widths: [1, 2, 3, 5, 8, 12],
};

export const DEFAULT_DURATIONS: Duration[] = [
  { name: "10 FPS", duration: 100 },
  { name: "5 FPS", duration: 200 },
  { name: "2 FPS", duration: 500 },
  { name: "24 FPS", duration: 41.667 },
  { name: "60 FPS", duration: 16.667 },
];
