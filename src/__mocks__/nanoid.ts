export const nanoid = (size?: number) =>
  Array.from({ length: size || 21 }, () =>
    'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
    [Math.floor(Math.random() * 64)]
  ).join('');

export { nanoid as default };
