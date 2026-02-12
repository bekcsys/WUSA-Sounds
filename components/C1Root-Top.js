import React from "react";
import { View } from "react-native";
import { useLayout } from "../styles/globalLayout";
import LogoComponent from "./WelcomeScreen/LogoComponent";

export default function C1RootTop({
  logoSource,
  logoWidth,
  logoHeight,
  children,
  compactHeader = false,
}) {
  const layout = useLayout();
  const topStyle = compactHeader ? layout.dispContTopCompact : layout.dispContTop;
  const bottomStyle = compactHeader ? layout.dispContBottomCompact : layout.dispContBottom;

  return (
    <View style={layout.displayRoot}>
      <View style={topStyle}>
        <LogoComponent source={logoSource} width={logoWidth} height={logoHeight} />
      </View>
      <View style={bottomStyle}>
        {compactHeader ? children : <View style={layout.dispContTopWrapper}>{children}</View>}
      </View>
    </View>
  );
}
