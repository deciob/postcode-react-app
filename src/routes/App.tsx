import { useRouteLoaderData } from "react-router-dom";
import { Response } from "../Type.ts";
import { SearchBar } from "../components/Search.tsx";
import { InfoSection } from "../components/Result.tsx";
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

  const postcodeInfoFromRoute = useRouteLoaderData("postcode") as (
    | Response
    | undefined
  );

  const infoSection = postcodeInfoFromRoute
    ? (
      <InfoSection
        response={postcodeInfoFromRoute}
      />
    )
    : null;

  return (
    <div className={styles.app}>
      <div className={styles.search}>
        <SearchBar />
      </div>
      <div className={styles.info}>
        {infoSection}
      </div>
    </div>
  );
}

export default function App() {
  return <PostcodeContainer />;
}
