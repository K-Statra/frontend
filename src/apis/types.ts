export interface PaginatedResponse<T> {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: T[];
}

export interface ApiError {
  message: string;
  statusCode?: number;
  details?: unknown;
}
