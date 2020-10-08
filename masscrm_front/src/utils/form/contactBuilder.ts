export class ContactBuilder {
  public responsible?: string;

  public first_name?: string;

  public last_name?: string;

  public gender?: string;

  public location: any;

  public emails?: string[];

  public company_id?: number;

  public position?: string;

  public skype?: string;

  public confidence?: number;

  public full_name?: string;

  public requires_validation?: number | string;

  public birthday?: string;

  public origin?: any;

  public linkedin?: string;

  public comment?: string;

  public social_networks?: any;

  public phones?: string[];

  setResponsible(responsible?: string) {
    this.responsible = responsible;
    return this;
  }

  setFirstName(first_name?: string) {
    this.first_name = first_name;
    return this;
  }

  setLastName(last_name?: string) {
    this.last_name = last_name;
    return this;
  }

  setGender(gender?: string) {
    this.gender = gender;
    return this;
  }

  setLocation(location: any, region?: string, city?: string) {
    this.location = location;
    if (region) this.location.region = region;
    if (city) this.location.city = city;
    return this;
  }

  setEmails(emails: string | string[]) {
    this.emails = emails ? [...emails] : undefined;
    return this;
  }

  setCompanyId(company_id?: number) {
    this.company_id = company_id;
    return this;
  }

  setPosition(position?: string) {
    this.position = position;
    return this;
  }

  setSkype(skype?: string) {
    this.skype = skype;
    return this;
  }

  setConfidence(confidence?: number) {
    this.confidence = Number(confidence);
    return this;
  }

  setFullName(full_name?: string, isEditedFullName?: boolean) {
    this.full_name = isEditedFullName
      ? full_name
      : `${this.first_name} ${this.last_name}`;
    return this;
  }

  setRequestValidation(requires_validation: boolean) {
    this.requires_validation = requires_validation ? '1' : '0';
    return this;
  }

  setBirthday(birthday?: string) {
    this.birthday = birthday;
    return this;
  }

  setOrigin(origin?: string | string[]) {
    this.origin = origin ? [...origin] : undefined;
    return this;
  }

  setLinkedIn(linkedin?: string) {
    this.linkedin = linkedin;
    return this;
  }

  setComment(comment?: string) {
    this.comment = comment;
    return this;
  }

  setSocialNetworks(network?: string | string[]) {
    if (network) {
      this.social_networks = network;
    }
    return this;
  }

  setPhones(phones?: string | string[]) {
    this.phones = phones ? [...phones] : undefined;
    return this;
  }
}
