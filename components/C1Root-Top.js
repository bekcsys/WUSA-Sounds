import React from "react";
import { View } from "react-native";
import { useLayout } from "../styles/globalLayout";
import LogoComponent from "./WelcomeScreen/LogoComponent";

export default function C1RootTop({
  logoSource,
  logoWidth,
  logoHeight,
  children,
}) {
  const layout = useLayout();

  return (
    <View style={layout.rootTop}>
      <View style={layout.rootTopContentTop}>
        <LogoComponent source={logoSource} width={logoWidth} height={logoHeight} />
      </View>
      <View style={layout.rootTopContentBottom}>{children}</View>
    </View>
  );
}
