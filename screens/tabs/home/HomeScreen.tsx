import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { CategoryData } from "../../../constants/categories";
import {
  BoldText,
  HeadingText,
  MediumText,
  RegularText,
} from "../../../components/StyledText";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("");
  const { navigate }: NavigationProp<TabNavigationType> = useNavigation();

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
                borderWidth: item.title === activeCategory ? 0 : 1,
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
