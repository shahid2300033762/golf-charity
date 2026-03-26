// Type defining a User's 5 scores
export interface UserEntry {
  userId: string;
  scores: number[];
}

export const drawEngine = {
  /**
   * Generates 5 distinct random numbers between 1 and 45
   */
  generateRandomDraw(): number[] {
    const numbers = new Set<number>();
    while (numbers.size < 5) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
  },

  /**
   * Calculates the number of matching elements using set intersection
   */
  calculateMatches(userScores: number[], drawNumbers: number[]): number {
    const drawnSet = new Set(drawNumbers);
    return userScores.filter(score => drawnSet.has(score)).length;
  },

  /**
   * Evaluates all users against the draw and categorizes winners
   */
  evaluateWinners(entries: UserEntry[], drawNumbers: number[]) {
    const winners = {
      match5: [] as string[],
      match4: [] as string[],
      match3: [] as string[],
    };

    entries.forEach(entry => {
      const matchCount = this.calculateMatches(entry.scores, drawNumbers);
      if (matchCount === 5) winners.match5.push(entry.userId);
      else if (matchCount === 4) winners.match4.push(entry.userId);
      else if (matchCount === 3) winners.match3.push(entry.userId);
    });

    return winners;
  }
};
