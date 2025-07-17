import { uniqueId } from "lodash";
import type { Card } from "../../models/types";

export const ROMAN_NUMERALS = ["", "I", "II", "III", "IV", "V"];

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
    name: `4 Finger Discount`,
    tier: 1,
    description: `Only use 4 fingers.`,
    setId: "finger-discount",
  },
  {
    id: uniqueId(),
    name: `3 Finger Discount`,
    tier: 1,
    description: `Only use 3 fingers.`,
    setId: "finger-discount",
  },
  {
    id: uniqueId(),
    name: `2 Finger Discount`,
    tier: 2,
    description: `Only use 2 fingers.`,
    setId: "finger-discount",
  },
  {
    id: uniqueId(),
    name: `'Tis But a Scratch!`,
    tier: 1,
    description: `Use one hand only.`,
  },
  {
    id: uniqueId(),
    name: `Hopscotch`,
    tier: 1,
    description: `Use one foot only.`,
  },
  {
    id: uniqueId(),
    name: `Beam Me Up, Scottie!`,
    tier: 3,
    description: `Top out with a single move.`,
  },
  {
    id: uniqueId(),
    name: `Til Death Do Us Part`,
    tier: 1,
    description: `Your hands must always match; as if your hands are tied together.`,
  },
  {
    id: uniqueId(),
    name: `Hogtied`,
    tier: 1,
    description: `Your feet must always match; as if your feet are tied together.`,
  },
  {
    id: uniqueId(),
    name: `Smooth Landing`,
    tier: 1,
    description: `After topping out, climb back down to the start.`,
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
      "Touch all holds before completing the route. No need to establish a hold. You can use hands or toes.",
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
      "Your foot can only be placed on holds previously used as hand holds. You can still use smear or flag against the wall.",
  },
];
