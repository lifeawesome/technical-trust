import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

const components: MDXComponents = {
  img: (props) => (
    <Image
      sizes="(max-width: 768px) 100vw, 720px"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
