import { TbList, TbPlayCardOff } from "react-icons/tb";

export const Info = () => {
  return (
    <div className="relative h-[80dvh] px-1.5 pr-3 -mr-2 text-md overflow-y-auto">
      <div className="h-8 shrink-0 sticky top-0 bg-gradient-to-b from-neutral-800/100 to-neutral-800/0 z-10" />
      <h3 className="text-xl font-bold text-center pb-3 cursor-pointer italic">
        What is this?
      </h3>
      <div className="flex flex-col gap-3">
        <p>
          I made this app to add challenge and variety for days when I feel
          stagnant and stuck between routes that are either too easy or too
          diffcult. The goal is to fill the void in that gap of difficulty.
        </p>
      </div>

      <h3 className="text-xl font-bold pt-8 text-center pb-3 cursor-pointer italic">
        How do I use it?
      </h3>

      <div className="flex flex-col gap-3">
        <p>
          <strong className="text-red-400">
            Remember to always follow your gym's rules and safety guidelines!
          </strong>
        </p>
        <p>
          Tap the "Draw" button to draw a new challenge or helper card.
          Afterwards, it's up to you.
        </p>
        <p>
          Some example rulesets:
          <ul className="list-outside list-disc pl-8">
            <li className="mt-1">
              Draw a card, attempt the most difficult route you can with the
              drawn cards, repeat until failure.
            </li>
            <li className="mt-1">
              Only choose to do the last card and consider the previous ones as
              "burned".
            </li>
            <li className="mt-1">
              Alternate with a friend after each draw akin to a game of
              H-O-R-S-E.
            </li>
            <li className="mt-1">
              Draw a few cards, choose one or more to perform on a route and
              discard if you succeed. Repeat until your hand is empty.
            </li>
          </ul>
        </p>
        <p>
          To disable/enable cards, open the "Modify Deck" window by clicking the
          cards{" "}
          <TbPlayCardOff
            size={18}
            className="inline-block text-slate-300 bg-neutral-900 w-fit px-0.5"
          />{" "}
          button at the top of the screen.
        </p>
        <p>
          To switch visuals between cards and list view, click the list{" "}
          <TbList
            size={18}
            className="inline-block text-slate-300 bg-neutral-900 w-fit px-0.5"
          />{" "}
          button at the bottom of the screen.
        </p>
        <p>
          To save this app on your phone or for offline use, tap the "Add to Homescreen" option in
          your mobile web browser. No extra permission is needed and the app
          functions identically without the visual clutter from your browser.
        </p>
      </div>

      <h3 className="text-xl font-bold pt-8 text-center pb-3 cursor-pointer italic">
        I have suggestions!
      </h3>

      <div className="flex flex-col gap-3">
        <p>
          I want to read them! 👉🏽{" "}
          <a
            className="cursor-pointer underline text-indigo-300"
            href="mailto:damiensaavi@gmail.com"
          >
            damiensaavi@gmail.com
          </a>
        </p>
      </div>
      <div className="h-8 shrink-0 sticky bottom-0 bg-gradient-to-t from-neutral-800/100 to-neutral-800/0 z-10" />
    </div>
  );
};
