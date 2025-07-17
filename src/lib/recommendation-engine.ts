import { db } from './db';
import { recommendations, insuranceProducts } from './schema';

export interface UserProfile {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface RecommendationResult {
  id: string;
  productType: string;
  coverageAmount: string;
  termYears: number | null;
  monthlyPremium: string;
  explanation: string;
}

export class RecommendationEngine {
  async generateRecommendation(profile: UserProfile): Promise<RecommendationResult> {
    // Rules-based logic for recommendation
    const { productType, termYears, explanation } = this.determineProductType(profile);
    const coverageAmount = this.calculateCoverageAmount(profile);
    const monthlyPremium = this.calculatePremium(profile, productType, coverageAmount, termYears);

    // Store recommendation in database
    const [recommendation] = await db.insert(recommendations).values({
      productType,
      coverageAmount: coverageAmount.toString(),
      termYears,
      monthlyPremium: monthlyPremium.toString(),
      explanation,
    }).returning();

    return {
      id: recommendation.id,
      productType,
      coverageAmount: this.formatCurrency(coverageAmount),
      termYears,
      monthlyPremium: this.formatCurrency(monthlyPremium),
      explanation,
    };
  }

  private determineProductType(profile: UserProfile): { 
    productType: string; 
    termYears: number | null; 
    explanation: string; 
  } {
    const { age, riskTolerance, dependents } = profile;

    // Rule 1: Young adults with high risk tolerance -> Term Life
    if (age < 40 && riskTolerance === 'high') {
      return {
        productType: 'Term Life',
        termYears: 20,
        explanation: 'Term life insurance is ideal for young adults with high risk tolerance. It provides maximum coverage at the lowest cost during your peak earning years.'
      };
    }

    // Rule 2: Older adults with low risk tolerance -> Whole Life
    if (age >= 40 && riskTolerance === 'low') {
      return {
        productType: 'Whole Life',
        termYears: null,
        explanation: 'Whole life insurance provides permanent coverage with a cash value component. Perfect for conservative investors seeking lifelong protection.'
      };
    }

    // Rule 3: Middle-aged with dependents -> Term Life (longer term)
    if (age >= 30 && age < 50 && dependents > 0) {
      return {
        productType: 'Term Life',
        termYears: 30,
        explanation: 'With dependents to protect, a 30-year term life policy ensures coverage through your children\'s college years and beyond.'
      };
    }

    // Rule 4: Medium risk tolerance -> Universal Life
    if (riskTolerance === 'medium') {
      return {
        productType: 'Universal Life',
        termYears: null,
        explanation: 'Universal life insurance offers flexible premiums and death benefits with potential cash value growth, suitable for moderate risk preferences.'
      };
    }

    // Default: Term Life 20 years
    return {
      productType: 'Term Life',
      termYears: 20,
      explanation: 'Term life insurance provides essential protection at an affordable cost, making it suitable for most life stages.'
    };
  }

  private calculateCoverageAmount(profile: UserProfile): number {
    const { income, dependents } = profile;
    
    // Base coverage: 5-10x annual income
    let multiplier = 7; // Default multiplier
    
    // Adjust based on dependents
    if (dependents === 0) {
      multiplier = 5; // Lower coverage for no dependents
    } else if (dependents >= 3) {
      multiplier = 10; // Higher coverage for more dependents
    }
    
    const baseCoverage = income * multiplier;
    
    // Add $50k per dependent for education/care costs
    const dependentCoverage = dependents * 50000;
    
    const totalCoverage = baseCoverage + dependentCoverage;
    
    // Round to nearest $50k and cap at $2M for this demo
    const roundedCoverage = Math.round(totalCoverage / 50000) * 50000;
    return Math.min(roundedCoverage, 2000000);
  }

  private calculatePremium(
    profile: UserProfile,
    productType: string,
    coverageAmount: number,
    termYears: number | null
  ): number {
    const { age } = profile;
    
    // Base rates per $1000 of coverage (monthly)
    const baseRates = {
      'Term Life': 0.8,
      'Whole Life': 3.5,
      'Universal Life': 2.2,
    };
    
    const baseRate = baseRates[productType as keyof typeof baseRates] || 1.0;
    
    // Age adjustment factor
    const ageAdjustment = age < 30 ? 0.8 : age < 40 ? 1.0 : age < 50 ? 1.3 : 1.8;
    
    // Term adjustment (longer terms are slightly more expensive)
    const termAdjustment = termYears === 30 ? 1.1 : termYears === 20 ? 1.0 : 1.0;
    
    const monthlyPremium = (coverageAmount / 1000) * baseRate * ageAdjustment * termAdjustment;
    
    return Math.round(monthlyPremium * 100) / 100; // Round to 2 decimal places
  }

  private formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  }

  // Method to seed insurance products (for future ML integration)
  async seedInsuranceProducts() {
    const products = [
      {
        type: 'term',
        name: 'FlexTerm Life 20',
        baseRate: '0.0008',
        maxCoverage: '2000000',
        minAge: 18,
        maxAge: 65,
        termOptions: '10,20,30',
      },
      {
        type: 'whole',
        name: 'LifeBuilder Whole Life',
        baseRate: '0.0035',
        maxCoverage: '1000000',
        minAge: 18,
        maxAge: 75,
        termOptions: null,
      },
      {
        type: 'universal',
        name: 'FlexChoice Universal',
        baseRate: '0.0022',
        maxCoverage: '1500000',
        minAge: 18,
        maxAge: 70,
        termOptions: null,
      },
    ];

    for (const product of products) {
      await db.insert(insuranceProducts).values(product);
    }
  }
}