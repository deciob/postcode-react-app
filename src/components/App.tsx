import { useState } from "react";
import { InferredInfo } from "../Type.ts";
import { SearchBar } from "./Search.tsx";
import { InfoSection } from "./Result.tsx";
import { makeStyles, shorthands } from "@fluentui/react-components";

const useStyles = makeStyles({
  app: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gridTemplateRows: "repeat(6, 200px)",
    ...shorthands.gap("5px"),
    ...shorthands.padding("25px"),
  },
  search: {
    gridColumnStart: "2",
    gridColumnEnd: "span 4",
    gridRowStart: "1",
    gridRowEnd: "span 1",
  },
  info: {
    gridColumnStart: "2",
    gridColumnEnd: "span 4",
    gridRowStart: "2",
    gridRowEnd: "span 2",
  },
});

function PostcodeContainer() {
  const styles = useStyles();
  const [selectedPostcode, setSelectedPostcode] = useState<InferredInfo>(
    {} as InferredInfo,
  );

  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <SearchBar setSelectedPostcode={setSelectedPostcode} />
      </div>
      <div className={styles.info}>
        <InfoSection inferred={selectedPostcode} />
      </div>
    </div>
  );
}

export default function App() {
  return <PostcodeContainer />;
}
