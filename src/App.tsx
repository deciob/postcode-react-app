import "./App.css";
import PropTypes, { InferProps } from "prop-types";
import { getPostcode } from "./api.ts";
import { useState } from "react";
import { InferredInfo, Info, InfoPropTypes, Req } from "./Type.ts";

function InfoSection({ inferred }: Info) {
  return (
    <dl>
      <dt>postcode</dt>
      <dd>{inferred.postcode}</dd>
      <dt>county</dt>
      <dd>{inferred.admin_county}</dd>
      <dt>parish</dt>
      <dd>{inferred.parish}</dd>
    </dl>
  );
}

InfoSection.defaultProps = { postcode: "", admin_county: "", parish: "" };
InfoSection.propTypes = InfoPropTypes;

function requestPostcode(
  e: React.SyntheticEvent,
  // see: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
  setSelectedPostcode: React.Dispatch<React.SetStateAction<InferredInfo>>,
) {
  e.preventDefault();
  // see: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events
  const target = e.target as typeof e.target & {
    postcodeInput: { value: string };
  };
  const value = target["postcodeInput"].value;
  getPostcode<Req>(value)
    .then(({ result, status }) => {
      if (status === 200) {
        setSelectedPostcode({
          postcode: value,
          admin_county: result.admin_county,
          parish: result.parish,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function SearchBar({
  setSelectedPostcode,
}: InferProps<typeof SearchBar.propTypes>) {
  return (
    <form onSubmit={(e) => requestPostcode(e, setSelectedPostcode)}>
      <input
        type="text"
        placeholder="Type in a postocode"
        name="postcodeInput"
      />
      <input type="submit" />
    </form>
  );
}

SearchBar.propTypes = {
  setSelectedPostcode: PropTypes.func.isRequired,
};

function PostcodeContainer() {
  const [selectedPostcode, setSelectedPostcode] = useState<InferredInfo>(
    {} as InferredInfo,
  );

  return (
    <div>
      <SearchBar setSelectedPostcode={setSelectedPostcode} />
      <InfoSection inferred={selectedPostcode} />
    </div>
  );
}

export default function App() {
  return <PostcodeContainer />;
}
