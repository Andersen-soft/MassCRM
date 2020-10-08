export class ContactBuilder {
  public responsible: string | undefined;

  public first_name: string | undefined;

  public last_name: string | undefined;

  public gender: string | undefined;

  public location: any;

  public emails: any;

  public company_id: number | undefined;

  public position: string | undefined;

  public skype: string | undefined;

  public confidence: number | undefined;

  public full_name: string | undefined;

  public requires_validation: number | string | undefined;

  public birthday: any;

  public origin: any;

  public linkedin: string | undefined;

  public comment: string | undefined;

  public social_networks: string[] | undefined;

  public phones: any;

  setResponsible(responsible: string | undefined) {
    this.responsible = responsible;
    return this;
  }

  setFirstName(first_name: string | undefined) {
    this.first_name = first_name;
    return this;
  }

  setLastName(last_name: string | undefined) {
    this.last_name = last_name;
    return this;
  }

  setGender(gender: string | undefined) {
    this.gender = gender;
    return this;
  }

  setLocation(
    location: any,
    region: string | undefined,
    city: string | undefined
  ) {
    this.location = location;
    if (region) this.location.region = region;
    if (city) this.location.city = city;
    return this;
  }

  setEmails(emails: any) {
    this.emails = [...emails];
    return this;
  }

  setCompanyId(company_id: number | undefined) {
    this.company_id = company_id;
    return this;
  }

  setPosition(position: string | undefined) {
    this.position = position;
    return this;
  }

  setSkype(skype: string | undefined) {
    this.skype = skype;
    return this;
  }

  setConfidence(confidence: number | undefined) {
    this.confidence = Number(confidence);
    return this;
  }

  setFullName(full_name: string | undefined) {
    this.full_name = full_name || `${this.first_name} ${this.last_name}`;
    return this;
  }

  setRequestValidation(requires_validation: boolean) {
    this.requires_validation = requires_validation ? '0' : '1';
    return this;
  }

  setBirthday(birthday: any) {
    if (birthday) {
      this.birthday = birthday.toString();
    }
    return this;
  }

  setOrigin(origin: any) {
    this.origin = origin && [...origin];
    return this;
  }

  setLinkedIn(linkedin: string | undefined) {
    this.linkedin = linkedin;
    return this;
  }

  setComment(comment: string | undefined) {
    this.comment = comment;
    return this;
  }

  setSocialNetworks(social_networks: any) {
    if (social_networks && social_networks.length) {
      this.social_networks = [social_networks];
    }
    return this;
  }

  setPhones(phones: any) {
    if (phones && phones.length) {
      this.phones = [...phones];
    }
    return this;
  }
}
