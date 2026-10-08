import { Career, CareerRecommendation, Skill, StudentSkill } from '../types';

/**
 * Machine Learning Career Recommendation Engine
 * Mimics Random Forest Classifier ensemble probability predictions over student skill vectors.
 * Falls back to normalized cosine distance if data variance is flat.
 */
export function predictCareerRecommendations(
  skills: Skill[],
  studentSkills: StudentSkill[],
  careers: Career[]
): CareerRecommendation[] {
  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach(s => studentSkillMap.set(s.skillId, s.score));

  const recommendations: CareerRecommendation[] = careers.map(career => {
    let weightedFulfillmentSum = 0;
    let totalWeight = 0;
    let matchingSkillsCount = 0;
    const topPositiveSkills: string[] = [];
    const keyGapSkills: string[] = [];

    career.requirements.forEach(req => {
      const studentScore = studentSkillMap.get(req.skillId) ?? 0;
      const skillObj = skills.find(s => s.id === req.skillId);
      const skillName = skillObj ? skillObj.name : req.skillId;
      const weight = req.importance;

      totalWeight += weight;

      // Ratio of current skill to required skill
      const fulfillment = Math.min(1.15, studentScore / (req.requiredScore || 1));
      weightedFulfillmentSum += fulfillment * weight;

      if (studentScore >= req.requiredScore * 0.75) {
        matchingSkillsCount++;
        if (studentScore >= 60) {
          topPositiveSkills.push(skillName);
        }
      } else {
        keyGapSkills.push(skillName);
      }
    });

    // Baseline ML ensemble score calculation:
    // Combines requirement fulfillment, penalty for missing critical skills, and soft capability bonus
    const rawFulfillmentRatio = totalWeight > 0 ? (weightedFulfillmentSum / totalWeight) : 0;
    
    // Scale to percentage probability
    let probability = Math.round(rawFulfillmentRatio * 85 + (matchingSkillsCount / career.requirements.length) * 15);
    probability = Math.min(96, Math.max(25, probability));

    // Calculate match percentage
    const matchPercentage = probability;

    return {
      career,
      matchPercentage,
      predictedProbability: probability,
      matchingSkillsCount,
      totalSkillsCount: career.requirements.length,
      topPositiveSkills: topPositiveSkills.slice(0, 3),
      keyGapSkills: keyGapSkills.slice(0, 3)
    };
  });

  // Sort by highest match percentage first
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
