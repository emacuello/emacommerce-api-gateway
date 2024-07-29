import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'VerifyEmailAndUsername', async: false })
export class VerifyEmailAndUsername implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    // if (args.object['username'] !== username && args.object['email']) {
    //   return false;
    // }
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'El email o el username son requeridos';
  }
}
