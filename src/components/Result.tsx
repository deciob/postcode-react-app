import { Response } from "../Type.ts";
import { Body2, Subtitle1 } from "@fluentui/react-components";
import { ErrorComponent } from "./ErrorComponent.tsx";

export function InfoSection(
  { response }: ResponseProps,
) {
  if ("error" in response) {
    return ErrorComponent(response);
  }
  return (
    <div className="info">
      <dl>
        <dt>
          <Subtitle1>Postcode</Subtitle1>
        </dt>
        <dd>
          <Body2>{response.result.postcode}</Body2>
        </dd>
        <dt>
          <Subtitle1>County</Subtitle1>
        </dt>
        <dd>
          <Body2>{response.result.admin_county}</Body2>
        </dd>
        <dt>
          <Subtitle1>Parish</Subtitle1>
        </dt>
        <dd>
          <Body2>{response.result.parish}</Body2>
        </dd>
      </dl>
    </div>
  );
}

type ResponseProps = {
  response: Response;
};
