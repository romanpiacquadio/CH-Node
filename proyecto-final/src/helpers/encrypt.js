import bcrypt from 'bcrypt';

export const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(val, salt);
};

export const isPasswordValid = (psw, encryptedPsw) => {
  const validValue = bcrypt.compareSync(psw, encryptedPsw);
  return validValue;
};
