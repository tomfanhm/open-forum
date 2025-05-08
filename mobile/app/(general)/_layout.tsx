import { View } from "react-native";
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <View className="flex-1 bg-background text-foreground font-sans antialiased">
      <Slot />
    </View>
  );
}
