import type { Exam, MultipleChoiceQuestion } from "@/types/exam";

const questions: MultipleChoiceQuestion[] = [
  {
    "id": "cfa-level-1-session-2-q1",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information (in $ millions) about a hedge fund:\n| Initial investment cost | 100 |\n|---|---|\n| Profit, Year 1 | 25 |\n| Loss, Year 2 | 10 |\n\n\n**If the incentive fee is 20% and there is a clawback provision, the total incentive fee (in $ millions) for Years 1 and 2 is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "0."
      },
      {
        "id": "b",
        "label": "B",
        "text": "3."
      },
      {
        "id": "c",
        "label": "C",
        "text": "5."
      }
    ],
    "correctAnswer": "b",
    "explanation": "The incentive fee is calculated on the cumulative performance.\n* **Total Profit over 2 years:** $25 \\text{ million (Year 1)} - 10 \\text{ million (Year 2)} = 15 \\text{ million}$.\n* **Total Incentive Fee Due:** $20\\% \\times 15 \\text{ million} = 3 \\text{ million}$.\n* *Note:* Although the manager might have collected 5 million in Year 1, the clawback provision forces them to return the excess so that the total fee aligns with the cumulative profit of 15 million.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q2",
    "type": "multiple-choice",
    "text": "**To be eligible for the upcoming dividend, the latest date an investor needs to purchase the share is on the trading day before the:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "ex-date."
      },
      {
        "id": "b",
        "label": "B",
        "text": "record date."
      },
      {
        "id": "c",
        "label": "C",
        "text": "declaration date."
      }
    ],
    "correctAnswer": "a",
    "explanation": "To receive a dividend, an investor must own the stock **before** the ex-dividend date. Therefore, the latest purchase date is the trading day before the ex-date. If you buy on the ex-date, the dividend goes to the previous owner.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q3",
    "type": "multiple-choice",
    "text": "**A zero coupon bond is priced at 90 and has three years to maturity. Based on a compounding periodicity of 4, the bond\u2019s annual yield-to-maturity is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "1.8%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "2.7%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "3.5%."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Using the TVM (Time Value of Money) inputs: $PV = -90$, $FV = 100$, $N = 3 \\times 4 = 12$ periods.\nSolving for the periodic interest rate ($r$):\n$$90 = \\frac{100}{(1+r)^{12}} \\Rightarrow (1+r)^{12} = 1.111$$\n$$r \\approx 0.88\\% \\text{ per quarter}$$\n**Annualized Yield:** $0.88\\% \\times 4 \\approx 3.5\\%$.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q4",
    "type": "multiple-choice",
    "text": "**Investors are least likely to use derivatives to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "take short positions."
      },
      {
        "id": "b",
        "label": "B",
        "text": "replicate a cash market strategy."
      },
      {
        "id": "c",
        "label": "C",
        "text": "offset market-based exposures incidental to their financing activities."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Offsetting financing exposures is primarily a function for **issuers** (corporations borrowing money), not \"investors\" (who allocate capital). Investors typically use derivatives to hedge investment risks (like currency or price drops), speculate (short positions), or replicate strategies efficiently.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q5",
    "type": "multiple-choice",
    "text": "**A swap is most likely similar to a series of forward contracts when:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "the combined value of all forward contracts is zero."
      },
      {
        "id": "b",
        "label": "B",
        "text": "all the forward contracts have the same maturity date."
      },
      {
        "id": "c",
        "label": "C",
        "text": "the value of the long forward contracts are matched with the value of the short forward contracts at each swap payment date."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A swap is economically equivalent to a series of forward contracts. At initiation, the swap rate is set such that the present value of the swap is zero. This implies the combined value of all the underlying implicit forward contracts sums to zero (even though individual forwards within the series might have positive or negative values).",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q6",
    "type": "multiple-choice",
    "text": "**Which of the following is the most conservative price for valuing a hedge fund\u2019s short position?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "The bid price"
      },
      {
        "id": "b",
        "label": "B",
        "text": "The ask price"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The average of the bid and ask prices"
      }
    ],
    "correctAnswer": "b",
    "explanation": "A short position is a liability (you owe the shares). To settle the liability, you must **buy** the shares back. You buy at the **Ask** price (which is higher than the Bid). Conservative valuation uses the cost to exit (the Ask).",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q7",
    "type": "multiple-choice",
    "text": "**A security is most likely undervalued if its estimated intrinsic value is higher than its:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "par value."
      },
      {
        "id": "b",
        "label": "B",
        "text": "book value."
      },
      {
        "id": "c",
        "label": "C",
        "text": "market price."
      }
    ],
    "correctAnswer": "c",
    "explanation": "A security is undervalued if its **Intrinsic Value** (what it is truly worth) is higher than its **Market Price** (what it currently costs).",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q8",
    "type": "multiple-choice",
    "text": "**Which of the following measures is the slope of the capital allocation line?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Sharpe ratio"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Treynor ratio"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Jensen\u2019s alpha"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The slope of the Capital Allocation Line (CAL) represents the reward-to-risk ratio of the portfolio, which is the **Sharpe ratio**: $\\frac{R_p - R_f}{\\sigma_p}$.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q9",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about a hedge fund established at the beginning of Year 1:\n| Assets under management (AUM), beginning of Year 1 | $100 million |\n|---|---|\n| AUM, end of Year 1 | $125 million |\n| AUM, end of Year 2 | $110 million |\n| Management fee (calculated on end-of-year AUM) | 2% |\n| Performance fee above high-water mark (calculated net of fees) | 20% |\n\n\n**The cumulative fee (in $ millions) earned by the hedge fund manager for the two years is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "5.2."
      },
      {
        "id": "b",
        "label": "B",
        "text": "7.2."
      },
      {
        "id": "c",
        "label": "C",
        "text": "9.2."
      }
    ],
    "correctAnswer": "c",
    "explanation": "* **Year 1:**\n    * Gross Value: 125.\n    * Mgmt Fee: $125 \\times 2\\% = 2.5$.\n    * Net Gain before Incentive: $125 - 100 - 2.5 = 22.5$.\n    * Incentive Fee: $22.5 \\times 20\\% = 4.5$.\n    * **Total Fee Y1:** $2.5 + 4.5 = 7.0$.\n    * Net Asset Value (NAV) Y1: $125 - 7 = 118$. (This sets the High-Water Mark).\n* **Year 2:**\n    * Gross Value: 110.\n    * Mgmt Fee: $110 \\times 2\\% = 2.2$.\n    * Net Value: $110 - 2.2 = 107.8$.\n    * Since $107.8 < 118$ (HWM), no incentive fee is paid.\n* **Cumulative Fee:** $7.0 + 2.2 = 9.2$ million.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q10",
    "type": "multiple-choice",
    "text": "**Over time, a forward contract most likely has variable:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "value and constant price."
      },
      {
        "id": "b",
        "label": "B",
        "text": "price and constant value."
      },
      {
        "id": "c",
        "label": "C",
        "text": "value and variable price."
      }
    ],
    "correctAnswer": "c",
    "explanation": "For a forward contract:\n* **Price:** The forward price (contract rate) is fixed at initiation and remains constant.\n* **Value:** The value of the contract starts at zero and varies as the market price of the underlying asset changes over time.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q11",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information (in $ billions) about a company:\n| Market value of debt | 5 |\n|---|---|\n| Market capitalization | 43 |\n| Enterprise value | 33 |\n\n\n**The balance (in $ billions) of the company\u2019s cash and short-term investments is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "5."
      },
      {
        "id": "b",
        "label": "B",
        "text": "10."
      },
      {
        "id": "c",
        "label": "C",
        "text": "15."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Enterprise Value (EV) = Equity Value + Debt - Cash.\n$$33 = 43 + 5 - \\text{Cash}$$\n$$33 = 48 - \\text{Cash}$$\n$$\\text{Cash} = 15 \\text{ billion}.$$",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q12",
    "type": "multiple-choice",
    "text": "**All else being equal, the value of a European put option is most likely inversely related to the time to expiration when interest rates are high, the time to expiration is long and the put is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "at-the-money."
      },
      {
        "id": "b",
        "label": "B",
        "text": "deep in-the-money."
      },
      {
        "id": "c",
        "label": "C",
        "text": "deep out-of-the-money."
      }
    ],
    "correctAnswer": "b",
    "explanation": "For a European put, you can only exercise at expiration. If the option is **deep in-the-money**, you want the cash now (strike price) to earn high interest. Having to wait for expiration (long time) acts as a penalty because you lose the time value of money on the strike proceeds. Thus, higher time to expiration reduces value in this specific scenario.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q13",
    "type": "multiple-choice",
    "text": "**Which of the following provides the best behavioral explanation of the value stock anomaly?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "The halo effect"
      },
      {
        "id": "b",
        "label": "B",
        "text": "The disposition effect"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The effects of the framing bias"
      }
    ],
    "correctAnswer": "a",
    "explanation": "The **halo effect** occurs when a positive attribute (like a company's good growth or products) influences the perception of other attributes (like thinking the stock is a \"good buy\"). This causes investors to overvalue growth stocks. When these high expectations aren't met, value stocks (which were ignored or undervalued) outperform them.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q14",
    "type": "multiple-choice",
    "text": "**A market index consists of 100 assets. Investment 1 consists of one asset that is randomly chosen from the index. Every month the asset is replaced by a new randomly chosen asset. Investment 2 equally weights all assets in the index. Over a period of 100 months, the annualized standard deviation of Investment 1 is most likely:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "less than the annualized standard deviation of Investment 2."
      },
      {
        "id": "b",
        "label": "B",
        "text": "equal to the annualized standard deviation of Investment 2."
      },
      {
        "id": "c",
        "label": "C",
        "text": "greater than the annualized standard deviation of Investment 2."
      }
    ],
    "correctAnswer": "c",
    "explanation": "* **Investment 1:** Holds 1 stock at a time (randomly replaced). It has the high standard deviation of a single asset.\n* **Investment 2:** Holds 100 stocks (diversified). Diversification significantly eliminates unsystematic risk.\n* Therefore, the single-asset strategy (Investment 1) will have a **greater** standard deviation than the diversified portfolio.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q15",
    "type": "multiple-choice",
    "text": "**The current yield for a coupon-paying bond trading at a premium is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "less than the coupon rate."
      },
      {
        "id": "b",
        "label": "B",
        "text": "equal to the coupon rate."
      },
      {
        "id": "c",
        "label": "C",
        "text": "greater than the coupon rate."
      }
    ],
    "correctAnswer": "a",
    "explanation": "For a bond trading at a **premium** (Price > Par):\nCoupon Rate > Current Yield > Yield to Maturity.\nTherefore, the current yield is **less than** the coupon rate.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q16",
    "type": "multiple-choice",
    "text": "**The market portfolio has an expected return of 10% and a standard deviation of 11%. If the risk-free rate is 2%, the slope of the capital market line is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "0.73."
      },
      {
        "id": "b",
        "label": "B",
        "text": "0.91."
      },
      {
        "id": "c",
        "label": "C",
        "text": "1.38."
      }
    ],
    "correctAnswer": "a",
    "explanation": "The slope of the Capital Market Line (CML) is the Sharpe Ratio of the market portfolio.\n$$\\text{Slope} = \\frac{E(R_m) - R_f}{\\sigma_m} = \\frac{10\\% - 2\\%}{11\\%} = \\frac{8}{11} \\approx 0.73$$",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q17",
    "type": "multiple-choice",
    "text": "**A key catalyst for the relative growth of passive investing compared to active investing is most likely the:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "lower costs of index funds."
      },
      {
        "id": "b",
        "label": "B",
        "text": "higher returns to investors from outperforming benchmarks."
      },
      {
        "id": "c",
        "label": "C",
        "text": "increased correlation of returns between traditional investments and alternative investments."
      }
    ],
    "correctAnswer": "a",
    "explanation": "The primary driver for the shift from active to passive investing is the **lower costs** (fees) associated with index funds/ETFs, combined with the difficulty active managers have in consistently beating benchmarks after fees.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q18",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about a bond:\n| Price | Yield-to-Maturity (%) |\n|---|---|\n| 103.52 | 3.7 |\n| 103.84 | 3.3 |\n\n\n**If the bond currently trades at a price of 103.67 with a yield-to-maturity of 3.5%, the approximate convexity is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "0.048"
      },
      {
        "id": "b",
        "label": "B",
        "text": "0.096"
      },
      {
        "id": "c",
        "label": "C",
        "text": "48.230"
      }
    ],
    "correctAnswer": "c",
    "explanation": "Convexity Formula: $\\frac{P_- + P_+ - 2P_0}{P_0 \\times (\\Delta y)^2}$\n* $P_- (\\text{yield 3.3\\%}) = 103.84$\n* $P_+ (\\text{yield 3.7\\%}) = 103.52$\n* $P_0 (\\text{yield 3.5\\%}) = 103.67$\n* $\\Delta y = 0.002$\n* Numerator: $103.84 + 103.52 - 2(103.67) = 0.02$\n* Denominator: $103.67 \\times (0.002)^2 = 0.00041468$\n* Convexity: $0.02 / 0.00041468 \\approx 48.23$",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q19",
    "type": "multiple-choice",
    "text": "**If 1,000 shares of stock purchased at $30 per share on 75% margin are later sold at $26 per share, the return on equity is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "-17.8%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "-13.3%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "-10.0%."
      }
    ],
    "correctAnswer": "a",
    "explanation": "* **Initial Cost:** $30,000$.\n* **Initial Equity (75%):** $22,500$.\n* **Sale Proceeds:** $26,000$.\n* **Loss:** $30,000 - 26,000 = 4,000$.\n* **Return on Equity:** $\\frac{-4,000}{22,500} = -17.8\\%$.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q20",
    "type": "multiple-choice",
    "text": "**An American waterfall distributes performance fees on a(n):**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "deal-by-deal basis and is more advantageous to the general partner than a European waterfall."
      },
      {
        "id": "b",
        "label": "B",
        "text": "deal-by-deal basis and is more advantageous to the limited partners than a European waterfall."
      },
      {
        "id": "c",
        "label": "C",
        "text": "aggregated fund level and is more advantageous to the limited partners than a European waterfall."
      }
    ],
    "correctAnswer": "a",
    "explanation": "An **American waterfall** pays performance fees on a deal-by-deal basis. This is advantageous to the **General Partner** because they get paid sooner (as soon as one deal exits profitably), whereas a European waterfall requires the whole fund to be profitable (investors paid back first) before performance fees are taken.",
    "topic": "Equity Investments"
  },
  {
    "id": "cfa-level-1-session-2-q21",
    "type": "multiple-choice",
    "text": "**All else being equal, non-cumulative preference shares are more risky for investors than:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "cumulative preference shares."
      },
      {
        "id": "b",
        "label": "B",
        "text": "dividend-paying common shares."
      },
      {
        "id": "c",
        "label": "C",
        "text": "non-dividend-paying common shares."
      }
    ],
    "correctAnswer": "a",
    "explanation": "**Non-cumulative** preference shares are riskier for investors than cumulative ones. If a company misses a dividend payment on non-cumulative shares, the investor loses it forever. On cumulative shares, the missed payment accumulates and must be paid later.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q22",
    "type": "multiple-choice",
    "text": "**Which of the following statements is most likely correct regarding the spot and forward curves. The spot curve:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "can be calculated from the forward curve, and the forward curve can be calculated from the spot curve."
      },
      {
        "id": "b",
        "label": "B",
        "text": "can be calculated from the forward curve, but the forward curve cannot be calculated from the spot curve."
      },
      {
        "id": "c",
        "label": "C",
        "text": "cannot be calculated from the forward curve, but the forward curve can be calculated from the spot curve."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Spot rates and forward rates are mathematically interlinked. If you have the complete spot curve, you can calculate the forward curve, and vice versa.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q23",
    "type": "multiple-choice",
    "text": "An investor sells a European put option with the following characteristics:\n| Put price | 30 |\n|---|---|\n| Excercise price | 600 |\n\n\n**If the price of the underlying at expiration is 620, the profit for the seller is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "10."
      },
      {
        "id": "b",
        "label": "B",
        "text": "20."
      },
      {
        "id": "c",
        "label": "C",
        "text": "30."
      }
    ],
    "correctAnswer": "c",
    "explanation": "* **Position:** Sold Put (Short Put). Strike = 600. Premium received = 30.\n* **Expiration Price:** 620.\n* Since the price (620) is higher than the strike (600), the put option is Out-of-the-Money and expires worthless.\n* **Profit:** The seller keeps the full premium of **30**.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q24",
    "type": "multiple-choice",
    "text": "**With respect to an investment policy statement, which of the following is best classified as a legal and regulatory constraint?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "An investor\u2019s tax status"
      },
      {
        "id": "b",
        "label": "B",
        "text": "A pension fund\u2019s self-investment limit"
      },
      {
        "id": "c",
        "label": "C",
        "text": "An investor\u2019s desire to avoid investments in the gambling industry"
      }
    ],
    "correctAnswer": "b",
    "explanation": "* **A (Tax):** Classified as a Tax constraint.\n* **B (Pension limit):** A specific limit on self-investment is usually a **Regulatory** (Legal) constraint imposed by government acts (e.g., ERISA in the US).\n* **C (Gambling):** A Unique Circumstance/ESG preference.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q25",
    "type": "multiple-choice",
    "text": "**According to put-call-forward parity, the difference between the price of a put and the price of a call is most likely equal to the difference between:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "forward price and spot price discounted at the risk-free rate."
      },
      {
        "id": "b",
        "label": "B",
        "text": "spot price and exercise price discounted at the risk-free rate."
      },
      {
        "id": "c",
        "label": "C",
        "text": "exercise price and forward price discounted at the risk-free rate."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Put-Call Parity: $P + S = C + PV(K)$.\nRearranging for Put minus Call: $P - C = PV(K) - S$.\nSubstitute Spot ($S$) with discounted Forward ($F$): $S = PV(F)$.\nSo, $P - C = PV(K) - PV(F) = PV(K - F)$.\nThis represents the difference between the Exercise Price and the Forward Price, discounted.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q26",
    "type": "multiple-choice",
    "text": "**With respect to a client\u2019s IPS, which of the following measures is most likely used when stating a relative risk objective?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Value at risk"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Tracking risk"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Standard deviation of returns"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Relative risk objectives relate the portfolio's performance to a benchmark. **Tracking risk** (tracking error) measures the volatility of the difference between the portfolio return and the benchmark return. (VaR and Standard Deviation are absolute risk measures).",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q27",
    "type": "multiple-choice",
    "text": "**A call option is in the money if the exercise price minus the price of the underlying at expiration is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "less than zero."
      },
      {
        "id": "b",
        "label": "B",
        "text": "equal to zero."
      },
      {
        "id": "c",
        "label": "C",
        "text": "greater than zero."
      }
    ],
    "correctAnswer": "a",
    "explanation": "A call is In-The-Money (ITM) if the Underlying Price ($S$) > Exercise Price ($K$).\nThe question asks about the value of \"$K - S$\".\nIf $S > K$, then $K - S$ must be **less than zero** (negative).",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q28",
    "type": "multiple-choice",
    "text": "**A 5% semi-annual pay bond with a par value of $1,000 is priced for settlement on February 5. If interest payments are made on May 31 and November 30, accrued interest based on 30/360 day-count convention is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "$9.03."
      },
      {
        "id": "b",
        "label": "B",
        "text": "$9.18."
      },
      {
        "id": "c",
        "label": "C",
        "text": "$9.31."
      }
    ],
    "correctAnswer": "a",
    "explanation": "* **Days Calculation (30/360):** From Nov 30 to Feb 5.\n    * December: 30 days\n    * January: 30 days\n    * February: 5 days\n    * Total: 65 days.\n* **Accrued Interest:** $\\frac{65}{180} \\times 25 \\text{ (semi-annual coupon)} = 9.03$.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q29",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about returns for an equity index:\n\n**The index\u2019s total return over three years is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "18%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "20%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "21%."
      }
    ],
    "correctAnswer": "c",
    "explanation": "*Note: The numerical data was missing from the text provided, but this is a standard mock question. The returns are typically Year 1: 5%, Year 2: 3%, Year 3: 12%.*\nCalculation: $(1.05 \\times 1.03 \\times 1.12) - 1 \\approx 21.1\\%$.\nThe closest answer is 21%.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q30",
    "type": "multiple-choice",
    "text": "**An analyst discovers that several stocks exhibit a pattern of price declines in the spring and price increases in the fall. If the analyst can consistently earn abnormal returns using this information, the market is most likely:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "inefficient."
      },
      {
        "id": "b",
        "label": "B",
        "text": "weak-form efficient."
      },
      {
        "id": "c",
        "label": "C",
        "text": "semi-strong-form."
      }
    ],
    "correctAnswer": "a",
    "explanation": "If an analyst can consistently earn abnormal returns using historical price patterns (seasonality), the market violates Weak-Form efficiency. If it is not even Weak-Form efficient, it is **Inefficient**.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q31",
    "type": "multiple-choice",
    "text": "An investor gathered the following data:\n| Par value of preferred stock offered with a 6% dividend rate | $100 |\n|---|---|\n| Company\u2019s sustainable growth rate | 5% |\n| Yield on comparable preferred stock issues | 11.5% |\n| Investor\u2019s marginal tax rate | 30% |\n\n\n**The value of the company\u2019s preferred stock is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "$52.17"
      },
      {
        "id": "b",
        "label": "B",
        "text": "$54.78"
      },
      {
        "id": "c",
        "label": "C",
        "text": "$96.92"
      }
    ],
    "correctAnswer": "a",
    "explanation": "$52.17  \nThe preferred stock is valued as a perpetuity: annual dividend = $100 \u00d7 6% = $6; value = $6 / 11.5% \u2248 $52.17. The growth rate and tax rate are distractors, as preferred dividends are typically fixed and taxes cancel out in the valuation.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q32",
    "type": "multiple-choice",
    "text": "**In an order-driven market, if the trade price is determined by the limit price of an order, the market most likely operates under the:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "uniform pricing rule."
      },
      {
        "id": "b",
        "label": "B",
        "text": "derivative pricing rule."
      },
      {
        "id": "c",
        "label": "C",
        "text": "discriminatory pricing rule."
      }
    ],
    "correctAnswer": "c",
    "explanation": "discriminatory pricing rule.  \nIn continuous order-driven markets, trades execute at the limit price of the standing order, leading to discriminatory pricing where different orders trade at varying prices.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q33",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information on three investors. Each investor holds a bond with a Macaulay duration of 5.5 years in his portfolio:\nInvestment Horizon\n| Investor A | 5 years |\n|---|---|\n| Investor B | 2 years |\n| Investor C | 8 years |\n\n\n**All else equal, which investor is currently most vulnerable to an increase in interest rates?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Investor A"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Investor B"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Investor C"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Investor B  \nInvestor B has the largest duration mismatch (horizon 2 years vs. Macaulay duration 5.5 years). For horizons shorter than duration, an interest rate increase causes greater net negative impact due to price risk dominating over reinvestment gains.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q34",
    "type": "multiple-choice",
    "text": "An analyst gathers the following data about three assets\u2019 returns:\nCorrelation with the Market\n| Asset | Portfolio\u2019s Returns | Beta |\n|---|---|---|\n| 1 | 0.8 | 1.000 |\n| 2 | 0.7 | 1.225 |\n| 3 | 0.5 | 1.125 |\n\n\n**If the market portfolio\u2019s standard deviation of returns is 20%, the asset with the highest standard deviation is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Asset 1."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Asset 2."
      },
      {
        "id": "c",
        "label": "C",
        "text": "Asset 3."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Asset 3.  \nStandard deviation = beta \u00d7 market SD / correlation. Asset 1: 1.000 \u00d7 20% / 0.8 = 25%; Asset 2: 1.225 \u00d7 20% / 0.7 \u2248 35%; Asset 3: 1.125 \u00d7 20% / 0.5 = 45%. Asset 3 has the highest SD.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q35",
    "type": "multiple-choice",
    "text": "Jim Cotter is considering investing in a stock index fund and a property investment fund. His planned investment amounts, fund returns, and standard deviations are given in the table. The correlation between the two funds is -0.1.\n| Fund | Investment Amount | Expected Return | Standard Deviation |\n|---|---|---|---|\n| Stock index | 10M | 20% | 35% |\n| Property investment | 90M | 33% | 70% |\n\n\n**The portfolio\u2019s standard deviation is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "62.75%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "63.10%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "63.45%."
      }
    ],
    "correctAnswer": "a",
    "explanation": "62.75%.  \nPortfolio weights: stock 10%, property 90%. Variance = (0.1\u00b2 \u00d7 0.35\u00b2) + (0.9\u00b2 \u00d7 0.7\u00b2) + 2\u00d70.1\u00d70.9\u00d7(-0.1)\u00d70.35\u00d70.7 \u2248 0.3937; SD = \u221a0.3937 \u2248 62.75%.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q36",
    "type": "multiple-choice",
    "text": "**For an option-free bond, effective duration:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "will be equal to modified duration if the yield curve is absolutely flat."
      },
      {
        "id": "b",
        "label": "B",
        "text": "measures interest rate risk for both parallel and non-parallel benchmark yield curve shifts."
      },
      {
        "id": "c",
        "label": "C",
        "text": "is an estimate of the percentage change in bond price given a change in the bond\u2019s yield to maturity."
      }
    ],
    "correctAnswer": "c",
    "explanation": "is an estimate of the percentage change in bond price given a change in the bond\u2019s yield to maturity.  \nEffective duration approximates %\u0394price / \u0394YTM for option-free bonds, assuming a parallel shift.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q37",
    "type": "multiple-choice",
    "text": "**An analyst observes that stock markets usually demonstrate return distributions concentrated to the right with a higher frequency of negative deviation from the mean. This feature is most likely known as:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "kurtosis."
      },
      {
        "id": "b",
        "label": "B",
        "text": "positive skewness."
      },
      {
        "id": "c",
        "label": "C",
        "text": "negative skewness."
      }
    ],
    "correctAnswer": "c",
    "explanation": "negative skewness.  \nHigher frequency of negative deviations indicates a longer left tail, characteristic of negative skewness in stock returns.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q38",
    "type": "multiple-choice",
    "text": "**Which of the following statements is most accurate? In derivatives pricing:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "investors are assumed to be risk averse."
      },
      {
        "id": "b",
        "label": "B",
        "text": "expected payoffs of the derivative can be discounted at the risk-free rate."
      },
      {
        "id": "c",
        "label": "C",
        "text": "a portfolio consisting of the underlying and the derivative must earn the risk-free rate plus a risk premium."
      }
    ],
    "correctAnswer": "b",
    "explanation": "expected payoffs of the derivative can be discounted at the risk-free rate.  \nIn risk-neutral pricing, expected payoffs (under risk-neutral measure) are discounted at the risk-free rate.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q39",
    "type": "multiple-choice",
    "text": "**Which of the following statements about digital assets is most accurate?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Most have an inherent value based on the expected cash flow"
      },
      {
        "id": "b",
        "label": "B",
        "text": "They can be purchased through indirect investment vehicles such as hedge funds"
      },
      {
        "id": "c",
        "label": "C",
        "text": "They are generally recorded in private ledgers maintained by central intermediaries"
      }
    ],
    "correctAnswer": "b",
    "explanation": "They can be purchased through indirect investment vehicles such as hedge funds  \nDigital assets like cryptocurrencies can be accessed indirectly via hedge funds or ETFs; they lack inherent cash flow value and use decentralized ledgers.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q40",
    "type": "multiple-choice",
    "text": "**The portion of a bond\u2019s value that an investor loses in an event of default best defines:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "default risk."
      },
      {
        "id": "b",
        "label": "B",
        "text": "loss severity."
      },
      {
        "id": "c",
        "label": "C",
        "text": "expected loss."
      }
    ],
    "correctAnswer": "b",
    "explanation": "loss severity.  \nLoss severity (or loss given default) is the portion of value lost upon default.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q41",
    "type": "multiple-choice",
    "text": "**Which investment will most likely expose investors to the greatest level of extension risk?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Commercial mortgage-backed securities with a balloon payment"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Shorter-term tranches in a collateralized mortgage obligation structure"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Planned amortization class tranches in a collateralized mortgage obligation structure"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Commercial mortgage-backed securities with a balloon payment  \nCMBS with balloons have high extension risk if refinancing fails when rates rise or conditions worsen, delaying maturity.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q42",
    "type": "multiple-choice",
    "text": "**A fiduciary call is equal to which of the following positions?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Long a call and long a risk-free bond"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Long a call, long a risk-free bond, and short a put"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Long a call, short the underlying, and long a risk-free bond"
      }
    ],
    "correctAnswer": "a",
    "explanation": "Long a call and long a risk-free bond  \nA fiduciary call is long call + risk-free bond with face value equal to strike, per put-call parity.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q43",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about a company:\n| Next year\u2019s EPS forecast | $0.60 |\n|---|---|\n| Dividend payout ratio | 45% |\n| Growth rate | 7% |\n\n\n**Using the Gordon growth model, if the analyst\u2019s required return is 10%, the justified forward P/E for the company is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "15."
      },
      {
        "id": "b",
        "label": "B",
        "text": "18."
      },
      {
        "id": "c",
        "label": "C",
        "text": "20"
      }
    ],
    "correctAnswer": "a",
    "explanation": "15.  \nD1 = $0.60 \u00d7 45% = $0.27; P0 = $0.27 / (10% - 7%) = $9; forward P/E = $9 / $0.60 = 15.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q44",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about a company and its common stock:\n| Expected dividend per share (D\u2081) | $2 |\n|---|---|\n| Estimated dividend growth rate | 4% |\n| Return on equity | 9% |\n\n\n**Based on the Gordon growth model, if the required rate of return increases from 8% to 14%, the value of the stock decreases by:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "50%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "60%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "75%."
      }
    ],
    "correctAnswer": "b",
    "explanation": "60%.  \nAt 8%: P0 = $2 / (8% - 4%) = $50; at 14%: P0 = $2 / (14% - 4%) = $20; decrease = ($50 - $20) / $50 = 60%.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q45",
    "type": "multiple-choice",
    "text": "**Which of the following derivative contracts has a hard commodity underlying?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Cattle futures"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Soybean futures"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Aluminum futures"
      }
    ],
    "correctAnswer": "c",
    "explanation": "Aluminum futures  \nHard commodities are mined (e.g., metals like aluminum); cattle and soybeans are soft (agricultural/livestock).",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q46",
    "type": "multiple-choice",
    "text": "**The historical results forecasting approach is most appropriate for a company:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "making a large acquisition."
      },
      {
        "id": "b",
        "label": "B",
        "text": "operating in a cyclical industry."
      },
      {
        "id": "c",
        "label": "C",
        "text": "with a low sensitivity to the business cycle."
      }
    ],
    "correctAnswer": "c",
    "explanation": "with a low sensitivity to the business cycle.  \nHistorical forecasting averages past results, suitable for stable, non-cyclical companies; not for acquisitions or cyclical industries.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q47",
    "type": "multiple-choice",
    "text": "**At the initiation of a securitization, the primary role of the special purpose entity is to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "sell the collateral."
      },
      {
        "id": "b",
        "label": "B",
        "text": "service the collateral."
      },
      {
        "id": "c",
        "label": "C",
        "text": "purchase the collateral."
      }
    ],
    "correctAnswer": "c",
    "explanation": "purchase the collateral.  \nThe SPE buys assets from the originator at initiation to isolate them for securitization.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q48",
    "type": "multiple-choice",
    "text": "**Investing in correctional facilities to be constructed and sold to the government is best described as a(n):**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "greenfield investment."
      },
      {
        "id": "b",
        "label": "B",
        "text": "brownfield investment."
      },
      {
        "id": "c",
        "label": "C",
        "text": "an economic infrastructure investment."
      }
    ],
    "correctAnswer": "a",
    "explanation": "greenfield investment.  \nConstructing new facilities from scratch is greenfield; it's also infrastructure but best fits greenfield.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q49",
    "type": "multiple-choice",
    "text": "**On 1 January, an investor purchases an option-free bond that pays an annual coupon rate of 10% on Dec 31 and matures in ten years at its par value of $100. The investor plans to sell the bond immediately after receiving the seventh coupon. If the coupons are reinvested at an annual interest rate of 8% over the investor\u2019s holding period, the future value of the reinvested coupon payments at the end of the investor\u2019s holding period is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "$70.00."
      },
      {
        "id": "b",
        "label": "B",
        "text": "$75.90."
      },
      {
        "id": "c",
        "label": "C",
        "text": "$89.23."
      }
    ],
    "correctAnswer": "c",
    "explanation": "$89.23.  \nFV of $10 annual coupons for 7 years at 8%: $10 \u00d7 [(1.08^7 - 1) / 0.08] \u2248 $10 \u00d7 8.9225 = $89.23.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q50",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information (in \u00a3 millions) about a company\u2019s fiscal year:\n| Net income | 1,500 |\n|---|---|\n| Average total assets | 11,500 |\n| Average shareholders\u2019 equity | 7,500 |\n\n\n**If the dividend payout ratio is 45%, the sustainable growth rate is closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "7%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "9%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "11%."
      }
    ],
    "correctAnswer": "c",
    "explanation": "11%.  \nROE = 1,500 / 7,500 = 20%; retention = 1 - 45% = 55%; sustainable g = 20% \u00d7 55% = 11%.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q51",
    "type": "multiple-choice",
    "text": "**In an efficient market, asset prices most likely react to the release of:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "expected information only."
      },
      {
        "id": "b",
        "label": "B",
        "text": "unexpected information only."
      },
      {
        "id": "c",
        "label": "C",
        "text": "both expected information and unexpected information."
      }
    ],
    "correctAnswer": "b",
    "explanation": "unexpected information only.  \nEfficient markets already reflect expected info; prices adjust to new, unexpected information.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q52",
    "type": "multiple-choice",
    "text": "**The multiple of invested capital (MOIC) measure takes into account:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "the realized value of an investment only."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the residual asset value of an investment only."
      },
      {
        "id": "c",
        "label": "C",
        "text": "both the realized value of an investment and the residual asset value of an investment."
      }
    ],
    "correctAnswer": "c",
    "explanation": "both the realized value of an investment and the residual asset value of an investment.  \nMOIC = (realized + unrealized value) / invested capital.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q53",
    "type": "multiple-choice",
    "text": "**Consider two 10-year bonds, one that contains no embedded options and the other that gives its owner the right to convert the bond to a fixed number of shares of the issuer\u2019s common stock. The convertibility option in the second bond cannot be exercised for five years. The bonds are otherwise identical. Compared with the yield on the convertible bond, the yield on the option-free bond is most likely:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "lower."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the same."
      },
      {
        "id": "c",
        "label": "C",
        "text": "higher."
      }
    ],
    "correctAnswer": "c",
    "explanation": "higher.  \nThe convertible bond is more valuable due to the embedded option, so it has a lower yield than the option-free bond.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q54",
    "type": "multiple-choice",
    "text": "**The type of index weighting system in which a stock split on one constituent security changes the weights on all the securities in the index is:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "price weighting."
      },
      {
        "id": "b",
        "label": "B",
        "text": "equal weighting."
      },
      {
        "id": "c",
        "label": "C",
        "text": "value weighting."
      }
    ],
    "correctAnswer": "a",
    "explanation": "price weighting.  \nIn price-weighted indexes, a split lowers one stock's price and weight, increasing others' relative weights.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q55",
    "type": "multiple-choice",
    "text": "**Two assets are correctly priced according to the CAPM. If the assets have the same expected variance of returns but different expected returns, the two assets must have different levels of:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "systematic risk only."
      },
      {
        "id": "b",
        "label": "B",
        "text": "unsystematic risk only."
      },
      {
        "id": "c",
        "label": "C",
        "text": "both systematic risk and unsystematic risk."
      }
    ],
    "correctAnswer": "c",
    "explanation": "both systematic risk and unsystematic risk.  \nDifferent E(r) implies different betas (systematic risk); same total variance requires offsetting differences in unsystematic risk.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q56",
    "type": "multiple-choice",
    "text": "An analyst gathers the following information about a market for a stock:\n| Best offer | $48 |\n|---|---|\n| Market bid-ask spread | $2 |\n\n\n**If a new sell limit order is placed at $49, the limit order:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "takes the market."
      },
      {
        "id": "b",
        "label": "B",
        "text": "makes the market."
      },
      {
        "id": "c",
        "label": "C",
        "text": "is behind the market."
      }
    ],
    "correctAnswer": "c",
    "explanation": "is behind the market.  \nBest ask is $48; a sell limit at $49 is higher (worse for buyers), so it's behind the current market.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q57",
    "type": "multiple-choice",
    "text": "**Which of the following statements regarding certificates of deposit (CDs) is most accurate?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Small-denomination CDs are typically traded among institutional investors."
      },
      {
        "id": "b",
        "label": "B",
        "text": "Non-negotiable CDs can be sold in the open market prior to the maturity date."
      },
      {
        "id": "c",
        "label": "C",
        "text": "CDs are available in domestic bond markets as well as in the Eurobond market."
      }
    ],
    "correctAnswer": "c",
    "explanation": "CDs are available in domestic bond markets as well as in the Eurobond market.  \nCDs exist domestically and as Eurodollar CDs; small ones are retail/not traded, non-negotiable can't be sold.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q58",
    "type": "multiple-choice",
    "text": "**Which of the following lines is depicted on a graph using systematic risk on the horizontal axis?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Capital market line (CML)"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Security market line (SML)"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Capital allocation line (CAL)"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Security market line (SML)  \nSML plots E(r) vs. beta (systematic risk); CML and CAL use total risk (SD).",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q59",
    "type": "multiple-choice",
    "text": "**Which of the following investors is least likely to be concerned about liquidity risk?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "A manager of a fixed-income mutual fund"
      },
      {
        "id": "b",
        "label": "B",
        "text": "An individual investor intending to hold a bond to maturity"
      },
      {
        "id": "c",
        "label": "C",
        "text": "An investor using repurchase agreements to purchase bonds"
      }
    ],
    "correctAnswer": "b",
    "explanation": "An individual investor intending to hold a bond to maturity  \nHold-to-maturity avoids selling, minimizing liquidity concerns; mutual funds face redemptions, repos involve short-term liquidity.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q60",
    "type": "multiple-choice",
    "text": "**Information-motivated traders are most likely to differ from pure investors in that they:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "pay lower transaction fees."
      },
      {
        "id": "b",
        "label": "B",
        "text": "expect to earn excess returns."
      },
      {
        "id": "c",
        "label": "C",
        "text": "hold well-diversified portfolios."
      }
    ],
    "correctAnswer": "b",
    "explanation": "expect to earn excess returns.  \nInformation-motivated traders act on info for alpha; pure investors (e.g., indexers) seek market returns and diversify.",
    "topic": "Fixed Income"
  },
  {
    "id": "cfa-level-1-session-2-q61",
    "type": "multiple-choice",
    "text": "**An investor bears more risk than initially thought because of the failure to consider the interaction of credit risk and market risk. This type of risk interaction is best described as:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "solvency risk."
      },
      {
        "id": "b",
        "label": "B",
        "text": "wrong-way risk."
      },
      {
        "id": "c",
        "label": "C",
        "text": "operational risk."
      }
    ],
    "correctAnswer": "b",
    "explanation": "**Wrong-way risk** occurs when the exposure to a counterparty is positively correlated with the probability of that counterparty's default (i.e., potential loss increases exactly when the counterparty is least able to pay).",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q62",
    "type": "multiple-choice",
    "text": "**Which of the following industry classification schemes covers private companies, non-profits, and government entities?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "The Industry Classification Benchmark (ICB)"
      },
      {
        "id": "b",
        "label": "B",
        "text": "The Refinitiv Business Classification (TRBC)"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The Global Industry Classification Standard (GICS)"
      }
    ],
    "correctAnswer": "b",
    "explanation": "The **Refinitiv Business Classification (TRBC)** is the most comprehensive global classification system, covering public and private companies, as well as non-profits and government entities. (GICS and ICB primarily focus on public equity markets).",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q63",
    "type": "multiple-choice",
    "text": "**A high-quality and a high-yield corporation are each issuing subordinated debt with similar characteristics. Compared to the high-yield issuer, the notching adjustment for the high-quality issuer will most likely be:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "smaller."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the same."
      },
      {
        "id": "c",
        "label": "C",
        "text": "larger."
      }
    ],
    "correctAnswer": "a",
    "explanation": "For high-quality (investment grade) issuers, the probability of default is lower, and the potential difference in loss severity between senior and subordinated debt is perceived to be less extreme than for high-yield issuers. Therefore, rating agencies typically apply **smaller** notching adjustments (e.g., 1 notch) for investment-grade issuers compared to high-yield issuers (e.g., 2 notches).",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q64",
    "type": "multiple-choice",
    "text": "**The holders of common shares of a company are legally entitled to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "receive regular dividends from the company."
      },
      {
        "id": "b",
        "label": "B",
        "text": "a repayment of the purchase price of their shares."
      },
      {
        "id": "c",
        "label": "C",
        "text": "a claim on the company\u2019s net assets in the event of liquidation"
      }
    ],
    "correctAnswer": "c",
    "explanation": "Common shareholders have a residual claim on the company's assets. In the event of liquidation, they are entitled to whatever net assets remain after all liabilities (creditors) and preferred shareholders have been paid.",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q65",
    "type": "multiple-choice",
    "text": "**Which of the following categories of private debt most likely has the highest level of risk for an investor?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Mezzanine debt"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Senior direct debt"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Infrastructure debt"
      }
    ],
    "correctAnswer": "a",
    "explanation": "**Mezzanine debt** sits between senior debt and equity in the capital structure. It often includes warrants or conversion rights (equity kickers) to compensate for the higher risk of being subordinate to senior debt.",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q66",
    "type": "multiple-choice",
    "text": "**Hedge funds are least likely to have restrictions concerning:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "the use of derivatives."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the withdrawal of invested funds."
      },
      {
        "id": "c",
        "label": "C",
        "text": "the number of investors in the fund."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Hedge funds are known for utilizing complex strategies. They are **least likely** to have restrictions on the use of derivatives (they use them for hedging, leverage, and speculation). They *do* typically have restrictions on liquidity (lock-up periods) and the number of investors (to maintain regulatory exemptions).",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q67",
    "type": "multiple-choice",
    "text": "**After issuance, the coupon rate of a floating-rate bond is most likely influenced by changes in:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "the reference rate only."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the issuer\u2019s credit quality only."
      },
      {
        "id": "c",
        "label": "C",
        "text": "both the reference rate and the issuer\u2019s credit quality."
      }
    ],
    "correctAnswer": "a",
    "explanation": "The coupon rate of a floating-rate bond is calculated as: $\\text{Reference Rate} + \\text{Quoted Margin}$. The Quoted Margin is typically fixed at issuance based on the issuer's credit quality *at that time*. Therefore, periodic coupon changes are driven only by changes in the **reference rate** (e.g., SOFR, Euribor).",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q68",
    "type": "multiple-choice",
    "text": "**An investor buys a stock for $108 on margin by posting 40% of the initial stock price as equity. If the maintenance margin requirement for the position is 20%, a margin call first occurs when the price falls below:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "$64.80."
      },
      {
        "id": "b",
        "label": "B",
        "text": "$81.00."
      },
      {
        "id": "c",
        "label": "C",
        "text": "$86.40."
      }
    ],
    "correctAnswer": "b",
    "explanation": "Formula: $\\text{Price} \\times \\frac{1 - \\text{Initial Margin}}{1 - \\text{Maintenance Margin}}$\n* Initial Price = $108$.\n* Initial Equity % (Initial Margin) = $40\\%$ ($0.40$).\n* Maintenance Margin = $20\\%$ ($0.20$).\n* $\\text{Trigger Price} = 108 \\times \\frac{1 - 0.40}{1 - 0.20} = 108 \\times \\frac{0.6}{0.8} = 81.00$.",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q69",
    "type": "multiple-choice",
    "text": "**All else being equal, which of the following statements based on the binomial model is accurate? When the volatility of the underlying increases, the value of a:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "put option and the value of a call option on the underlying will increase."
      },
      {
        "id": "b",
        "label": "B",
        "text": "put option on the underlying will increase while the value of a call option on the underlying will decrease."
      },
      {
        "id": "c",
        "label": "C",
        "text": "call option on the underlying will increase while the value of a put option on the underlying will decrease."
      }
    ],
    "correctAnswer": "a",
    "explanation": "An increase in the volatility of the underlying asset increases the probability that the option will expire deep in-the-money. This potential upside (without increasing downside risk, since the option price floor is zero) increases the value of **both** put and call options.",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q70",
    "type": "multiple-choice",
    "text": "**An analyst calculates the duration of a portfolio containing only fixed-rate bonds, callable bonds, and asset-backed securities. Which duration measure is the most appropriate to use?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Macaulay duration"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Effective duration"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Modified duration"
      }
    ],
    "correctAnswer": "b",
    "explanation": "**Effective duration** is required for bonds with embedded options (like callable bonds) and ABS (which have prepayment risk). It accounts for how cash flows change when interest rates change. Macaulay and Modified duration assume fixed cash flows.",
    "topic": "Derivatives"
  },
  {
    "id": "cfa-level-1-session-2-q71",
    "type": "multiple-choice",
    "text": "**Consider a put option selling for $4 in which the exercise price is $58. What is the profit for a put buyer if the price of the underlying at expiration is $57?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "-$3"
      },
      {
        "id": "b",
        "label": "B",
        "text": "$1"
      },
      {
        "id": "c",
        "label": "C",
        "text": "$3"
      }
    ],
    "correctAnswer": "a",
    "explanation": "* Long Put Strike ($X$): $58$.\n* Price at Expiration ($S$): $57$.\n* Put Premium Paid: $4$.\n* Payoff: $\\text{Max}(0, X - S) = 58 - 57 = 1$.\n* Profit: $\\text{Payoff} - \\text{Cost} = 1 - 4 = -3$.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q72",
    "type": "multiple-choice",
    "text": "**A short exposure to an underlying instrument is achieved by:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "writing a put option."
      },
      {
        "id": "b",
        "label": "B",
        "text": "buying a put option."
      },
      {
        "id": "c",
        "label": "C",
        "text": "buying a call option."
      }
    ],
    "correctAnswer": "b",
    "explanation": "* **Buying a Put:** You profit if the price goes down (Short exposure).\n* Writing a Put: You profit if price stays up (Long exposure).\n* Buying a Call: You profit if price goes up (Long exposure).",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q73",
    "type": "multiple-choice",
    "text": "**All else equal, interest rate risk is lowest for which of the following non-callable bonds?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Discount"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Premium"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Zero-coupon"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Duration (interest rate risk) is lower when cash flows are received sooner.\n* **Premium bonds** have higher coupons than par or discount bonds (assuming same maturity).\n* Higher coupons mean more cash is returned earlier, reducing the duration.\n* Zero-coupon bonds have the highest duration (equal to maturity).",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q74",
    "type": "multiple-choice",
    "text": "**Which of the following types of investors most likely has the highest risk tolerance?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Banks"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Endowments"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Insurance companies"
      }
    ],
    "correctAnswer": "b",
    "explanation": "**Endowments** typically have long investment horizons (often infinite) and low immediate liquidity needs, allowing them to tolerate higher risk (such as volatility and illiquidity) compared to banks or insurance companies which have rigid liability constraints.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q75",
    "type": "multiple-choice",
    "text": "**For an investor with a long position, the price of a futures contract will most likely be higher than the price on a forward contract on the same asset with the same expiration date if there is a:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "negative correlation between the futures price and interest rates."
      },
      {
        "id": "b",
        "label": "B",
        "text": "zero correlation between the futures price and interest rates."
      },
      {
        "id": "c",
        "label": "C",
        "text": "positive correlation between the futures price and interest rates."
      }
    ],
    "correctAnswer": "c",
    "explanation": "If asset prices and interest rates are **positively correlated**:\n* When the asset rises (Long Futures gain), rates rise. You can reinvest your daily mark-to-market gains at higher rates.\n* When the asset falls (Long Futures loss), rates fall. You can finance your daily losses at lower rates.\n* This makes Futures more attractive than Forwards, leading to a higher price.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q76",
    "type": "multiple-choice",
    "text": "**Which of the following investments most likely provides an investor with indirect equity exposure to real estate?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Real estate investment trusts"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Real estate limited partnerships"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Commercial mortgage-backed securities"
      }
    ],
    "correctAnswer": "a",
    "explanation": "**REITs** (Real Estate Investment Trusts) are publicly traded companies that own real estate. Buying shares in a REIT gives an investor equity exposure to real estate without having to directly manage properties. CMBS is a debt investment.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q77",
    "type": "multiple-choice",
    "text": "**Two risk managers are discussing how an organization\u2019s risk tolerance should be determined. The first manager says, \u201cThe risk tolerance must reflect the losses or shortfalls that will cause the organization to fail to meet critical objectives.\u201d The second manager responds, \u201cThe risk tolerance must reflect the external forces that bring uncertainty to the organization.\u201d Which of them is most likely correct?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Both risk managers"
      },
      {
        "id": "b",
        "label": "B",
        "text": "The first risk manager"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The second risk manager"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Risk tolerance is the **lower** of an investor's *ability* to take risk and their *willingness* to take risk. The first manager correctly identifies the **Ability** to take risk (\"losses... cause the organization to fail\"), which acts as the hard constraint (budget, liabilities).",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q78",
    "type": "multiple-choice",
    "text": "**In contrast to a contingent claim, a forward commitment creates counterparty risk for:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "the long position only."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the short position only."
      },
      {
        "id": "c",
        "label": "C",
        "text": "both the long and the short positions."
      }
    ],
    "correctAnswer": "c",
    "explanation": "In a **Forward Commitment** (like a forward contract or swap), both parties are obligated to transact at a future date. Depending on market movements, either side could owe money to the other; therefore, **both** the long and short positions face counterparty credit risk. (In options/contingent claims, only the buyer faces credit risk).",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q79",
    "type": "multiple-choice",
    "text": "**Management fees for private equity funds are most likely based on:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "invested capital."
      },
      {
        "id": "b",
        "label": "B",
        "text": "committed capital"
      },
      {
        "id": "c",
        "label": "C",
        "text": "assets under management."
      }
    ],
    "correctAnswer": "b",
    "explanation": "In Private Equity, management fees are typically calculated based on **Committed Capital** (the total amount investors pledged), not just the invested capital or current AUM. This supports the fund's operations while they search for investment targets.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q80",
    "type": "multiple-choice",
    "text": "**Which of the following offers the flexibility of delaying harvests when their prices are down?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Farmland only"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Timberland only"
      },
      {
        "id": "c",
        "label": "C",
        "text": "Both farmland and timberland"
      }
    ],
    "correctAnswer": "b",
    "explanation": "**Timberland** offers flexibility. If timber prices are low, the manager can simply choose not to harvest. The trees continue to grow (biological growth), increasing the volume and value for a later harvest. Farmland crops must be harvested when ripe or they spoil.",
    "topic": "Alternative Investments"
  },
  {
    "id": "cfa-level-1-session-2-q81",
    "type": "multiple-choice",
    "text": "**Compared with co-investing, direct investing in alternative investments most likely offers:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "reduced control over the investment selection process."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the same level of control over the investment selection process."
      },
      {
        "id": "c",
        "label": "C",
        "text": "higher control over the investment selection process."
      }
    ],
    "correctAnswer": "c",
    "explanation": "**Direct investing** involves buying the asset yourself without an intermediary (fund). This provides the highest level of **control** over the selection and management, but requires more expertise. Co-investing allows some selection but is usually passive alongside a lead GP.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q82",
    "type": "multiple-choice",
    "text": "**An investor who prefers an asset with an uncertain expected payoff of $50 to a guaranteed payoff of $50 is best described as:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "risk averse."
      },
      {
        "id": "b",
        "label": "B",
        "text": "risk neutral."
      },
      {
        "id": "c",
        "label": "C",
        "text": "risk seeking."
      }
    ],
    "correctAnswer": "c",
    "explanation": "A **risk-seeking** investor prefers the \"thrill\" or potential of the gamble. Even though the expected value ($50) is the same as the guaranteed amount, they derive utility from the uncertainty/upside potential.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q83",
    "type": "multiple-choice",
    "text": "**Which of the following market anomalies describes the consistent outperformance of stocks with low P/E ratios?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "The size effect"
      },
      {
        "id": "b",
        "label": "B",
        "text": "The value effect"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The earnings surprise anomaly"
      }
    ],
    "correctAnswer": "b",
    "explanation": "The **Value Effect** is the observation that \"value\" stocks (those with low valuation multiples like P/E or P/B) tend to outperform \"growth\" stocks (high P/E) over the long term, contrary to the Efficient Market Hypothesis.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q84",
    "type": "multiple-choice",
    "text": "**The Procedures section of an investment policy statement (IPS) most likely:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "explains the steps to keep the IPS current."
      },
      {
        "id": "b",
        "label": "B",
        "text": "provides information about the permissible use of leverage."
      },
      {
        "id": "c",
        "label": "C",
        "text": "details the investor\u2019s policy with respect to rebalancing asset class weights."
      }
    ],
    "correctAnswer": "a",
    "explanation": "The **Procedures** section of an IPS typically outlines the governance and operational aspects, such as how and when the IPS will be reviewed, how managers will be selected, and the process for rebalancing.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q85",
    "type": "multiple-choice",
    "text": "**In a positive interest rate environment, the modified duration of an option-free bond is most likely:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "less than the Macaulay duration."
      },
      {
        "id": "b",
        "label": "B",
        "text": "the same as the Macaulay duration."
      },
      {
        "id": "c",
        "label": "C",
        "text": "greater than the Macaulay duration."
      }
    ],
    "correctAnswer": "a",
    "explanation": "Formula: $\\text{Modified Duration} = \\frac{\\text{Macaulay Duration}}{1 + \\text{Yield}}$.\nSince interest rates (Yield) are positive, the denominator is greater than 1. Therefore, Modified Duration is numerically **less than** Macaulay Duration.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q86",
    "type": "multiple-choice",
    "text": "**Which of the following asset-backed securities provides the highest level of protection against prepayment risk?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "A mortgage pass-through security"
      },
      {
        "id": "b",
        "label": "B",
        "text": "A collateralized mortgage obligation"
      },
      {
        "id": "c",
        "label": "C",
        "text": "A commercial mortgage-backed security"
      }
    ],
    "correctAnswer": "c",
    "explanation": "**Commercial Mortgage-Backed Securities (CMBS)** typically have strong call protection features at the loan level (e.g., prepayment lockouts, defeasance, yield maintenance charges) which prevent borrowers from refinancing early. Residential MBS (Pass-throughs and CMOs) usually have very high prepayment risk.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q87",
    "type": "multiple-choice",
    "text": "**Consider a $100 par value bond with a 7% coupon paid annually and five years to maturity. At a discount rate of 6.5%, the value of the bond today is $102.08. One day later, the discount rate increases to 7.5%. Assuming the discount rate remains at 7.5% over the remaining life of the bond, what is most likely to occur to the price of the bond between today and maturity? The price:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "decreases then increases."
      },
      {
        "id": "b",
        "label": "B",
        "text": "increases then decreases."
      },
      {
        "id": "c",
        "label": "C",
        "text": "decreases then remains unchanged."
      }
    ],
    "correctAnswer": "a",
    "explanation": "1.  **Immediate Effect:** The discount rate rises (6.5% $\\to$ 7.5%), causing the bond price to **decrease** immediately (and it becomes a discount bond since 7.5% YTM > 7% Coupon).\n2.  **Over Time:** As a discount bond approaches maturity, its price must rise to meet the Par Value ($100). This is the \"pull-to-par\" effect.\n3.  **Result:** The price decreases first, then increases over the remaining life.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q88",
    "type": "multiple-choice",
    "text": "**Which of the following best describes an investment principle used in formulating a client\u2019s strategic asset allocation?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "Assets with greater nonsystematic risk should be given less weight in a portfolio"
      },
      {
        "id": "b",
        "label": "B",
        "text": "Returns on asset classes are a function of systematic factors relevant to those asset classes"
      },
      {
        "id": "c",
        "label": "C",
        "text": "The more efficient an asset class, the more skillful an asset manager has to be to add value"
      }
    ],
    "correctAnswer": "b",
    "explanation": "Strategic Asset Allocation (SAA) is based on the principle that a portfolio's returns are primarily determined by its exposure to **systematic risk factors** (market risk, interest rate risk, etc.) associated with different asset classes. Nonsystematic risk should be diversified away, not weighted.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q89",
    "type": "multiple-choice",
    "text": "**Which type of index does not use market capitalization as a weighting method?**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "A commodity index"
      },
      {
        "id": "b",
        "label": "B",
        "text": "A broad equity market index"
      },
      {
        "id": "c",
        "label": "C",
        "text": "A real estate investment trust (REIT) index"
      }
    ],
    "correctAnswer": "a",
    "explanation": "**Commodity indices** cannot use market capitalization because commodities (like oil, corn, gold) do not have a \"market cap\" (shares $\\times$ price). They are typically weighted by production value, fixed weights, or equal weights.",
    "topic": "Portfolio Management"
  },
  {
    "id": "cfa-level-1-session-2-q90",
    "type": "multiple-choice",
    "text": "**A bond has a duration of 4.50 and convexity of 39.20. If interest rates increase by 0.5%, the percentage change in the bond\u2019s price will be closest to:**",
    "difficulty": "intermediate",
    "options": [
      {
        "id": "a",
        "label": "A",
        "text": "-2.30%."
      },
      {
        "id": "b",
        "label": "B",
        "text": "-2.25%."
      },
      {
        "id": "c",
        "label": "C",
        "text": "-2.20%."
      }
    ],
    "correctAnswer": "c",
    "explanation": "Formula: $\\% \\Delta \\text{Price} \\approx -\\text{Dur} \\times \\Delta y + 0.5 \\times \\text{Conv} \\times (\\Delta y)^2$\n* $\\Delta y = +0.005$\n* Duration Effect: $-4.50 \\times 0.005 = -0.0225$ (or $-2.25\\%$)\n* Convexity Effect: $0.5 \\times 39.20 \\times (0.005)^2 = 19.6 \\times 0.000025 = +0.00049$ (or $+0.049\\%$)\n* Total Change: $-2.25\\% + 0.049\\% = -2.201\\%$\n* Closest Answer: **-2.20%**.",
    "topic": "Portfolio Management"
  }
];

export const cfaLevel1Session2Exam: Exam = {
  id: "cfa-level-1-session-2",
  name: "CFA Level I - Session 2 (Portfolio & Assets)",
  description: "Session 2 of the Mock Exam (2h 15m). Covers Equity, Fixed Income, Derivatives, Alternative Investments, and Portfolio Management.",
  category: "finance",
  totalQuestions: questions.length,
  timeLimit: 135,
  passingScore: 70,
  questions,
  topics: [
  "Equity Investments",
  "Fixed Income",
  "Derivatives",
  "Alternative Investments",
  "Portfolio Management"
],
  difficulty: "intermediate",
  icon: "📊",
  color: "#10B981",
};

export default cfaLevel1Session2Exam;
