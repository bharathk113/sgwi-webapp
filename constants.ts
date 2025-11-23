import { PaperConfig, Section } from './types';

export const PAPER_CONFIG: PaperConfig = {
  title: "Development of a Multi-Model Framework for Standardized Groundwater Index Computation",
  authors: "Asha Farsana M., Bharath Kumar Reddy Kadapala, et al.",
  doiUrl: "https://doi.org/10.1016/j.gsd.2025.101523",
  abstract: `
    This study presents a novel methodology for monitoring groundwater drought using the Standardized Groundwater Index (SGWI). 
    Overcoming the limitations of short-term data (16 years) in Andhra Pradesh and Telangana, we employ a multi-model approach 
    utilizing Akaike Information Criterion corrected (AICc) to fit optimal probability distributions (Gamma, Pearson Type III, etc.). 
    The resulting SGWI demonstrates high correlation with long-term indices like SRI and GRACE-DSI, offering a robust framework for data-scarce regions.
  `,
  paperContext: `
    TITLE: Development of a multi-model framework for standardized groundwater index computation: Application to Andhra Pradesh and Telangana states.
    AUTHORS: Asha Farsana M, Bharath Kumar Reddy Kadapala, Satya Geetha Vimala Channa, Abdul Hakeem K, Chandrasekar K.
    JOURNAL: Groundwater for Sustainable Development 31 (2025).

    KEY FINDINGS:
    - Traditional single-model approaches (like SPI) fail when data isn't normally distributed.
    - Shapiro-Wilk tests showed significant non-normality in AP/Telangana groundwater data.
    - The Multi-Model approach uses AICc to weight Gamma, Pearson III, and Normal distributions.
    - 2019 was identified as a severe drought year; 2021 as a wet year.
    - SGWI correlates strongly (R² > 0.74) with GRACE-DSI (satellite data) and SRI (Standardized Runoff Index).
  `
};

export const METHODOLOGY_STEPS = [
  {
    id: 'data',
    title: 'Goodness of Fit (K-S Test)',
    desc: 'Testing distribution validity.',
    details: 'Before model selection, the Kolmogorov-Smirnov (K-S) test is employed to quantify the distance between the empirical distribution of the sample and the cumulative distribution function of reference distributions.',
    math: {
      template: 'd = \\max_{x} \\, \\left| F_o(x) - S_n(x) \\right|'
    }
  },
  {
    id: 'aic',
    title: 'Corrected AIC (AICc)',
    desc: 'Handling small sample sizes.',
    details: 'Standard AIC overfits when sample sizes are small relative to parameters. We utilized AICc (Corrected Akaike Information Criterion) to penalize complexity, ensuring model selection is not biased towards overfitting in short-term datasets.',
    math: {
      template: 'AICc = AIC + \\frac{2K^{2} + 2K}{n - K - 1}'
    }
  },
  {
    id: 'weights',
    title: 'Multi-Model Weighting',
    desc: 'Computing relative likelihoods.',
    details: 'Models are not simply accepted or rejected; they are weighted. The Relative Likelihood (RL) of each distribution is calculated based on its AICc score compared to the minimum AICc found.',
    math: {
      template: 'W_i = \\frac{RL_i}{\\sum_i RL_i} \\quad RL_i = e^{\\, (AIC_{\\min} - AIC_i)/2 }'
    }
  },
  {
    id: 'transform',
    title: 'Standardization (Z-Score)',
    desc: 'Transforming to Index.',
    details: 'The weighted cumulative probability (p) is transformed into the Standardized Groundwater Index (SGWI) using the inverse normal cumulative distribution function.',
    math: {
      template: 'Z = F^{-1}(p)'
    }
  }
];

export const RESULTS_GALLERY = [
  {
    id: 'sri_corr',
    title: 'SGWI vs SRI Correlation',
    caption: 'Figure 11: Linear regression analysis showing strong positive correlation (R² = 0.745) between SGWI and the Standardized Runoff Index (SRI-365).',
    image: 'fig11_sgwi_sri_corr.png',
    stat: 'R² = 0.745'
  },
  {
    id: 'sri_time',
    title: 'SGWI vs SRI Time Series',
    caption: 'Figure 12: Temporal comparison (2008-2023) demonstrating that SGWI (based on 16 years) effectively captures drought signals similar to SRI (based on 30 years).',
    image: 'fig12_sgwi_sri_time.png',
    stat: 'Trend Match'
  },
  {
    id: 'grace_corr',
    title: 'SGWI vs GRACE-DSI',
    caption: 'Figure 13: Validation against satellite-derived Gravity Recovery and Climate Experiment (GRACE) data, showing consistent drought severity magnitudes.',
    image: 'fig13_sgwi_grace_corr.png',
    stat: 'R² = 0.748'
  },
  {
    id: 'grace_time',
    title: 'SGWI vs GRACE Time Series',
    caption: 'Figure 14: Time-series alignment between SGWI and GRACE-DSI, confirming the multi-model framework\'s robustness in data-scarce regions.',
    image: 'fig14_sgwi_grace_time.png',
    stat: 'Satellite Val.'
  }
];

export const SECTIONS: Section[] = [
  {
    id: "introduction",
    title: "Introduction",
    content: "Groundwater drought assessment is traditionally hampered by the need for long-term data (30+ years). In regions like Andhra Pradesh and Telangana, only short-term records (16 years) are available. This study introduces a robust Multi-Model Framework that uses statistical weighting to overcome these data scarcity limitations, providing a higher accuracy than conventional single-distribution models.",
    imagePath: "fig1_study_area.png" 
  },
];