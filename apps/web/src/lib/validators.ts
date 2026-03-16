export function validateCPF(value: string): boolean {
  const c = value.replace(/\D/g, "");
  if (c.length !== 11) return false;
  if (/^(\d)\1+$/.test(c)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(c[i]) * (10 - i);
  let rem = 11 - (sum % 11);
  if (rem >= 10) rem = 0;
  if (rem !== parseInt(c[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(c[i]) * (11 - i);
  rem = 11 - (sum % 11);
  if (rem >= 10) rem = 0;
  return rem === parseInt(c[10]);
}

export function validateCNPJ(value: string): boolean {
  const c = value.replace(/\D/g, "");
  if (c.length !== 14) return false;
  if (/^(\d)\1+$/.test(c)) return false;

  const calcDigit = (str: string, length: number): number => {
    const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += parseInt(str[i]) * weights[13 - length + i];
    }
    const rem = sum % 11;
    return rem < 2 ? 0 : 11 - rem;
  };

  return (
    calcDigit(c, 12) === parseInt(c[12]) && calcDigit(c, 13) === parseInt(c[13])
  );
}

export function validateCpfCnpj(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) return validateCPF(value);
  if (digits.length === 14) return validateCNPJ(value);
  return false;
}
