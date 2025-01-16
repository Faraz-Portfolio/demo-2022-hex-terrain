import produce from "immer";
import create from "zustand";

const water = "#5EBFB5";
const colorMap = [
  "#FCE0AE", //
  "#F2B591",
  "#A7A267",
  "#656347",
  "#9AA7AD",
];

export default create((set) => ({
  colors: {
    Water: {
      value: 0.21,
      color: "#00a9ff",
    },
    Shore: {
      value: 0.01,
      color: "#ffd68f",
    },
    Beach: {
      value: 0.04,
      color: "#efb28f",
    },
    Shrub: {
      value: 0.1,
      color: "#9ea667",
    },
    Forest: {
      value: 0.29,
      color: "#586647",
    },
    Stone: {
      value: 0.36,
      color: "#656565",
    },
    Snow: {
      value: 0.6,
      color: "#9aa7ad",
    },
  },

  setColorValue: (key, value) =>
    set(
      produce((state) => {
        state.colors[key].value = value;
      })
    ),
  setColor: (key, color) =>
    set(
      produce((state) => {
        state.colors[key].color = color;
      })
    ),

  generation: {
    Seed: Math.random(),
    Height: 1,
    Scale: 0.2,
    Detail: 0.5,
    Fuzzyness: 0.25,
    // Contrast: 0.5,
  },

  setGeneration: (key, value) =>
    set(
      produce((state) => {
        state.generation[key] = value;
      })
    ),

  general: {
    Trees: false,
    Grass: false,
    Clouds: false,
  },
  setGeneral: (key, value) =>
    set(
      produce((state) => {
        state.general[key] = value;
      })
    ),
}));
