import { uniqueId } from "lodash";
import type { Card } from "../../models/types";

export const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V"];

export const TIER_PROBABILITY = [8, 3, 1, 0];

export const CARDS: Card[] = [
  {
    id: uniqueId(),
    name: "Toe Dip",
    tier: 1,
    description:
      "You must touch a hold with your toe before moving your hand onto it.",
  },
  {
    id: uniqueId(),
    name: "Bat Hang",
    tier: 2,
    description: "Start the route in a bat hang.",
  },
  {
    id: uniqueId(),
    name: `The Way of the Bear`,
    tier: 1,
    description: `Only use 4 fingers.`,
    setId: "animal-style",
  },
  {
    id: uniqueId(),
    name: `The Way of the Eagle`,
    tier: 2,
    description: `Only use 3 fingers.`,
    setId: "animal-style",
  },
  {
    id: uniqueId(),
    name: `The Way of the Snake`,
    tier: 3,
    description: `Only use 2 fingers.`,
    setId: "animal-style",
  },
  {
    id: uniqueId(),
    name: `'Tis But a Scratch!`,
    tier: 2,
    description: `Use one hand only. Other hand cannot touch any holds.`,
  },
  {
    id: uniqueId(),
    name: `Hopscotch`,
    tier: 1,
    description: `Use one foot only. Other foot cannot touch any holds but you can still use it to smear or flag against the wall.`,
  },
  {
    id: uniqueId(),
    name: `Beam Me Up, Scottie!`,
    tier: 3,
    description: `Top out with a single move.`,
  },
  {
    id: uniqueId(),
    name: `Prison Break`,
    tier: 1,
    description: `Your hands must always match as if they're tied together.`,
  },
  {
    id: uniqueId(),
    name: `Smooth Landing`,
    tier: 1,
    description: `After topping out, climb down to the start.`,
  },
  {
    id: uniqueId(),
    name: `Boulder Bro`,
    tier: 3,
    description: "Complete the route without letting your feet touch the wall.",
  },
  {
    id: uniqueId(),
    name: `OCD`,
    tier: 1,
    description:
      "Touch all holds before completing the route. No need to establish a hold. Must use hand or finger.",
  },
  {
    id: uniqueId(),
    name: "Mission Impossible",
    tier: 1,
    description:
      'Avoid making any noise while climbing. This includes scrapes, impacts, "hyugh 😩"s, etc.',
  },
  {
    id: uniqueId(),
    name: `Cat Walk`,
    tier: 2,
    description:
      "Your foot can only be placed on holds previously used as hand holds. You can still smear or flag against the wall.",
  },
  // FUTURE IDEAS:
  // - finish within n moves
  // - sit start
  // - knock first
  // - foot eliminates holds from future use
];
