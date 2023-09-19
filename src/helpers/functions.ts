export const arrayCompanyName = (name: string) => {
  let companyName: string[] = [];
  name.split(' ').forEach(item => {
    if (item !== '') {
      companyName.push(item);
    }
  });

  const secondPartCompanyName = companyName.splice(1, 2).join(' ');
  companyName.push(secondPartCompanyName);

  return companyName;
};
