import { useEffect, useState } from "react";

export const useVisitorTracker = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Step 1: Get user's IP address
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        const ip = ipData.ip;

        // Step 2: Get User-Agent
        const ua = navigator.userAgent;

        // Step 3: Send IP + UA to Google Apps Script
        await fetch("https://script.google.com/macros/s/AKfycbwVOVFDDjd1S4eCuxGKyXt3sZ5pJMkgHOPBN8C0-g7SzMV3sWx-a3gG5MRrJQAYlwYM/exec", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ ip, ua }),
        });

        // Step 4: Fetch today's visitor count
        const countRes = await fetch("https://script.google.com/macros/s/AKfycbwVOVFDDjd1S4eCuxGKyXt3sZ5pJMkgHOPBN8C0-g7SzMV3sWx-a3gG5MRrJQAYlwYM/exec?action=getCountToday");
        const countData = await countRes.json();

        if (countData.success && typeof countData.count === "number") {
          setVisitorCount(countData.count);
        } else {
          console.warn("Unexpected response format:", countData);
        }

      } catch (error) {
        console.error("Visitor tracking failed:", error);
      }
    };

    trackVisitor();
  }, []);

  return visitorCount;
};
