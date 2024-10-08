import config from './config';

interface ISharanApi {
  login(): Promise<void>;
}

type AuthPayload = {
  appUrl: string;
  password: string;
  login: string;
};

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

export default class SharanApi implements ISharanApi {
  private authPayload: AuthPayload;
  private cookies!: string | null;

  constructor(authPayload: AuthPayload) {
    this.authPayload = authPayload;
  }

  private async execQuery(url: string, body: string) {
    if (!this.cookies) throw new Error('Cookies is missing');

    const requestPostOptions = {
      method: 'POST',
      headers: {
        Cookie: this.cookies,
        'Content-Type': 'application/json'
      },
      body
    };

    const response = await fetch(url, requestPostOptions);
    const data = await response.json();
    return data;
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

  public async execPostQuery(queryPost: IQueryPost[]) {
    try {
      if (!this.cookies) throw new Error('Cookies is missing');

      const url = `${this.authPayload.appUrl}/direct/entry`;
      const requestPostOptions = {
        method: 'POST',
        headers: {
          Cookie: this.cookies,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'Modeleditor',
          method: 'DirectFormSubmit',
          type: 'rpc',
          data: [queryPost]
        })
      };

      const response = await fetch(url, requestPostOptions);
      return response.json();
    } catch (err: any) {
      throw new Error(`Exec post query error: ${err.message}`);
    }
  }

  public async execGetQuery<T>(queryGet: IQueryGet): Promise<T> {
    try {
      const url = `${this.authPayload.appUrl}/direct/entry`;
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

      const data = await this.execQuery(url, JSON.stringify(getQuery));
      return data[0].result as T;
    } catch (err: any) {
      throw new Error(`Exec get query error: ${err.message}`);
    }
  }
}

interface IServices {
  _id: string;
  englishName: string;
}

interface IClientsServices {
  _id: string;
  clientId: string;
  csid: number;
}

(async function () {
  const sharanApi = new SharanApi(config);
  await sharanApi.login();

  const getServices = {
    model: 'Sharan.Services'
  };

  const services = await sharanApi.execGetQuery<IServices[]>(getServices);
  console.log('services', services[0].englishName);

  const getCS = {
    model: 'Sharan.ClientsServices'
  };

  const cs = await sharanApi.execGetQuery<IClientsServices[]>(getCS);
  console.log('cs', cs.length);
})();
