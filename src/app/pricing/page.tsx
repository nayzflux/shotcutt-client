import PlanCard from "@/components/pricing/PlanCard";
import { plans } from "@/data/plan";
import React from "react";

const PricingPage = () => {
  return (
    <main className="flex flex-col items-center gap-16 px-16 py-8 xl:px-32 xl-py-16 2xl:px-64 flex-grow bg-grid">
      <div className="flex flex-col items-center gap-8 py-4 2xl:py-20">
        <p className="text-6xl font-bold text-center">
          Start{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-400 to-rose-400">
            splitting
          </strong>{" "}
          your <br /> footage in{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-400 to-rose-400">
            seconds
          </strong>
          .
        </p>

        <p className="text-lg text-center text-muted-foreground font-medium">
          Select the plan that best suits your needs <br />
          from our flexible options.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-8 items-center justify-center">
        {plans.map(({ title, description, items, price, cta, primary }) => (
          <PlanCard
            key={title}
            title={title}
            description={description}
            items={items}
            price={price}
            cta={cta}
            primary={primary}
          />
        ))}
      </div>
    </main>
  );
};

export default PricingPage;
