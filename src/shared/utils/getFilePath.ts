export const getFilePath = (fileName: string) =>
  `${process.env.SERVER_DOMAIN}/${fileName}`;
