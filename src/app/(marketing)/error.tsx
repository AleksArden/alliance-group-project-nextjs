'use client';

const Error = ({ error }: { error: Error }) => {
  return <h1>Oooops!!! {error.message}</h1>;
};
export default Error;
