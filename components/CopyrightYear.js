"use client";

import { useEffect, useState } from "react";

// Starts with the year the page was built (so server and client HTML match),
// then switches to the visitor's current year in the browser. The year
// therefore rolls over on 1 January without needing a redeploy.
export default function CopyrightYear({ initial }) {
  const [year, setYear] = useState(initial);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return <>{year}</>;
}
