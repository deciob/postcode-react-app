export type InferredInfo = {
  postcode: string;
  admin_county: string;
  parish: string;
};

export type Info = {
  inferred: InferredInfo;
};

export type Req = {
  status: number;
  result: InferredInfo;
};

type BaseResponse = { status: number };
export type ResponseOk = BaseResponse & { result: InferredInfo };
export type ResponseErr = BaseResponse & { error: string };
export type Response = ResponseErr | ResponseOk;

// Leaving because I am learning typescript...
// Given...
//export type Result = {
//  status: number;
//  result?: InferredInfo;
//  error?: string;
//};
//
// You can derive the following type:
//export type ResultErr = Pick<Required<Result>, "status" | "error">;
// can also write it with a Mapped Type:
//export type ResultErr = { [k in "status" | "error"]: Required<Result>[k] };

export type Inputs = {
  postcodeInput: string;
};
