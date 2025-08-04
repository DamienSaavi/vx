import { Dialog } from "@base-ui-components/react";
import { AnimatePresence, motion } from "motion/react";
import { memo, type PropsWithChildren } from "react";
import { Divider } from "./Divider";
import { LuX } from "react-icons/lu";

type Props = PropsWithChildren & {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  maxWidth?: number | string;
};

const BackdropAnimated = motion.create(Dialog.Backdrop);
const PopupAnimated = motion.create(Dialog.Popup);

export const Modal = memo(
  ({ open, setOpen, title, maxWidth = "40rem", children }: Props) => {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <AnimatePresence>
          {open && (
            <Dialog.Portal keepMounted>
              <BackdropAnimated
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(2px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute top-0 right-0 bottom-0 left-0 bg-neutral-900/90 z-50"
              />
              <PopupAnimated
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-0 w-full h-full flex justify-center items-center p-3 z-50 pointer-events-none"
              >
                <div
                  className="flex flex-col grow min-w-0 min-h-0 max-h-[calc(100dvh-96px)] mb-12 items-stretch p-0 bg-neutral-800 rounded-xl border border-neutral-700 shadow-xl pointer-events-auto"
                  style={{ maxWidth }}
                >
                  <div className="relative flex items-center justify-center m-3">
                    <Dialog.Title className="font-bold text-lg text-center">
                      {title}
                    </Dialog.Title>
                    <Dialog.Close className="absolute left-0 cursor-pointer p-2.5 -m-2.5 text-neutral-400">
                      <LuX fontSize="1.4rem" />
                    </Dialog.Close>
                  </div>
                  <Divider px={0.5} />
                  <div className="px-2 flex flex-col min-h-0 grow">
                  {children}
                  </div>
                </div>
              </PopupAnimated>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    );
  }
);
