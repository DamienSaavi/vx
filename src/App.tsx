import { useEffect } from "react";
import { Session } from "./containers/Session";
import { useSessionData } from "./hooks/useSessionData";
import { ScrollerRefProvider } from "./providers/ScrollerRefProvider";

const App = () => {
  const { removeInvalidCardIds } = useSessionData();

  useEffect(() => {
    removeInvalidCardIds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollerRefProvider>
      <Session />
    </ScrollerRefProvider>
  );
};

export default App;
