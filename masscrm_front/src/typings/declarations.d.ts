declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png' {
  export const content: string;
}

declare module '*.jpg' {
  export const content: string;
}

declare module '*.svg' {
  export const content: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare module '*.ttf' {
  export const content: string;
}

declare module 'enzyme';
