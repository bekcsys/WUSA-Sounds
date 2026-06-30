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
  { id: "174", title: "174 Hz Grounding", path: "TriBowl/174TriBowl.mp3" },
  { id: "285", title: "285 Hz Restoration", path: "TriBowl/285TriBowl.mp3" },
  { id: "396", title: "396 Hz Release", path: "TriBowl/396TriBowl.mp3" },
  { id: "417", title: "417 Hz Positivity", path: "TriBowl/Bowl01.mp3" },
  { id: "528", title: "528 Hz Renewal", path: "TriBowl/Bowl02.mp3" },
  { id: "639", title: "639 Hz Harmony", path: "TriBowl/Bowl03.mp3" },
  { id: "741", title: "741 Hz Cleansing", path: "TriBowl/Bowl04.mp3" },
  { id: "852", title: "852 Hz Intuition", path: "TriBowl/Bowl05.mp3" },
  { id: "963", title: "963 Hz Serenity", path: "TriBowl/Bowl06.mp3" },
];

const ambientPaths = [
  { id: "piano", title: "Soothing Piano", path: "AmbinetSounds/Ambient -  Piano.mp3" },
  { id: "calm", title: "Deep Calm", path: "AmbinetSounds/Ambient - Calm.mp3" },
  { id: "snowfall", title: "Winter Stillness", path: "AmbinetSounds/Ambinet - Snowfall.mp3" },
  { id: "exploration", title: "Inner Journey", path: "AmbinetSounds/Ambient - Exploration.mp3" },
  { id: "instrumental", title: "Warm Harmony", path: "AmbinetSounds/Ambient -  Instrumental.mp3" },
  { id: "fragments", title: "Quiet Moments", path: "AmbinetSounds/Ambient -  Fragments.mp3" },
  { id: "memories", title: "Gentle Reflection", path: "AmbinetSounds/Ambinet - Memories.mp3" },
  { id: "memory", title: "Soft Remembrance", path: "AmbinetSounds/Ambinet - Memory.mp3" },
  { id: "free", title: "Open Breath", path: "AmbinetSounds/Ambinet - Free.mp3" },
  { id: "free-ii", title: "Open Breath II", path: "AmbinetSounds/Ambinet - Free II.mp3" },
  { id: "chill", title: "Restful Ease", path: "AmbinetSounds/Ambinet - Chill.mp3" },
  { id: "fall", title: "Autumn Calm", path: "AmbinetSounds/Ambinet - Fall.mp3" },
  { id: "chillstep", title: "Flowing Stillness", path: "AmbinetSounds/Ambient - Chillstep.mp3" },
  { id: "signal", title: "Gentle Pulse", path: "AmbinetSounds/Ambinet - Signal.mp3" },
  { id: "spiliotis", title: "Cave Serenity", path: "AmbinetSounds/Ambient - Spiliotis.mp3" },
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
  { id: "solfeggio", label: "Solfeggio", logo: LOGO_SOUND, tracks: solfeggioTracks },
  { id: "tribowl", label: "TriBowl", logo: LOGO_SOUND, tracks: triBowlTracks },
  { id: "ambient", label: "Ambient", logo: LOGO_SOUND, tracks: ambientSoundsTracks },
];
