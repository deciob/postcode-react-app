import { useNavigate } from "react-router-dom";
import { Inputs } from "../Type.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Field,
  Input,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

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

export function SearchBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    navigate(`/${data.postcodeInput}`, { replace: true });
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
