export interface APIResponse<T> {
    statusCode: number;
    message: string;
    payload?: T;
    errors?: APIResponseError[] | string[];
}

export interface APIResponseError {
    property?: string;
    entity?: string;
    constraints: APIResponseErrorConstraint;
}

export interface APIResponseErrorConstraint {
    [x: string]: string;
}
