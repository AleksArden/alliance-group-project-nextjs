export const revalidate = async (path: string) => {
  console.log('path', path);
  await fetch(`http://localhost:3000/api/revalidate?path=${path}`, {
    method: 'GET',
  });
};
