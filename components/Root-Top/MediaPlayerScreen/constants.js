import { Platform } from "react-native";

const SOLFEGGIO_BASE_PATH =
  Platform.OS === "android"
    ? "file:///storage/emulated/0/Solfeggio"
    : "file:///var/mobile/Containers/Data/Application/.../Documents/Solfeggio";

export const TRACKS = [
  { id: "1", title: "Track 1", uri: `${SOLFEGGIO_BASE_PATH}/track1.mp3` },
  { id: "2", title: "Track 2", uri: `${SOLFEGGIO_BASE_PATH}/track2.mp3` },
];
