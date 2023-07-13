import "./App.css";
import { getPostcode } from "./api.js";
import { useState } from "react";

function PostcodeInfo({ postcode }) {
  return (
    <dl>
      <dt>postcode</dt>
      <dd>{postcode.postcode}</dd>
      <dt>county</dt>
      <dd>{postcode.admin_county}</dd>
      <dt>parish</dt>
      <dd>{postcode.parish}</dd>
    </dl>
  );
}

function requestPostcode(e, setSelectedPostcode) {
  const value = e.target["postcodeInput"].value;
  const p = getPostcode(value);
  e.preventDefault();
  p.then((result) => {
    if (result.status === 200) {
      setSelectedPostcode({
        postcode: value,
        admin_county: result.result.admin_county,
        parish: result.result.parish,
      });
    }
  });
}

function SearchBar({ setSelectedPostcode }) {
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

function PostcodeContainer() {
  const [selectedPostcode, setSelectedPostcode] = useState("");
  return (
    <div>
      <SearchBar setSelectedPostcode={setSelectedPostcode} />
      <PostcodeInfo postcode={selectedPostcode} />
    </div>
  );
}

const POSTCODE = { postcode: "CB23 2AA", admin_county: "Cambridgeshire" };

export default function App() {
  return <PostcodeContainer postcode={POSTCODE} />;
}
