import { useEffect, useState } from "react";

export const useVisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const trackAndFetchVisitor = async () => {
      try {
        // Step 1: Track visitor
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        const ua = navigator.userAgent;

        await fetch("https://script.google.com/macros/s/AKfycbwVOVFDDjd1S4eCuxGKyXt3sZ5pJMkgHOPBN8C0-g7SzMV3sWx-a3gG5MRrJQAYlwYM/exec", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ ip, ua }),
        });

        // Step 2: Get count
        const countRes = await fetch("https://script.google.com/macros/s/AKfycbwVOVFDDjd1S4eCuxGKyXt3sZ5pJMkgHOPBN8C0-g7SzMV3sWx-a3gG5MRrJQAYlwYM/exec");
        const countData = await countRes.json();

        if (typeof countData.count === "number") {
          setVisitorCount(countData.count);
        } else {
          console.warn("Unexpected response from visitor count fetch:", countData);
        }
      } catch (err) {
        console.error("Visitor tracking failed:", err);
      }
    };

    trackAndFetchVisitor();
  }, []);

  return { visitorCount };
};
