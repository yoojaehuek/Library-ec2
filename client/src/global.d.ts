declare module "*.scss" {
  const content: { [className: string]: string};
  export = content;
}

declare module '*.svg' {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}