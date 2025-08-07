import type { Card } from "../../models/types";

export const CARDS: Card[] = [
  {
    id: "400ea339-ddcd-4e2f-95ba-3175c67d7f80",
    name: "Toe Dip",
    tier: 1,
    description:
      "You must touch a hold with your toe before moving your hand onto it.",
  },
  {
    id: "8037eaba-237b-40f0-a5eb-9bbf685725b7",
    name: "Bat Hang",
    tier: 2,
    description: "Start the route in a bat hang.",
  },
  {
    id: "c57d4606-571f-469d-9b7d-d57ae16f1087",
    name: "Way of the Bear",
    tier: 3,
    description: "Only use 4 fingers.",
    setId: "animal-style",
  },
  {
    id: "6e4449f9-3c1f-40fd-8942-bb03820a1a1d",
    name: "Way of the Eagle",
    tier: 2,
    description: "Only use 3 fingers.",
    setId: "animal-style",
  },
  {
    id: "d1094733-95c6-45da-bb0c-37c67878256f",
    name: "Way of the Snake",
    tier: 3,
    description: "Only use 2 fingers.",
    setId: "animal-style",
  },
  {
    id: "2f8687c0-019d-4301-91c5-fce82c0d315d",
    name: "'Tis But a Scratch!",
    tier: 2,
    description: "Use one hand only. Other hand cannot touch any holds.",
  },
  {
    id: "439a44d5-ed0d-432d-9812-7ce4cc986d08",
    name: "Hopscotch",
    tier: 1,
    description: "Use one foot only. Other foot cannot touch any holds but you can still use it to smear or flag against the wall.",
  },
  {
    id: "a07f6309-bcf0-4b71-9456-a404a29a9ce9",
    name: "Prison Break",
    tier: 1,
    description: "Your hands must always match -- as if they're tied together.",
  },
  {
    id: "87c15c66-3284-4aab-8dd6-783a10b64691",
    name: "Smooth Landing",
    tier: 1,
    description: "After topping out, climb down to the start.",
  },
  {
    id: "f584b0e9-3e98-4963-94b5-e24650dd3db7",
    name: "Boulder Bro",
    tier: 3,
    description: "Complete the route without letting your feet touch the wall.",
  },
  {
    id: "118558ae-c323-4b1a-8882-e5a91681052c",
    name: "Mission Impossible",
    tier: 1,
    description:
      'Avoid making any noise while climbing. This includes scrapes, impacts, "hyugh 😩"s, etc.',
  },
  {
    id: "a299c34d-1cf4-4cb6-b50c-1fa21e3d191b",
    name: "Cat Walk",
    tier: 3,
    description:
      "Your foot can only be placed on a hold that your hand is currently on. You can still smear or flag against the wall at any point.",
  },
  {
    id: "4f0cd206-98b3-46dd-9a7a-ee868f909b80",
    name: "Rising Lava",
    tier: 1,
    description: "A hold can no longer be used once your foot leaves it.",
  },
  {
    id: "528f0b80-d398-484c-9b58-22061bf281fc",
    name: "Sit Start",
    tier: 1,
    description: "Start the climb with a sit start.",
  },
  {
    id: "9f47531d-069d-4269-bca2-c22e468a20e4",
    name: "Backseat Gamer",
    tier: 3,
    description:
      "Ask someone for the beta and complete the route without deviating from it. (within reason, ofc)",
  },
  {
    id: "0b76937f-84a2-47f5-b416-be6e95b42720",
    name: "Cragonomics",
    tier: 3,
    description:
      "Finish the route with fewer or equal moves to the V grade of the route plus 1. (e.g. V3 -> 4 or less moves to finish)",
  },
  {
    id: "55f7071e-f4c0-4b12-b440-4155dfbb2728",
    name: "Nepo Baby",
    tier: 0,
    description:
      "You may start with one less foot or hand on the starting hold(s). You can place that hand or foot on any other hold that is part of the route.",
  },
  {
    id: "445de7f3-24c1-44e0-8f4b-2dc0dd3b0068",
    name: "Climb thy Neighbor",
    tier: 0,
    description:
      "You may use a single hold from another neighboring route as part of your ascent.",
  },
  {
    id: "7beb19ad-40ae-41c2-9854-1abe1c38a248",
    name: "Half-assed",
    tier: 0,
    setId: "early-finish",
    description: "You may consider the route finished at the halfway point.",
  },
  {
    id: "fce2d41a-491b-41c1-b383-551b90eee13b",
    name: "Conceive, Conceive, Conceive",
    tier: 0,
    setId: "early-finish",
    description:
      "You may consider the route finished once you stabilize at the starting position.",
  },
];
