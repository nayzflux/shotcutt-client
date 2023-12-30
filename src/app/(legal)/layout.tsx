import React from "react";

const LegalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col w-full gap-8 py-8  xl-py-16 px-[25%]">
      {children}
    </main>
  );
};

export default LegalLayout;
