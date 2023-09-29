import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <section className="container mx-auto h-screen box-border">
      {children}
    </section>
  );
};

export default Container;
