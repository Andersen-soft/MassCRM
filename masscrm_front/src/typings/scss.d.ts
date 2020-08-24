declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  export const classNames: IClassNames;
}
