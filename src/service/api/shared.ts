import type { ApiResponse } from '../adapter/types';

export type LoginParams = {
  userName: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  token: string;
  refreshToken: string;
}>;

export type UserInfoResponse = ApiResponse<{
  userId: string;
  userName: string;
  roles: string[];
  buttons: string[];
}>;

export type RouteResponse = ApiResponse<
  {
    id: string;
    name: string;
    path: string;
    children?: RouteResponse[];
  }[]
>;

export type UserListParams = {
  current: number;
  size: number;
  userName?: string;
  gender?: string;
  status?: string;
};

export type UserItem = {
  id: number;
  userName: string;
  userPhone: string;
  gender: '0' | '1';
  createTime: string;
  status: '1' | '2';
};

export type UserListResponse = ApiResponse<{
  records: UserItem[];
  total: number;
}>;

export type UserRoleResponse = ApiResponse<
  {
    id: string;
    roleName: string;
    roleCode: string;
    status: '1' | '2';
  }[]
>;
