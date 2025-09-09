import React from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const StudioPlan = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline">← Back</Button>
          </Link>
        </div>

        {/* Floor Plan Image */}
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">Studio Plan Overview</h2>
          <div className="relative inline-block">
            <img
              src="/images/studio-plan.png" // <-- replace with your uploaded image path
              alt="Architecture Studio Plan"
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudioPlan;
