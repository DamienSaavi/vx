import { useEffect } from "react";
import { Session } from "./containers/Session";
import { ScrollerRefProvider } from "./providers/ScrollerRefProvider";
import { removeInvalidCardIds } from "./utils/funcs/startup";

const App = () => {
  useEffect(() => {
    removeInvalidCardIds();
  }, []);

  return (
    <ScrollerRefProvider>
      <Session />
    </ScrollerRefProvider>
  );
};

export default App;
