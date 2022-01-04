import { environment } from 'src/environments/environment';

export class URLs {
  private static SERVER = environment.serverUrl;
  private static API = environment.apiUrl;
  public static LICENCE_MOCK_ENDPOINT = URLs.SERVER + URLs.API + '/licences';
  public static LICENCE_ENDPOINT = URLs.SERVER + URLs.API + '/licences';
}
