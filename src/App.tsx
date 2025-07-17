import { Session } from "./containers/Session";
import { ScrollerRefProvider } from "./providers/ScrollerRefProvider";

const App = () => {
  // const toggleDisableCard = useCallback(
  //   (id: string) => {
  //     const isDisabled = disabledCardIds.includes(id);
  //     if (isDisabled) {
  //       setDisabledCardIds((prev) => uniq(prev.concat(id)));
  //     } else {
  //       setDisabledCardIds((prev) => prev.filter((cardId) => cardId !== id));
  //     }
  //   },
  //   [disabledCardIds]
  // );

  return (
    <ScrollerRefProvider>
      <Session />
    </ScrollerRefProvider>
  );
};

export default App;
