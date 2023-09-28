import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return <section className="container mx-auto h-screen">{children}</section>;
};

export default Container;
