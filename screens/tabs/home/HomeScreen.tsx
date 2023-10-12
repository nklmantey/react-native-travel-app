import {
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { CategoryData } from "../../../constants/categories";
import {
  BoldText,
  HeadingText,
  MediumText,
  RegularText,
} from "../../../components/StyledText";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PlacesData, PlacesDataType } from "../../../constants/places";
import {
  GlobeIcon,
  MountainIcon,
  ShrineIcon,
  WaterIcon,
} from "../../../assets/images";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("");
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: { item: PlacesDataType }) => {
    const inputRange = [
      (item.id - 1) * CARD_WIDTH,
      item.id * CARD_WIDTH,
      (item.id + 1) * CARD_WIDTH,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    return (
      <AnimatedView
        style={{
          width: CARD_WIDTH,
          transform: [{ scale }],
        }}
      >
        <ImageContainer>
          <PlaceImage source={item.image} alt="image" resizeMode="cover" />
        </ImageContainer>
        <CardBottomView>
          <BoldText>{item.location}</BoldText>
          <IconContainer
            style={{
              backgroundColor: "#fff",
              borderWidth: 1,
              width: "50%",
            }}
          >
            <Icon
              source={
                item.category === "temples"
                  ? ShrineIcon
                  : item.category === "lakes"
                  ? WaterIcon
                  : item.category === "mountains"
                  ? MountainIcon
                  : GlobeIcon
              }
              style={{ width: 16, height: 16 }}
            />
            <RegularText style={{ fontSize: 12 }}>
              {item.category.slice(0, 1).toUpperCase()}
              {item.category.slice(1)}
            </RegularText>
          </IconContainer>
        </CardBottomView>
      </AnimatedView>
    );
  };

  return (
    <Container>
      <HeaderViewContainer>
        <HeadingText>Welcome user</HeadingText>
        <UserAvatar onPress={() => navigate("ProfileNavigation")}>
          <Ionicons name="person" size={12} color={"#000"} />
        </UserAvatar>
      </HeaderViewContainer>

      <FlatListContainer>
        <MediumText>Select a category from below</MediumText>
        <FlatList
          data={CategoryData}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <IconContainer
              style={{
                backgroundColor:
                  item.title === activeCategory ? "#000" : "#fff",
                borderWidth: item.title === activeCategory ? 3 : 1,
              }}
              onPress={() => setActiveCategory(item.title)}
            >
              <Icon source={item.image} />
              {item.title === activeCategory ? (
                <Bold>{item.title}</Bold>
              ) : (
                <RegularText>{item.title}</RegularText>
              )}
            </IconContainer>
          )}
          horizontal
          contentContainerStyle={{ gap: 12, width: "100%", flexWrap: "wrap" }}
          showsHorizontalScrollIndicator={false}
        />
      </FlatListContainer>

      <CardsContainer>
        <FlatList
          horizontal
          data={PlacesData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
        />
      </CardsContainer>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
`;

const HeaderViewContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const UserAvatar = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  border-radius: 25px;
  border-width: 1px;
  border-color: #d3d3d3;
  align-items: center;
  justify-content: center;
`;

const FlatListContainer = styled(View)`
  gap: 12px;
  margin-top: 24px;
`;

const IconContainer = styled(TouchableOpacity)`
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 100px;
  border-color: #d3d3d3;
  flex-direction: row;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const Icon = styled(Image)`
  width: 20px;
  height: 20px;
`;

const Bold = styled(BoldText)`
  color: #fff;
`;

const AnimatedView = styled(Animated.View)`
  border-radius: 20px;
  border-width: 0.5px;
  border-color: #d3d3d3;
  padding: 16px;
  gap: 24px;
`;

const PlaceImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const CardsContainer = styled(View)`
  margin-top: 24px;
  width: 100%;
  border-radius: 20px;
`;

const CardBottomView = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ImageContainer = styled(View)`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  border-width: 0.3px;
  border-color: #d3d3d3;
`;
