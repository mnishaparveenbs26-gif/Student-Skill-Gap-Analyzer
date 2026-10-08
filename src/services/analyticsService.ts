import { Career, GapPriority, GapStatus, ReadinessAnalysis, ReadinessTier, Skill, SkillGapItem, StudentSkill } from '../types';

export function calculateSkillGaps(
  skills: Skill[],
  studentSkills: StudentSkill[],
  targetCareer: Career
): SkillGapItem[] {
  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach(s => studentSkillMap.set(s.skillId, s.score));

  return targetCareer.requirements.map(req => {
    const skillObj = skills.find(s => s.id === req.skillId);
    const skillName = skillObj ? skillObj.name : 'Unknown Skill';
    const category = skillObj ? skillObj.category : 'Programming';
    const currentScore = studentSkillMap.get(req.skillId) ?? 0;
    const requiredScore = req.requiredScore;

    const gapScore = Math.max(0, requiredScore - currentScore);
    const rawGapPercentage = requiredScore > 0 ? (gapScore / requiredScore) * 100 : 0;
    const gapPercentage = Math.round(rawGapPercentage);

    // Classify Priority based on Gap Percentage & Importance
    let priority: GapPriority = 'Low';
    if (gapPercentage > 50 || (gapPercentage > 40 && req.importance >= 4)) {
      priority = req.importance >= 4 ? 'Critical' : 'High';
    } else if (gapPercentage > 20 || (gapPercentage > 15 && req.importance >= 4)) {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }

    // Classify Status
    let status: GapStatus = 'Needs Improvement';
    if (gapPercentage <= 15) {
      status = 'Almost Ready';
    } else if (priority === 'Critical') {
      status = 'Critical Gap';
    } else {
      status = 'Needs Improvement';
    }

    return {
      skillId: req.skillId,
      skillName,
      category,
      currentScore,
      requiredScore,
      gapScore,
      gapPercentage,
      priority,
      status,
      importance: req.importance
    };
  });
}

export function calculateCareerReadiness(
  skills: Skill[],
  studentSkills: StudentSkill[],
  targetCareer: Career,
  hypotheticalOverrides?: Record<string, number>
): ReadinessAnalysis {
  const studentSkillMap = new Map<string, number>();
  studentSkills.forEach(s => studentSkillMap.set(s.skillId, s.score));

  if (hypotheticalOverrides) {
    Object.entries(hypotheticalOverrides).forEach(([id, val]) => {
      studentSkillMap.set(id, val);
    });
  }

  const gapItems = targetCareer.requirements.map(req => {
    const skillObj = skills.find(s => s.id === req.skillId);
    const skillName = skillObj ? skillObj.name : 'Unknown Skill';
    const category = skillObj ? skillObj.category : 'Programming';
    const currentScore = studentSkillMap.get(req.skillId) ?? 0;
    const requiredScore = req.requiredScore;

    const gapScore = Math.max(0, requiredScore - currentScore);
    const gapPercentage = Math.round(requiredScore > 0 ? (gapScore / requiredScore) * 100 : 0);

    let priority: GapPriority = 'Low';
    if (gapPercentage > 50 || (gapPercentage > 40 && req.importance >= 4)) {
      priority = req.importance >= 4 ? 'Critical' : 'High';
    } else if (gapPercentage > 20 || (gapPercentage > 15 && req.importance >= 4)) {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }

    let status: GapStatus = 'Needs Improvement';
    if (gapPercentage <= 15) {
      status = 'Almost Ready';
    } else if (priority === 'Critical') {
      status = 'Critical Gap';
    } else {
      status = 'Needs Improvement';
    }

    return {
      skillId: req.skillId,
      skillName,
      category,
      currentScore,
      requiredScore,
      gapScore,
      gapPercentage,
      priority,
      status,
      importance: req.importance
    };
  });

  // Weighted Career Readiness Calculation:
  // Readiness = Σ(Student Skill Score * Skill Weight) / Σ(Skill Weight)
  let totalWeightedScore = 0;
  let totalWeights = 0;

  targetCareer.requirements.forEach(req => {
    const score = studentSkillMap.get(req.skillId) ?? 0;
    const weight = req.importance;
    totalWeightedScore += score * weight;
    totalWeights += weight;
  });

  const rawReadiness = totalWeights > 0 ? totalWeightedScore / totalWeights : 0;
  const overallReadiness = Math.min(100, Math.max(0, Math.round(rawReadiness)));

  // Categorize Tier
  let tier: ReadinessTier = 'Beginner Stage';
  let tierColor = '#ef4444'; // Red

  if (overallReadiness >= 90) {
    tier = 'Highly Ready';
    tierColor = '#10b981'; // Emerald
  } else if (overallReadiness >= 75) {
    tier = 'Career Ready';
    tierColor = '#06b6d4'; // Cyan
  } else if (overallReadiness >= 50) {
    tier = 'Needs Improvement';
    tierColor = '#f59e0b'; // Amber
  } else {
    tier = 'Beginner Stage';
    tierColor = '#ef4444'; // Red
  }

  // Strong vs Weak vs Critical Gaps
  const strongSkills = gapItems.filter(g => g.gapPercentage <= 20 || g.currentScore >= 75);
  const moderateSkills = gapItems.filter(g => g.gapPercentage > 20 && g.gapPercentage <= 45);
  const weakSkills = gapItems.filter(g => g.gapPercentage > 45 && g.priority !== 'Critical');
  const criticalGaps = gapItems.filter(g => g.priority === 'Critical');

  // Category breakdown
  const categoryMap = new Map<string, { totalCurrent: number; totalReq: number; count: number }>();
  gapItems.forEach(item => {
    const existing = categoryMap.get(item.category) || { totalCurrent: 0, totalReq: 0, count: 0 };
    existing.totalCurrent += item.currentScore;
    existing.totalReq += item.requiredScore;
    existing.count += 1;
    categoryMap.set(item.category, existing);
  });

  const categoryBreakdown = Array.from(categoryMap.entries()).map(([cat, stats]) => ({
    category: cat as any,
    averageScore: Math.round(stats.totalCurrent / stats.count),
    requiredAverage: Math.round(stats.totalReq / stats.count)
  }));

  return {
    careerId: targetCareer.id,
    careerName: targetCareer.name,
    overallReadiness,
    tier,
    tierColor,
    strongSkills,
    moderateSkills,
    weakSkills,
    criticalGaps,
    categoryBreakdown
  };
}
