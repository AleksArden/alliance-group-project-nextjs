export const revalidate = async (path: string) => {
  console.log('function', path);
  await fetch(`http://localhost:3000/api/revalidate?path=${path}`, {
    method: 'POST',
  });
};
