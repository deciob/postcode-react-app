import PropTypes, { InferProps } from "prop-types";
import { getPostcode } from "../api.ts";
import { InferredInfo, Req } from "../Type.ts";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Input,
  Field,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

type Inputs = {
  postcodeInput: string;
};

const useStyles = makeStyles({
  form: {
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
  postcodeField: {
    // The postocode Field has a display-grid out of the box.
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap("2px"),
  },
  submit: {
    // Use 2px gap below the label (per the design system)
    ...shorthands.margin("8px", "0"),
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

export function SearchBar({
  setSelectedPostcode,
}: InferProps<typeof SearchBar.propTypes>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const callback = requestPostcode.bind(null, setSelectedPostcode);
  const onSubmit: SubmitHandler<Inputs> = (data) => callback(data);
  const validationState = errors.postcodeInput ? "warning" : "success";
  const styles = useStyles();

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        // I need to wrap the handleSubmit into a void function
        // or I get the following ts error:
        // `Promise-returning function provided to attribute
        // where a void return was expected`
        // And so, I also need to explicitly preventDefault.
        e.preventDefault();
        void handleSubmit(onSubmit)();
      }}
    >
      <div>
        <Field
          className={styles.postcodeField}
          label="Enter a valid Postcode"
          required={true}
          validationState={validationState}
        >
          <Input
            size="large"
            {...register("postcodeInput", { required: true })}
          />
        </Field>
        <Button className={styles.submit} type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  setSelectedPostcode: PropTypes.func.isRequired,
};
