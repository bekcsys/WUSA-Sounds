import { getMediaUrl } from "../config/media";
import { LOGO_SOUND } from "../config/assets";

const solfeggioPaths = [
  { id: "174", title: "174 Hz Meditation", path: "SolfeggioSounds/174Meditation.mp3" },
  { id: "285", title: "285 Hz Healing", path: "SolfeggioSounds/285Healing.mp3" },
  { id: "396", title: "396 Hz Fearless", path: "SolfeggioSounds/396Fearless.mp3" },
  { id: "417", title: "417 Hz Positivity", path: "SolfeggioSounds/417Positivity.mp3" },
  { id: "528", title: "528 Hz Confidence", path: "SolfeggioSounds/528Confidence.mp3" },
  { id: "639", title: "639 Hz Harmony", path: "SolfeggioSounds/639Harmony.mp3" },
  { id: "741", title: "741 Hz Cleansing", path: "SolfeggioSounds/741Cleansing.mp3" },
  { id: "852", title: "852 Hz Intuition", path: "SolfeggioSounds/852Intuition.mp3" },
  { id: "963", title: "963 Hz Enlightenment", path: "SolfeggioSounds/963Enlightenment.mp3" },
];

const triBowlPaths = [
  { id: "174", title: "174 Hz Tri Bowl", path: "tribowl/174TriBowl.mp3" },
  { id: "285", title: "285 Hz Tri Bowl", path: "tribowl/285TriBowl.mp3" },
  { id: "396", title: "396 Hz Tri Bowl", path: "tribowl/396TriBowl.mp3" },
  { id: "bowl01", title: "Bowl 01", path: "tribowl/Bowl01.mp3" },
  { id: "bowl02", title: "Bowl 02", path: "tribowl/Bowl02.mp3" },
  { id: "bowl03", title: "Bowl 03", path: "tribowl/Bowl03.mp3" },
  { id: "bowl04", title: "Bowl 04", path: "tribowl/Bowl04.mp3" },
  { id: "bowl05", title: "Bowl 05", path: "tribowl/Bowl05.mp3" },
  { id: "bowl06", title: "Bowl 06", path: "tribowl/Bowl06.mp3" },
];

const ambientPaths = [
  { id: "fragments", title: "Fragments", path: "AmbinetSounds/Ambient -  Fragments.mp3" },
  { id: "instrumental", title: "Instrumental", path: "AmbinetSounds/Ambient -  Instrumental.mp3" },
  { id: "piano", title: "Piano", path: "AmbinetSounds/Ambient -  Piano.mp3" },
  { id: "calm", title: "Calm", path: "AmbinetSounds/Ambient - Calm.mp3" },
  { id: "chillstep", title: "Chillstep", path: "AmbinetSounds/Ambient - Chillstep.mp3" },
  { id: "exploration", title: "Exploration", path: "AmbinetSounds/Ambient - Exploration.mp3" },
  { id: "spiliotis", title: "Spiliotis", path: "AmbinetSounds/Ambient - Spiliotis.mp3" },
  { id: "chill", title: "Chill", path: "AmbinetSounds/Ambinet - Chill.mp3" },
  { id: "fall", title: "Fall", path: "AmbinetSounds/Ambinet - Fall.mp3" },
  { id: "free-ii", title: "Free II", path: "AmbinetSounds/Ambinet - Free II.mp3" },
  { id: "free", title: "Free", path: "AmbinetSounds/Ambinet - Free.mp3" },
  { id: "memories", title: "Memories", path: "AmbinetSounds/Ambinet - Memories.mp3" },
  { id: "memory", title: "Memory", path: "AmbinetSounds/Ambinet - Memory.mp3" },
  { id: "signal", title: "Signal", path: "AmbinetSounds/Ambinet - Signal.mp3" },
  { id: "snowfall", title: "Snowfall", path: "AmbinetSounds/Ambinet - Snowfall.mp3" },
];

function toTracks(
  items: Array<{ id: string; title: string; path: string }>
): Array<{ id: string; title: string; source: string }> {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    source: getMediaUrl(item.path),
  }));
}

export const solfeggioTracks = toTracks(solfeggioPaths);
export const triBowlTracks = toTracks(triBowlPaths);
export const ambientSoundsTracks = toTracks(ambientPaths);

export const WELCOME_OPTIONS = [
  { id: "solfeggio", label: "Solfeggio Sounds", logo: LOGO_SOUND, tracks: solfeggioTracks },
  { id: "tribowl", label: "TriBowl Sounds", logo: LOGO_SOUND, tracks: triBowlTracks },
  { id: "ambient", label: "Ambient Sounds", logo: LOGO_SOUND, tracks: ambientSoundsTracks },
];
