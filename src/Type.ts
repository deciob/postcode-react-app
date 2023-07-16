import PropTypes, { InferProps } from "prop-types";

export const InfoPropTypes = {
  postcode: PropTypes.string.isRequired,
  admin_county: PropTypes.string.isRequired,
  parish: PropTypes.string.isRequired,
};

export type InferredInfo = InferProps<typeof InfoPropTypes>;

export interface Info {
  inferred: InferredInfo;
}

export type Req = {
  status: number;
  result: InferredInfo;
};
