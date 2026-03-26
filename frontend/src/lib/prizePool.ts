export const prizePool = {
  /**
   * Calculates the total pool from active subscriptions.
   * Assume each subscription contributes fixed rate (e.g., $10) for simplicity.
   */
  calculateTotalPool(activeSubscriptionsCount: number, costPerSub: number = 10): number {
    return activeSubscriptionsCount * costPerSub;
  },

  /**
   * Distributes the pool into tiers: 40% (5 matches), 35% (4 matches), 25% (3 matches).
   * It then subdivides each tier equally among the number of winners.
   */
  distributeTierPayouts(totalPool: number, match5Count: number, match4Count: number, match3Count: number) {
    const defaultTiers = { match5: totalPool * 0.40, match4: totalPool * 0.35, match3: totalPool * 0.25 };
    
    // Rollover logic: If no one wins a tier, you could return it to rollover
    // For this engine, we calculate exact payout per user for each tier
    return {
      match5PayoutPerUser: match5Count > 0 ? (defaultTiers.match5 / match5Count) : 0,
      match4PayoutPerUser: match4Count > 0 ? (defaultTiers.match4 / match4Count) : 0,
      match3PayoutPerUser: match3Count > 0 ? (defaultTiers.match3 / match3Count) : 0,
      rolledOverAmount: match5Count === 0 ? defaultTiers.match5 : 0 // The jackpot rolls over
    };
  }
};
