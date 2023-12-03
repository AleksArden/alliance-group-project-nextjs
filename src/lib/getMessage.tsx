export const getMessages = async (locale: string) => {
  return await import(`lang/${locale}.json`);
};
