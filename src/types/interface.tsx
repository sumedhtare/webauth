interface credentaials {
  username: string;
  password: string;
}

interface messageRes {
  message: string;
}

interface user {
  id: number;
  username: string;
  login_time: string;
  last_update_time: string;
  last_login: string;
  user_ip: string;
  user_agent?: string;
  register_time?: string;
  logins_count?: number;
  is_online: boolean;
}

interface tokenRes {
  token: string;
  user: user;
}

export type { credentaials, tokenRes, messageRes, user };
