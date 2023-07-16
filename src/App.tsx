import "./App.css";
import PropTypes, { InferProps } from "prop-types";
import { getPostcode } from "./api.ts";
import { useState } from "react";
import { InferredInfo, Info, InfoPropTypes, Req } from "./Type.ts";
import { useForm, SubmitHandler } from "react-hook-form";

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
      <input {...register("postcodeInput", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.postcodeInput && <span>This field is required</span>}
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
