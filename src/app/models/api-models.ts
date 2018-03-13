export class ApiResponseList<T>
{
    public data: T[];
    public pagination: ApiResponsePagination;
    public error: ApiResponseError;
}

export class ApiResponsePagination
{
    public totalPages: number;
    public currentPage: number
    public pageSize: number
    public total: number
}

export class ApiResponseError
{
    public code: string;
    public httpStatus: string;
    public errors: any[];
    public errorMessage: string;
}
