(function () {
  try {
    var e = typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof globalThis != "undefined" ? globalThis : typeof self != "undefined" ? self : {};
    var n = new e.Error().stack;
    if (n) {
      e._posthogChunkIds = e._posthogChunkIds || {};
      e._posthogChunkIds[n] = "019fac75-f35e-7f51-b77e-c630ad8b866f";
    }
  } catch (e) {}
})();
import { B as o, E as a, J as e } from "./BtLKJFoOO27o.js";
const r = {
  java_26_3_lb: {
    label: "Java 26.3 (LB, Exp.)",
    isExperimental: true,
    warning: "Version 26.3 is still in development. Features may be missing, and results may be wrong.",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V26_3,
      config: {
        largeBiomes: true
      }
    }
  },
  java_26_3: {
    label: "Java 26.3 (Exp.)",
    isExperimental: true,
    warning: "Version 26.3 is still in development. Features may be missing, and results may be wrong.",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V26_3,
      config: {}
    }
  },
  java_26_2_lb: {
    label: "Java 26.2 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V26_2,
      config: {
        largeBiomes: true
      }
    }
  },
  java_26_2: {
    label: "Java 26.2",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V26_2,
      config: {}
    }
  },
  java_26_1_lb: {
    label: "Java 26.1 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_9,
      config: {
        largeBiomes: true
      }
    }
  },
  java_26_1: {
    label: "Java 26.1",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_9,
      config: {}
    }
  },
  java_1_21_9_lb: {
    label: "Java 1.21.9 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_9,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21_9: {
    label: "Java 1.21.9",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_9,
      config: {}
    }
  },
  java_1_21_6_lb: {
    label: "Java 1.21.6 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_6,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21_6: {
    label: "Java 1.21.6",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_6,
      config: {}
    }
  },
  java_1_21_5_lb: {
    label: "Java 1.21.5 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_5,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21_5: {
    label: "Java 1.21.5",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_5,
      config: {}
    }
  },
  java_1_21_4_lb: {
    label: "Java 1.21.4 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_4,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21_4: {
    label: "Java 1.21.4",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_4,
      config: {}
    }
  },
  java_1_21_2_lb: {
    label: "Java 1.21.2 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_2,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21_2: {
    label: "Java 1.21.2",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21_2,
      config: {}
    }
  },
  java_1_21_lb: {
    label: "Java 1.21 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_21: {
    label: "Java 1.21",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_21,
      config: {}
    }
  },
  java_1_20_lb: {
    label: "Java 1.20 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_20,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_20: {
    label: "Java 1.20",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_20,
      config: {}
    }
  },
  java_1_19_3_lb: {
    label: "Java 1.19.3 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_19_3,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_19_3: {
    label: "Java 1.19.3",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_19_3,
      config: {}
    }
  },
  java_1_19_lb: {
    label: "Java 1.19 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_19,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_19: {
    label: "Java 1.19",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_19,
      config: {}
    }
  },
  java_1_18_lb: {
    label: "Java 1.18 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_18,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_18: {
    label: "Java 1.18",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_18,
      config: {}
    }
  },
  java_1_17_lb: {
    label: "Java 1.17 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_17,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_17: {
    label: "Java 1.17",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_17,
      config: {}
    }
  },
  java_1_16_lb: {
    label: "Java 1.16 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_16,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_16: {
    label: "Java 1.16",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_16,
      config: {}
    }
  },
  java_1_15_lb: {
    label: "Java 1.15 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_15,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_15: {
    label: "Java 1.15",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_15,
      config: {}
    }
  },
  java_1_14_lb: {
    label: "Java 1.14 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_14,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_14: {
    label: "Java 1.14",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_14,
      config: {}
    }
  },
  java_1_13_lb: {
    label: "Java 1.13 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_13,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_13: {
    label: "Java 1.13",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_13,
      config: {}
    }
  },
  java_1_12_lb: {
    label: "Java 1.12 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_12,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_12: {
    label: "Java 1.12",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_12,
      config: {}
    }
  },
  java_1_11_lb: {
    label: "Java 1.11 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_11,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_11: {
    label: "Java 1.11",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_11,
      config: {}
    }
  },
  java_1_10_lb: {
    label: "Java 1.10 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_10,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_10: {
    label: "Java 1.10",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_10,
      config: {}
    }
  },
  java_1_9_lb: {
    label: "Java 1.9 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_9,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_9: {
    label: "Java 1.9",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_9,
      config: {}
    }
  },
  java_1_8_lb: {
    label: "Java 1.8 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_8,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_8: {
    label: "Java 1.8",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_8,
      config: {}
    }
  },
  java_1_7_lb: {
    label: "Java 1.7 (LB)",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_7,
      config: {
        largeBiomes: true
      }
    }
  },
  java_1_7: {
    label: "Java 1.7",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_7,
      config: {}
    }
  },
  bedrock_26_50: {
    label: "Bedrock 26.50 (Exp.)",
    isExperimental: true,
    warning: "Version 26.50 is still in development. Features may be missing, and results may be wrong.",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V26_50,
      config: {}
    }
  },
  bedrock_26_30: {
    label: "Bedrock 26.30",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V26_30,
      config: {}
    }
  },
  bedrock_26_0: {
    label: "Bedrock 26.0",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_120,
      config: {}
    }
  },
  bedrock_1_21_120: {
    label: "Bedrock 1.21.120",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_120,
      config: {}
    }
  },
  bedrock_1_21_110: {
    label: "Bedrock 1.21.111",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_110,
      config: {}
    }
  },
  bedrock_1_21_90: {
    label: "Bedrock 1.21.90",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_90,
      config: {}
    }
  },
  bedrock_1_21_60: {
    label: "Bedrock 1.21.60",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_60,
      config: {}
    }
  },
  bedrock_1_21_50: {
    label: "Bedrock 1.21.50",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21_50,
      config: {}
    }
  },
  bedrock_1_21: {
    label: "Bedrock 1.21",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_21,
      config: {}
    }
  },
  bedrock_1_20_60: {
    label: "Bedrock 1.20.60",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_20_60,
      config: {}
    }
  },
  bedrock_1_20: {
    label: "Bedrock 1.20",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_20,
      config: {}
    }
  },
  bedrock_1_19: {
    label: "Bedrock 1.19",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_19,
      config: {}
    }
  },
  bedrock_1_18: {
    label: "Bedrock 1.18",
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_18,
      config: {}
    }
  },
  bedrock_1_17: {
    label: "Bedrock 1.17",
    use32BitSeed: true,
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_17,
      config: {}
    }
  },
  bedrock_1_16: {
    label: "Bedrock 1.16",
    use32BitSeed: true,
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_16,
      config: {}
    }
  },
  bedrock_1_14: {
    label: "Bedrock 1.14",
    use32BitSeed: true,
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_14,
      config: {}
    }
  },
  java: {
    label: "Java",
    cb3World: {
      edition: a.Java,
      javaVersion: e.V1_7,
      config: {}
    }
  },
  bedrock: {
    label: "Bedrock",
    use32BitSeed: false,
    cb3World: {
      edition: a.Bedrock,
      bedrockVersion: o.V1_19,
      config: {}
    }
  }
};
function _(i) {
  return Object.hasOwn(r, i);
}
export { r as C, _ as i };
/*! Chunk Base (c) Alexander Gundermann - https://www.chunkbase.com - unauthorized copying prohibited */
//# chunkId=019fac75-f35e-7f51-b77e-c630ad8b866f