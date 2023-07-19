import { Info, InfoPropTypes } from "../Type.ts";
import { Body2, Subtitle1 } from "@fluentui/react-components";

export function InfoSection({ inferred }: Info) {
  return (
    inferred && (
      <div className="info">
        <dl>
          <dt>
            <Subtitle1>Postcode</Subtitle1>
          </dt>
          <dd>
            <Body2>{inferred.postcode}</Body2>
          </dd>
          <dt>
            <Subtitle1>County</Subtitle1>
          </dt>
          <dd>
            <Body2>{inferred.admin_county}</Body2>
          </dd>
          <dt>
            <Subtitle1>Parish</Subtitle1>
          </dt>
          <dd>
            <Body2>{inferred.parish}</Body2>
          </dd>
        </dl>
      </div>
    )
  );
}

InfoSection.defaultProps = { postcode: "", admin_county: "", parish: "" };
InfoSection.propTypes = InfoPropTypes;
