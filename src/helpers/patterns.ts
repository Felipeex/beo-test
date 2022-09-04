export function ValidadeCNPJ(cnpj: string) {
  const ValidadeCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  return cnpj.match(ValidadeCNPJ);
}
