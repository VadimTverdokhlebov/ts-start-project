interface IAuthPayload {
  appUrl: string;
  password: string;
  login: string;
}

interface IQueryGet {
  model: string;
  options?: { limit: number; skip: number };
  conditions?: Record<string, unknown>;
  fields?: string;
  ensure?: boolean;
  childRel?: Array<IQueryGet & { opposite: string }>;
}

interface IQueryPost {
  serverModel: string;
  action: string;
  objectId: string;
  changes: {
    key: string;
    to: unknown;
    from?: string;
  }[];
  hasMany?: Record<string, any>[];
  belongsTo?: {
    key: string;
    serverModel: string;
    from?: string;
    to: unknown;
  }[];
}

interface IExecRequest {
  action: string;
  method: string;
  type: string;
  data: Array<any>;
}

export default class SharanApi {
  private authPayload: IAuthPayload;
  private cookies!: string | null;
  private requestUrl: string | null;

  constructor(authPayload: IAuthPayload) {
    this.authPayload = authPayload;
    this.requestUrl = `${this.authPayload.appUrl}/direct/entry`;
  }

  public async login(): Promise<void> {
    try {
      const loginUrl = `${this.authPayload.appUrl}/login/checkUser`;
      const loginOptions = {
        method: 'POST',
        body: JSON.stringify({
          login: this.authPayload.login,
          password: this.authPayload.password,
          remember_me: 'on'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const loginResponse = await fetch(loginUrl, loginOptions);

      this.cookies = loginResponse.headers.get('set-cookie');

      if (!this.cookies) throw new Error('Unauthorized');

      const profileUrl = this.authPayload.appUrl + (await loginResponse.text()).replace('[redirect]', '');
      const selectProfileOptions = {
        headers: {
          Cookie: this.cookies
        }
      };

      const selectProfileResponse = await fetch(profileUrl, selectProfileOptions);

      if (selectProfileResponse.status != 200) throw new Error('Unauthorized');

      console.log('login success');
    } catch (err: any) {
      throw new Error(`Login failed with error: ${err.message}`);
    }
  }

  private async fetchRequest(body: string) {
    if (!this.cookies || !this.requestUrl) throw new Error('Cookies is missing');

    const requestPostOptions = {
      method: 'POST',
      headers: {
        Cookie: this.cookies,
        'Content-Type': 'application/json'
      },
      body
    };

    const response = await fetch(this.requestUrl, requestPostOptions);
    const data = await response.json();
    return data;
  }

  public async execGet<T>(queryGet: IQueryGet): Promise<T> {
    try {
      const getQuery = {
        action: 'Modeleditor',
        method: 'runQuery',
        type: 'rpc',
        data: [
          {
            queryIn: queryGet
          }
        ]
      };

      const data = await this.fetchRequest(JSON.stringify(getQuery));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec get query error: ${err.message}`);
    }
  }

  public async execPost<T>(queryPost: IQueryPost[]): Promise<T> {
    try {
      const getQuery = {
        action: 'Modeleditor',
        method: 'DirectFormSubmit',
        type: 'rpc',
        data: [queryPost]
      };

      const data = await this.fetchRequest(JSON.stringify(getQuery));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec post query error: ${err.message}`);
    }
  }

  public async execQuery<T, P>(method: string, payload: P): Promise<T> {
    try {
      const getQuery = {
        action: 'StoredQuery',
        method: method,
        type: 'rpc',
        data: [payload]
      };

      const data = await this.fetchRequest(JSON.stringify(getQuery));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec query error: ${err.message}`);
    }
  }

  public async execDirect<T, P>(method: string, payload: P): Promise<T> {
    try {
      const getQuery = {
        action: 'Modeleditor',
        method: method,
        type: 'rpc',
        data: [payload]
      };

      const data = await this.fetchRequest(JSON.stringify(getQuery));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec direct error: ${err.message}`);
    }
  }

  public async execRequest<T>(payload: IExecRequest): Promise<T> {
    try {
      const data = await this.fetchRequest(JSON.stringify(payload));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec query error: ${err.message}`);
    }
  }
}
