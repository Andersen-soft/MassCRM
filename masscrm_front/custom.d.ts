declare module '*.svg' {
  const content: any;
  export default content;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}
