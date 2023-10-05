import { ImageSourcePropType } from "react-native";
import {
  GlobeIcon,
  MountainIcon,
  ShrineIcon,
  WaterIcon,
} from "../assets/images";

type CategoryDataType = {
  id: number;
  title: string;
  image: ImageSourcePropType;
};

export const CategoryData: CategoryDataType[] = [
  {
    id: 1,
    title: "Anywhere",
    image: GlobeIcon,
  },
  {
    id: 2,
    title: "Mountains",
    image: MountainIcon,
  },
  {
    id: 3,
    title: "Temples",
    image: ShrineIcon,
  },
  {
    id: 4,
    title: "Lakes",
    image: WaterIcon,
  },
];
