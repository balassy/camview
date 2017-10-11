export class CurrentUser {
  public readonly facebookAccessToken: string;
  public readonly firstName: string;
  public readonly id: string;
  public readonly name: string;

  public constructor(id: string, name: string, firstName: string, facebookAccessToken: string) {
    if (!id) {
      throw new Error('The id must be specified for the new CurrentUser instance!');
    }

    if (!name) {
      throw new Error('The name must be specified for the new CurrentUser instance!');
    }

    if (!firstName) {
      throw new Error('The firstName must be specified for the new CurrentUser instance!');
    }

    if (!facebookAccessToken) {
      throw new Error('The facebookAccessToken must be specified for the new CurrentUser instance!');
    }

    this.facebookAccessToken = facebookAccessToken;
    this.firstName = firstName;
    this.id = id;
    this.name = name;
  }
}
