import "./App.css";
import PropTypes, { InferProps } from "prop-types";
import { getPostcode } from "./api.ts";
import { useState } from "react";
import { InferredInfo, Info, InfoPropTypes, Req } from "./Type.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Field,
  makeStyles,
  shorthands,
  FluentProvider,
} from "@fluentui/react-components";
import { createLightTheme } from "@fluentui/react-components";
import type { BrandVariants, Theme } from "@fluentui/react-components";

const defaultTheme: BrandVariants = {
  10: "#020305",
  20: "#111723",
  30: "#16263D",
  40: "#193253",
  50: "#1B3F6A",
  60: "#1B4C82",
  70: "#18599B",
  80: "#1267B4",
  90: "#3174C2",
  100: "#4F82C8",
  110: "#6790CF",
  120: "#7D9ED5",
  130: "#92ACDC",
  140: "#A6BAE2",
  150: "#BAC9E9",
  160: "#CDD8EF",
};

const lightTheme: Theme = {
  ...createLightTheme(defaultTheme),
};

type Inputs = {
  postcodeInput: string;
};

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

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap("2px"),
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
});

function requestPostcode(
  // see: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
  setSelectedPostcode: React.Dispatch<React.SetStateAction<InferredInfo>>,
  { postcodeInput }: Inputs,
) {
  getPostcode<Req>(postcodeInput)
    .then(({ result, status }) => {
      if (status === 200) {
        setSelectedPostcode({
          postcode: postcodeInput,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const callback = requestPostcode.bind(null, setSelectedPostcode);
  const onSubmit: SubmitHandler<Inputs> = (data) => callback(data);
  const styles = useStyles();
  const validationState = errors.postcodeInput ? "warning" : "success";

  return (
    <form
      onSubmit={(e) => {
        // I need to wrap the handleSubmit into a void function or I get:
        // Promise-returning function provided to attribute
        // where a void return was expected
        // And so I also need to explicitly preventDefault.
        e.preventDefault();
        void handleSubmit(onSubmit)();
      }}
    >
      <div className={styles.root}>
        <Field
          label="Enter a valid Postcode"
          required={true}
          validationState={validationState}
          validationMessage={
            errors.postcodeInput && <span>This field is required</span>
          }
        >
          <input {...register("postcodeInput", { required: true })} />
        </Field>
        <input type="submit" />
      </div>
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
    <FluentProvider theme={lightTheme}>
      <div>
        <SearchBar setSelectedPostcode={setSelectedPostcode} />
        <InfoSection inferred={selectedPostcode} />
      </div>
    </FluentProvider>
  );
}

export default function App() {
  return <PostcodeContainer />;
}
