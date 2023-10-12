import { ImageSourcePropType } from "react-native";
import { MammothLake, OsakaCastle, TokyoTemple } from "../assets/images";

export type PlacesDataType = {
  id: number;
  location: string;
  category: "mountains" | "temples" | "lakes";
  image: ImageSourcePropType;
};

export const PlacesData: PlacesDataType[] = [
  {
    id: 0,
    location: "Osaka Castle",
    category: "temples",
    image: OsakaCastle,
  },
  {
    id: 1,
    location: "Tokyo Temple",
    category: "temples",
    image: TokyoTemple,
  },
  {
    id: 2,
    location: "Mammoth Lake",
    category: "lakes",
    image: MammothLake,
  },
];
