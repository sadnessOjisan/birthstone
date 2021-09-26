import { createStitches } from "@stitches/react";

export const { css, getCssText } = createStitches({
  media: {
    onlyPc: "(min-width: 769px)",
    exceptForPc: "(min-width:0px) and (max-width: 768px)",
  },
});
