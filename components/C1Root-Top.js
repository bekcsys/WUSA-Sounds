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
    <View style={layout.displayRoot}>
      <View style={layout.dispContTop}>
        <LogoComponent source={logoSource} width={logoWidth} height={logoHeight} />
      </View>
      <View style={layout.dispContBottom}>
        <View style={layout.dispContTopWrapper}>{children}</View>
      </View>
    </View>
  );
}
