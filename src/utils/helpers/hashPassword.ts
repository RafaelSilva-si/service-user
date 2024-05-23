import bcrypt from 'bcryptjs';

const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function comparePassword(
  passwordClient,
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(passwordClient, password);
}
