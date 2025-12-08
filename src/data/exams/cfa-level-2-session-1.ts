import type { Exam, Case, CaseQuestion, Difficulty } from "@/types/exam";

// Helper function to create case questions
function createQuestion(
    caseNum: number,
    qNum: number,
    text: string,
    options: { id: string; label: string; text: string }[],
    correctAnswer: string,
    explanation: string,
    topic: string,
    difficulty: Difficulty = "intermediate"
): CaseQuestion {
    return {
        id: `cfa-l2-s1-c${caseNum}-q${qNum}`,
        questionNumber: qNum,
        text,
        topic,
        difficulty,
        options,
        correctAnswer,
        explanation,
    };
}

// Case 1: Regression & Time Series Analysis
const case1: Case = {
    id: "cfa-l2-s1-case1",
    caseNumber: 1,
    title: "Specialty Retail Industry Sales Forecasting",
    content: `William Shears, CFA, has been assigned the task of predicting sales for the specialty retail industry. Shears finds that sales have been increasing at a fairly constant rate over time and decides to estimate the linear trend in sales for the industry using quarterly data over the past 15 years.

**Exhibit 1: Linear Trend Regression**
| | Coefficient | Standard Error |
|---|---|---|
| Intercept | 10.0 | 3.50 |
| Trend | 16.0 | 6.55 |

**Exhibit 2: AR(1) Model for Changes in Industry Sales**
| | Coefficient | Standard Error |
|---|---|---|
| Intercept | 20.0 | 2.15 |
| Lag 1 | 0.10 | 0.04 |

**Exhibit 3: Autocorrelations From the AR(1) Model**
| Lag | Autocorrelation | p-Value |
|---|---|---|
| 1 | -0.32 | 0.38 |
| 2 | -0.200 | 0.16 |
| 3 | -0.065 | 0.23 |
| 4 | 0.470 | 0.02 |

**Exhibit 4: 2018 Quarterly Industry Sales**
| Quarter | Sales (in millions) |
|---|---|
| Q1 2018 | 900 |
| Q2 2018 | 925 |
| Q3 2018 | 950 |
| Q4 2018 | 1,000 |`,
    questions: [
        createQuestion(1, 1,
            "Shears's supervisor expresses concern about equation misspecification. Which data transformation should be applied to address the concern that sales have been increasing at a fairly constant rate?",
            [
                { id: "a", label: "A", text: "Lagged transformation." },
                { id: "b", label: "B", text: "Logarithmic transformation." },
                { id: "c", label: "C", text: "First difference transformation." },
            ],
            "b",
            "A constant rate of increase implies exponential growth. To linearize, take the natural logarithm of the dependent variable.",
            "Quantitative Methods"
        ),
        createQuestion(1, 2,
            "Using the linear trend equation results, the specialty retail industry sales forecast for Quarter 1 of 2019 is closest to:",
            [
                { id: "a", label: "A", text: "$26 million." },
                { id: "b", label: "B", text: "$976 million." },
                { id: "c", label: "C", text: "$986 million." },
            ],
            "c",
            "15 years × 4 quarters = 60. Q1 2019 is t=61. Sales = 10.0 + 16.0(61) = 986 million.",
            "Quantitative Methods"
        ),
        createQuestion(1, 3,
            "Assuming the AR(1) model is appropriate, the Quarter 1, 2019, change in sales is most likely to:",
            [
                { id: "a", label: "A", text: "fall from Quarter 4, 2018, change in sales." },
                { id: "b", label: "B", text: "rise from Quarter 4, 2018, change in sales." },
                { id: "c", label: "C", text: "remain unchanged from Quarter 4, 2018, change in sales." },
            ],
            "a",
            "ΔSales Q4 = 1000-950 = 50. Predicted Q1 2019 = 20 + 0.10(50) = 25. This is a fall from 50.",
            "Quantitative Methods"
        ),
        createQuestion(1, 4,
            "Regarding seasonality at 5% significance, Shears should add which lag to the autoregressive model?",
            [
                { id: "a", label: "A", text: "no lag." },
                { id: "b", label: "B", text: "the 3rd lag." },
                { id: "c", label: "C", text: "the 4th lag." },
            ],
            "c",
            "Lag 4 has p-value 0.02 < 0.05, indicating significant quarterly seasonality.",
            "Quantitative Methods"
        ),
    ],
};

// Case 2: Economics - Tristanya Regulatory Analysis
const case2: Case = {
    id: "cfa-l2-s1-case2",
    caseNumber: 2,
    title: "Tristanya Economic Development",
    content: `Tristanya is a developed country with three states. The government is increasing efforts to boost labor productivity with proposals:
1. Increased education funding for elementary and middle schools
2. Increased tax credits for private R&D expenditures
3. Increased depreciation allowances for tax purposes

East has implemented a "sweet tax" on sweet snack foods and a "supersize drinks ban" on large carbonated beverages. Fuel costs are rising with corn ethanol mandates.

**Analyst Findings:**
- Finding 1: Snack industry relocating sweet snacks to West/Central, salty snacks to East
- Finding 2: After West raised fuel economy standards, miles driven per capita increased`,
    questions: [
        createQuestion(2, 5, "The government proposal most likely to lead to highest increase in labor productivity is:",
            [{ id: "a", label: "A", text: "Proposal 1." }, { id: "b", label: "B", text: "Proposal 2." }, { id: "c", label: "C", text: "Proposal 3." }],
            "b", "In developed economies with high capital stock, sustainable productivity increases come from technological progress and innovation. R&D tax credits directly target innovation.", "Economics"),
        createQuestion(2, 6, "Which Tristanyan industry is most likely to shrink due to the regulatory changes in the East?",
            [{ id: "a", label: "A", text: "Snacks." }, { id: "b", label: "B", text: "Agriculture." }, { id: "c", label: "C", text: "Carbonated beverages." }],
            "c", "The 'supersize drinks ban' directly restricts large carbonated beverages sales, reducing industry volume.", "Economics"),
        createQuestion(2, 7, "Based on finding 1, the snack food industry is engaging in regulatory:",
            [{ id: "a", label: "A", text: "capture." }, { id: "b", label: "B", text: "arbitrage." }, { id: "c", label: "C", text: "competition." }],
            "b", "Regulatory arbitrage: companies shop for favorable regulatory environments by moving production to avoid taxes.", "Economics"),
        createQuestion(2, 8, "Which statement regarding regulatory burden is least accurate?",
            [{ id: "a", label: "A", text: "Implementation costs are the greatest costs of regulation." }, { id: "b", label: "B", text: "Private benefits lessen net regulatory burden." }, { id: "c", label: "C", text: "Regulatory burden refers to costs for the regulated entity." }],
            "a", "Indirect costs (unintended consequences, deadweight losses) are often greater than direct implementation costs.", "Economics"),
    ],
};

// Case 3: Economics - Growth Theory & International Parity
const case3: Case = {
    id: "cfa-l2-s1-case3",
    caseNumber: 3,
    title: "Astair Emerging Market Analysis",
    content: `Bella Stone, CFA, analyzes investment opportunities in Astair, an emerging market. At a congressional hearing, Mr. Adel Mahi stated that Astair's capital accumulation affects the size of GDP but not its growth rate.

**Stone's statements on international parity:**
- Statement 1: Absolute PPP is not widely used in practice to forecast exchange rates
- Statement 2: Relative PPP is useful for long-run but not short-run currency values
- Statement 3: For uncovered interest rate parity to hold, forward rate must be unbiased predictor of future spot rate`,
    questions: [
        createQuestion(3, 9, "Mahi's statement is consistent with:",
            [{ id: "a", label: "A", text: "classical growth theory." }, { id: "b", label: "B", text: "endogenous growth theory." }, { id: "c", label: "C", text: "neoclassical growth theory." }],
            "c", "Neoclassical (Solow) theory: capital accumulation increases output level but not permanent growth rate.", "Economics"),
        createQuestion(3, 10, "The objectives of regulators in financial markets is least likely to include:",
            [{ id: "a", label: "A", text: "low inflation." }, { id: "b", label: "B", text: "prudential supervision." }, { id: "c", label: "C", text: "promotion of economic growth." }],
            "c", "Economic growth promotion is fiscal policy objective, not financial market regulator's mandate.", "Economics"),
        createQuestion(3, 11, "Regarding statements 1 and 2 made by Stone, are both statements correct?",
            [{ id: "a", label: "A", text: "Yes." }, { id: "b", label: "B", text: "No, only Statement 2 is correct." }, { id: "c", label: "C", text: "No, both statements are incorrect." }],
            "a", "Both correct: Absolute PPP rarely used (baskets differ), Relative PPP useful long-run only.", "Economics"),
        createQuestion(3, 12, "Stone's statement 3 is most likely:",
            [{ id: "a", label: "A", text: "correct." }, { id: "b", label: "B", text: "incorrect as uncovered interest rate parity holds only if real interest rate parity holds." }, { id: "c", label: "C", text: "incorrect as uncovered interest rate parity holds only if covered interest rate parity holds." }],
            "a", "Correct: For UIRP to hold, forward rate must equal expected future spot rate (unbiased predictor).", "Economics"),
    ],
};

// Case 4: Financial Statement Analysis - Delicious Candy
const case4: Case = {
    id: "cfa-l2-s1-case4",
    caseNumber: 4,
    title: "Delicious Candy Company Analysis",
    content: `Delicious Candy Company manufactures confectionery throughout Europe and Mexico. Listed in Italy, follows IFRS, owns 30% equity interest in US supplier (equity method).

**Exhibit 1: Selected Data (€ millions)**
| | 2017 | 2016 |
|---|---|---|
| Revenue | 60,229 | 55,137 |
| EBIT | 7,990 | 7,077 |
| Income from associate | 354 | 270 |
| Net income | 6,501 | 5,625 |
| Investment in associate | 5,504 | 5,193 |

**Exhibit 3: Market Data**
| | Delicious | Associate |
|---|---|---|
| Market Cap | €97,525 | $32,330 |
| Exchange Rate | €0.70/$|  |`,
    questions: [
        createQuestion(4, 13, "When establishing purpose and context of analysis, which input should Scott use?",
            [{ id: "a", label: "A", text: "Audited financial statements prepared in conformance with GAAP or IFRS." }, { id: "b", label: "B", text: "Ratio analysis adjusted for accounting standard differences." }, { id: "c", label: "C", text: "Investment committee guidelines relevant to the pension fund." }],
            "c", "Purpose/Context phase: understand why analysis is done and constraints (pension fund guidelines).", "Financial Statement Analysis"),
        createQuestion(4, 14, "Reclassifying debt securities from FVPL to FVOCI would most likely:",
            [{ id: "a", label: "A", text: "decrease total assets." }, { id: "b", label: "B", text: "increase total assets." }, { id: "c", label: "C", text: "leave total assets unchanged." }],
            "c", "Both classifications report at fair value on balance sheet. Only affects where unrealized gains reported.", "Financial Statement Analysis"),
        createQuestion(4, 15, "To investigate revenue recognition quality, which is LEAST appropriate?",
            [{ id: "a", label: "A", text: "Compare growth in receivables to revenue growth." }, { id: "b", label: "B", text: "Compare growth in inventory to revenue growth." }, { id: "c", label: "C", text: "Examine cash flows due to net income." }],
            "c", "Net income includes potentially improperly recognized revenue. Look for divergence in receivables/inventory vs cash.", "Financial Statement Analysis"),
        createQuestion(4, 16, "Delicious's stand-alone P/E ratio (excluding associate value) is closest to:",
            [{ id: "a", label: "A", text: "14.2." }, { id: "b", label: "B", text: "14.8." }, { id: "c", label: "C", text: "15.0." }],
            "b", "Stand-alone Cap = 97,525 - (32,330 × 30% × 0.70) = 90,736. Stand-alone NI = 6,501 - 354 = 6,147. P/E = 14.8.", "Financial Statement Analysis"),
    ],
};

// Case 5: Equity Valuation - P/E Prediction Model
const case5: Case = {
    id: "cfa-l2-s1-case5",
    caseNumber: 5,
    title: "Equity Valuation Models",
    content: `Analyst Sandra Swift uses a P/E prediction model: Pred. P/E = 2.74 + 8.21(Payout) + 14.21(g) + 2.81(ROE).

**Company Data:**
| Company | EPS | DPS | ROE |
|---|---|---|---|
| A | $2.00 | $0.50 | 20% |
| B | $4.00 | $1.60 | 15% |
| C | $3.00 | $1.50 | 13% |

Safe Bank: Book value $50, ROE 12%, g=3%, r=9%.
Sigma Inc: Growth company with significant R&D expenses.`,
    questions: [
        createQuestion(5, 17, "Using the P/E prediction model above, the company with the lowest predicted P/E is:",
            [{ id: "a", label: "A", text: "Company A." }, { id: "b", label: "B", text: "Company B." }, { id: "c", label: "C", text: "Company C." }],
            "a", "A: g=15%, Payout=0.25 → P/E=7.48. B: g=9%, Payout=0.40 → P/E=7.72. C: g=6.5%, Payout=0.50 → P/E=8.12.", "Equity Investments"),
        createQuestion(5, 18, "Which relative valuation multiple would Swift most appropriately use to value Sigma, Inc.?",
            [{ id: "a", label: "A", text: "Price-to-cash-flow ratio." }, { id: "b", label: "B", text: "Price-to-book ratio." }, { id: "c", label: "C", text: "Price-to-sales ratio." }],
            "c", "Growth companies with R&D: P/S preferred as sales are less volatile than earnings/book value distorted by R&D.", "Equity Investments"),
        createQuestion(5, 19, "Which statement regarding standardized unexpected earnings is least appropriate?",
            [{ id: "a", label: "A", text: "A given size forecast error is more meaningful the lower the size of historical forecast errors." }, { id: "b", label: "B", text: "SUE divides earnings surprise by the standard deviation of earnings." }, { id: "c", label: "C", text: "Positive surprises may lead to persistent positive abnormal returns." }],
            "b", "SUE = earnings surprise / std dev of FORECAST ERRORS (not earnings themselves).", "Equity Investments"),
        createQuestion(5, 20, "Assuming 9% required return, Safe Bank's residual income equity value is closest to:",
            [{ id: "a", label: "A", text: "$75 per share." }, { id: "b", label: "B", text: "$95 per share." }, { id: "c", label: "C", text: "$115 per share." }],
            "a", "V0 = B0 + [(ROE-r)/(r-g)] × B0 = 50 + (0.03/0.06) × 50 = 50 + 25 = $75.", "Equity Investments"),
    ],
};

// Case 6: Equity - Justified Multiples
const case6: Case = {
    id: "cfa-l2-s1-case6",
    caseNumber: 6,
    title: "Meatpacking Industry Valuations",
    content: `George Armor evaluates three companies using justified multiples of sales and book value.

**Exhibit 1: Selected Financial Information**
| | Able Corp | Baker Inc | Charles Co |
|---|---|---|---|
| Revenue/share | $115.00 | $52.80 | $25.75 |
| EPS | $2.50 | $4.80 | $4.00 |
| DPS | $1.00 | $1.60 | $2.50 |
| ROE | 25% | 15% | 8% |
| Book value | $10.00 | $32.00 | $50.00 |
| Stock price | $60.00 | $70.00 | $35.50 |
| Required return | 20% | 12% | 10% |`,
    questions: [
        createQuestion(6, 21, "Based on justified P/B method, which stock is most undervalued?",
            [{ id: "a", label: "A", text: "Able Corporation." }, { id: "b", label: "B", text: "Baker, Inc." }, { id: "c", label: "C", text: "Charles Company." }],
            "b", "Baker Justified P/B = 2.5, Actual P/B = 2.19. Undervalued. Able is overvalued (6.0 vs 2.0).", "Equity Investments"),
        createQuestion(6, 22, "The justified price-to-sales ratio of Baker, Inc. is closest to:",
            [{ id: "a", label: "A", text: "1.5." }, { id: "b", label: "B", text: "1.7." }, { id: "c", label: "C", text: "1.9." }],
            "b", "P/S = (Margin × Payout × (1+g)) / (r-g) = (0.0909 × 0.3333 × 1.10) / 0.02 = 1.67 ≈ 1.7.", "Equity Investments"),
        createQuestion(6, 23, "Based on justified P/S ratio, Able Corporation is:",
            [{ id: "a", label: "A", text: "overvalued; trades at more than double its justified value." }, { id: "b", label: "B", text: "overvalued vs Baker, undervalued vs Charles." }, { id: "c", label: "C", text: "undervalued; trades at less than half its justified value." }],
            "a", "Able Justified P/S = 0.20, Current P/S = 0.52. Trades at >2x justified value.", "Equity Investments"),
        createQuestion(6, 24, "Which statement about relative valuation merits is correct?",
            [{ id: "a", label: "A", text: "Able is best because highest ROE." }, { id: "b", label: "B", text: "Charles is best because priced below book." }, { id: "c", label: "C", text: "Able's earnings should grow fastest due to high ROE and retention." }],
            "c", "Able: g = 25% × 0.6 = 15% (highest). High ROE + high retention = fastest growth.", "Equity Investments"),
    ],
};

// Case 7: Fixed Income - Spot Rates & Forward Pricing
const case7: Case = {
    id: "cfa-l2-s1-case7",
    caseNumber: 7,
    title: "Fixed Income Spot Curves",
    content: `Ande Lindstrom reviews fixed income submissions after the US central bank raised rates.

**Exhibit 1: U.S. Treasury Spot Curve**
| Maturity | 1 | 2 | 3 | 5 | 7 | 10 | 20 | 30 |
|---|---|---|---|---|---|---|---|---|
| Spot Rate | 0.25% | 0.36% | 0.90% | 1.49% | 2.27% | 2.94% | 3.52% | 4.00% |

Hellens claims: "The 2-year forward on 5-year zero @ $0.8608 per $1 is higher than it should be."

Lindstrom writes: "Forward price unchanged if future 1-year spot equals current 2-year spot."`,
    questions: [
        createQuestion(7, 25, "Hellens's claim regarding the forward contract is most accurately described as:",
            [{ id: "a", label: "A", text: "incorrect, quoted price roughly in line with forward pricing model." }, { id: "b", label: "B", text: "incorrect, quoted price much lower than model suggests." }, { id: "c", label: "C", text: "correct." }],
            "a", "Calculated no-arbitrage forward price ≈ $0.8602, roughly equal to $0.8608. No significant arbitrage.", "Fixed Income"),
        createQuestion(7, 26, "Lindstrom's comment on active bond management is most likely:",
            [{ id: "a", label: "A", text: "correct." }, { id: "b", label: "B", text: "incorrect, forward price unchanged if 1-year spot equals implied forward rate f(1,1)." }, { id: "c", label: "C", text: "incorrect for other reasons." }],
            "b", "Forward price unchanged if future spot = implied forward rate f(1,1), not current 2-year spot.", "Fixed Income"),
        createQuestion(7, 27, "Regarding swap curve advantages in Exhibit 3:",
            [{ id: "a", label: "A", text: "only Advantage One is accurate." }, { id: "b", label: "B", text: "only Advantage Two is accurate." }, { id: "c", label: "C", text: "both advantages are accurate." }],
            "c", "Both correct: swap curves useful in illiquid govt markets and banks use swaps for hedging.", "Fixed Income"),
        createQuestion(7, 28, "The definition of swap spread in Exhibit 3 is:",
            [{ id: "a", label: "A", text: "correct." }, { id: "b", label: "B", text: "incorrect about which party's rate is relevant." }, { id: "c", label: "C", text: "incorrect about what is subtracted." }],
            "c", "Swap spread = fixed swap rate - govt yield, not 'spread paid by floating payer'.", "Fixed Income"),
    ],
};

// Case 8: Derivatives - Interest Rate Swaps
const case8: Case = {
    id: "cfa-l2-s1-case8",
    caseNumber: 8,
    title: "TorkSpark Derivatives Strategy",
    content: `TorkSpark Inc. has fixed-rate bond liability paying 5% annually and wants to reduce interest rate risk. Current swap pricing: pay fixed 4%, receive LIBOR.

A dealer enters currency swap: receive USD fixed 3%, pay GBP fixed 2%. Dealer seeks to hedge currency exposure.

Analyst statements on swaptions and options:
- Payer swaption gains value when rates rise
- Hedging long stock with long puts affects portfolio gamma`,
    questions: [
        createQuestion(8, 29, "To reduce interest rate risk on its bond liability, TorkSpark should:",
            [{ id: "a", label: "A", text: "enter receive-fixed, pay-floating swap." }, { id: "b", label: "B", text: "enter pay-fixed, receive-floating swap." }, { id: "c", label: "C", text: "enter pay-floating, receive-fixed swap." }],
            "b", "To convert fixed liability to floating: pay fixed on swap, receive floating. Net = pay floating.", "Derivatives"),
        createQuestion(8, 30, "For the dealer to hedge the currency swap, which action is LEAST appropriate?",
            [{ id: "a", label: "A", text: "Borrow GBP." }, { id: "b", label: "B", text: "Borrow USD." }, { id: "c", label: "C", text: "Lend USD." }],
            "b", "Dealer long GBP, short USD. To hedge: borrow GBP, lend USD. Borrowing USD increases USD exposure.", "Derivatives"),
        createQuestion(8, 31, "A payer swaption gains value when:",
            [{ id: "a", label: "A", text: "interest rates fall." }, { id: "b", label: "B", text: "volatility decreases." }, { id: "c", label: "C", text: "interest rates rise." }],
            "c", "Payer swaption = right to pay fixed. Value increases if rates rise (swap to pay low fixed becomes valuable).", "Derivatives"),
        createQuestion(8, 32, "Hedging long stock with long puts results in portfolio gamma that is:",
            [{ id: "a", label: "A", text: "negative." }, { id: "b", label: "B", text: "zero." }, { id: "c", label: "C", text: "positive." }],
            "c", "Stock has zero gamma, long puts have positive gamma → portfolio gamma positive.", "Derivatives"),
    ],
};

// Case 9: Alternative Investments - Real Estate
const case9: Case = {
    id: "cfa-l2-s1-case9",
    caseNumber: 9,
    title: "Real Estate Investment Trust Analysis",
    content: `Marcus Hall evaluates Briarwood REIT:
- NOI expected: $140M (adjusted)
- Cap rate: 7%
- Other assets: $50M
- Total debt: $300M
- Shares outstanding: 15M
- Current price: $125/share

AFFO projection for terminal value at Year 7: $13.5M. Required return: 9.5%.`,
    questions: [
        createQuestion(9, 33, "Demand for commercial real estate is LEAST driven by:",
            [{ id: "a", label: "A", text: "business conditions (office space)." }, { id: "b", label: "B", text: "population growth." }, { id: "c", label: "C", text: "wage growth & credit (retail)." }],
            "a", "Office space demand driven by business confidence/expansion. Retail more tied to consumer factors.", "Alternative Investments"),
        createQuestion(9, 34, "Based on NAV approach, Briarwood trades at:",
            [{ id: "a", label: "A", text: "discount to NAV." }, { id: "b", label: "B", text: "NAV." }, { id: "c", label: "C", text: "premium to NAV." }],
            "c", "NAV = (140/0.07) + 50 - 300 = 1,750. NAV/share = 116.67. Price 125 > NAV → premium.", "Alternative Investments"),
        createQuestion(9, 35, "Using AFFO terminal value approach, intrinsic value is closest to:",
            [{ id: "a", label: "A", text: "$130.50." }, { id: "b", label: "B", text: "$140.60." }, { id: "c", label: "C", text: "$150.75." }],
            "b", "Terminal = 13.5/0.07 ≈ 192.86. PV calculations give approximately $140.60.", "Alternative Investments"),
        createQuestion(9, 36, "Compared to REITs, REOCs can:",
            [{ id: "a", label: "A", text: "offer higher dividend yields." }, { id: "b", label: "B", text: "avoid double taxation." }, { id: "c", label: "C", text: "retain earnings for growth." }],
            "c", "REOCs can retain earnings (REITs must distribute 90%+). REOCs are less tax-efficient.", "Alternative Investments"),
    ],
};

// Case 10: Risk Management - VaR & Policies
const case10: Case = {
    id: "cfa-l2-s1-case10",
    caseNumber: 10,
    title: "Hedge Fund Risk Management",
    content: `Lyndon Fund risk policies:
- VaR calculated: Mean return - (z-score × Volatility)
- Recommendation: Set VaR limit, liquidate if losses exceed threshold
- Maximum drawdown measures peak-to-trough decline

Analyst statements on ETFs and ADRs:
- Statement 1: Synthetic ETFs have counterparty risk
- Statement 2: Settlement risk is key concern for ADRs`,
    questions: [
        createQuestion(10, 37, "The VaR calculation method described most likely uses:",
            [{ id: "a", label: "A", text: "historical simulation." }, { id: "b", label: "B", text: "parametric (variance-covariance) method." }, { id: "c", label: "C", text: "Monte Carlo simulation." }],
            "b", "VaR = Mean - z × σ is the parametric method assuming normal distribution.", "Portfolio Management"),
        createQuestion(10, 38, "The recommendation describes which risk policy?",
            [{ id: "a", label: "A", text: "Position limits." }, { id: "b", label: "B", text: "Stop-loss policy." }, { id: "c", label: "C", text: "Scenario limits." }],
            "b", "VaR limit + liquidation trigger = stop-loss policy.", "Portfolio Management"),
        createQuestion(10, 39, "Maximum drawdown measures:",
            [{ id: "a", label: "A", text: "percentage of NAV redeemed at peaks." }, { id: "b", label: "B", text: "average daily loss." }, { id: "c", label: "C", text: "largest peak-to-trough decline." }],
            "c", "Maximum drawdown = largest cumulative loss from a peak to subsequent trough.", "Portfolio Management"),
        createQuestion(10, 40, "Regarding the analyst's statements on ETFs and ADRs:",
            [{ id: "a", label: "A", text: "Statement 1 is correct, Statement 2 is incorrect." }, { id: "b", label: "B", text: "Both statements are correct." }, { id: "c", label: "C", text: "Both statements are incorrect." }],
            "a", "Statement 1 correct (synthetic ETFs: counterparty risk). Statement 2 incorrect (ADRs settle like US stocks).", "Portfolio Management"),
    ],
};

// Case 11: Ethics - Professional Conduct
const case11: Case = {
    id: "cfa-l2-s1-case11",
    caseNumber: 11,
    title: "Shadow Mountain Ethics Case",
    content: `Shadow Mountain Investments case:
- Jasmine Haigh and Thomas Beyer presented at conference
- Used materials from prior employer TIM without attribution
- Haigh referenced her past performance record from TIM

Brokerage arrangements:
- StockCal software: aids investment decisions
- Add-Invest software: generates client reports
- Some advisors increased commissions to direct brokerage`,
    questions: [
        createQuestion(11, 41, "Regarding the presentation materials from TIM:",
            [{ id: "a", label: "A", text: "Both violated Misrepresentation by relabeling TIM materials." }, { id: "b", label: "B", text: "Only Haigh violated Standards." }, { id: "c", label: "C", text: "Neither violated Standards." }],
            "a", "Relabeling TIM materials as Shadow Mountain misrepresents source. Both participated in violation.", "Ethics"),
        createQuestion(11, 42, "Regarding Haigh's use of past performance from TIM:",
            [{ id: "a", label: "A", text: "Disclosure of true source required." }, { id: "b", label: "B", text: "Permission from TIM required." }, { id: "c", label: "C", text: "Both disclosure and permission required." }],
            "a", "Must disclose performance is from prior employer. Permission not required under Standards.", "Ethics"),
        createQuestion(11, 43, "Regarding soft dollar usage for software:",
            [{ id: "a", label: "A", text: "StockCal appropriate, Add-Invest inappropriate." }, { id: "b", label: "B", text: "Both appropriate." }, { id: "c", label: "C", text: "Both inappropriate." }],
            "c", "Soft dollars: research (StockCal) = OK. Administrative costs (client reporting) = not OK.", "Ethics"),
        createQuestion(11, 44, "Increasing commissions to direct brokerage violates:",
            [{ id: "a", label: "A", text: "Suitability." }, { id: "b", label: "B", text: "Loyalty and Best Execution." }, { id: "c", label: "C", text: "Referral Fees disclosure." }],
            "b", "Directing brokerage for personal benefit violates Loyalty and Best Execution duties.", "Ethics"),
    ],
};

// Export the complete exam with all 11 cases (44 questions)
export const cfaLevel2Session1Exam: Exam = {
    id: "cfa-level-2-session-1",
    name: "CFA Level II - Session 1",
    description: "Item Sets covering Economics, Ethics, Quantitative Methods, and Financial Reporting",
    category: "cfa",
    level: "2",
    structure: "case-study",
    totalQuestions: 44, // All 11 cases complete
    timeLimit: 132,
    passingScore: 70,
    difficulty: "advanced",
    icon: "📊",
    topics: [
        "Quantitative Methods",
        "Economics",
        "Financial Statement Analysis",
        "Corporate Finance",
        "Equity Investments",
        "Fixed Income",
        "Derivatives",
        "Alternative Investments",
        "Portfolio Management",
        "Ethics",
    ],
    questions: [], // Empty for case-study exams - use cases instead
    cases: [case1, case2, case3, case4, case5, case6, case7, case8, case9, case10, case11],
};
