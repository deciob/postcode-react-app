import { ResponseErr } from "../Type.ts";
import { Body2 } from "@fluentui/react-components";

export function ErrorComponent({ error }: ResponseErr) {
  return (
    <div>
      <Body2>{error}</Body2>
    </div>
  );
}
