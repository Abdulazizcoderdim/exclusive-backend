module.exports = class UserDto {
  id;
  name;
  emailOrPhone;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.name = model.name;
    this.emailOrPhone = model.emailOrPhone;
    this.isActivated = model.isActivated;
  }
};
