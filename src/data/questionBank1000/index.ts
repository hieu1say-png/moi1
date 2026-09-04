/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION INTELLIGENCE ENGINE: 1,000 QUESTION BANK AGGREGATOR
 * Total Distribution:
 * - CYLINDER: 340
 * - CONE: 330
 * - SPHERE: 300
 * - GENERAL & PARADOX 1/3: 30
 * TOTAL: 1,000 Canonical Structured Questions
 */

import { QuestionRecord, CanonicalTopic, CanonicalIntent } from './types';
import { generateCylinderQuestions } from './cylinderBank';
import { generateConeQuestions } from './coneBank';
import { generateSphereQuestions } from './sphereBank';
import { generateGeneralQuestions } from './generalBank';

import {
  Canonical1000Question,
  SourceExactQuestion,
  GeneratedVariantQuestion,
  ArchetypeDefinition,
  CanonicalShapeTopic,
  QuestionDifficultyLevel,
  ExerciseQuestionType
} from './canonicalSchema';
import { MASTER_ARCHETYPES, ARCHETYPE_MAP } from './archetypeDefinitions';
import { MASTER_SOURCE_EXACT_QUESTIONS, SOURCE_MCQ_QUESTIONS, SOURCE_TL_QUESTIONS } from './sourceExactBank';
import { generateAll1000Variants } from './variantGenerator';
import { QuestionBankValidationEngine } from './validationEngine';
import masterQuestionBankData from '../masterQuestionBank.json';

export const masterQuestionBank = masterQuestionBankData;

export * from './types';
export * from './canonicalSchema';
export * from './archetypeDefinitions';
export * from './sourceExactBank';
export * from './variantGenerator';
export * from './validationEngine';
export * from './cylinderBank';
export * from './coneBank';
export * from './sphereBank';
export * from './generalBank';
export * from './auditReportData';

// Master Unified Question Bank Store
class QuestionBankStore {
  private static instance: QuestionBankStore;
  private questions: QuestionRecord[] = [];
  private topicIndex: Map<CanonicalTopic, QuestionRecord[]> = new Map();
  private intentIndex: Map<CanonicalIntent, QuestionRecord[]> = new Map();
  private keywordIndex: Map<string, QuestionRecord[]> = new Map();
  private idIndex: Map<string, QuestionRecord> = new Map();

  // 4-Tier Master Contract Data
  private sourceQuestions: SourceExactQuestion[] = [];
  private generatedVariants: GeneratedVariantQuestion[] = [];
  private archetypes: Map<string, ArchetypeDefinition> = new Map();
  private isInitialized = false;

  private constructor() {
    this.init();
  }

  public static getInstance(): QuestionBankStore {
    if (!QuestionBankStore.instance) {
      QuestionBankStore.instance = new QuestionBankStore();
    }
    return QuestionBankStore.instance;
  }

  private init() {
    if (this.isInitialized) return;

    // 1. Ingest 73 Exact Source Questions
    this.sourceQuestions = [...MASTER_SOURCE_EXACT_QUESTIONS];

    // 2. Ingest 38 Archetypes
    for (const arch of MASTER_ARCHETYPES) {
      this.archetypes.set(arch.archetypeId, arch);
    }

    // 3. Ingest 1,050 Generated Variants
    this.generatedVariants = generateAll1000Variants();

    // Legacy QuestionRecord Compatibility
    const cyl = generateCylinderQuestions(); // 340
    const cone = generateConeQuestions();    // 330
    const sph = generateSphereQuestions();   // 300
    const gen = generateGeneralQuestions();  // 30

    this.questions = [...cyl, ...cone, ...sph, ...gen];

    // Build Inverted Indexes
    for (const q of this.questions) {
      this.idIndex.set(q.id, q);

      const topicList = this.topicIndex.get(q.topic) || [];
      topicList.push(q);
      this.topicIndex.set(q.topic, topicList);

      const intentList = this.intentIndex.get(q.intent) || [];
      intentList.push(q);
      this.intentIndex.set(q.intent, intentList);

      for (const kw of q.keywords) {
        const kwLower = kw.toLowerCase();
        const kwList = this.keywordIndex.get(kwLower) || [];
        kwList.push(q);
        this.keywordIndex.set(kwLower, kwList);
      }
    }

    this.isInitialized = true;
  }

  // --- Master Contract Accessors ---
  public getSourceQuestions(): SourceExactQuestion[] {
    return this.sourceQuestions;
  }

  public getSourceMCQ(): SourceExactQuestion[] {
    return SOURCE_MCQ_QUESTIONS;
  }

  public getSourceTL(): SourceExactQuestion[] {
    return SOURCE_TL_QUESTIONS;
  }

  public getGeneratedVariants(): GeneratedVariantQuestion[] {
    return this.generatedVariants;
  }

  public getArchetypes(): ArchetypeDefinition[] {
    return MASTER_ARCHETYPES;
  }

  public getArchetypeById(archetypeId: string): ArchetypeDefinition | undefined {
    return this.archetypes.get(archetypeId);
  }

  public getVariantsByArchetype(archetypeId: string): GeneratedVariantQuestion[] {
    return this.generatedVariants.filter((v) => v.sourceArchetypeId === archetypeId);
  }

  public getAllQuestions(): Array<SourceExactQuestion | GeneratedVariantQuestion> {
    return [...this.sourceQuestions, ...this.generatedVariants];
  }

  public getVariantsByFilter(filter: {
    topic?: CanonicalShapeTopic;
    difficulty?: QuestionDifficultyLevel;
    questionType?: ExerciseQuestionType;
    archetypeId?: string;
  }): GeneratedVariantQuestion[] {
    return this.generatedVariants.filter((v) => {
      if (filter.topic && v.topic !== filter.topic) return false;
      if (filter.difficulty && v.difficulty !== filter.difficulty) return false;
      if (filter.questionType && v.questionType !== filter.questionType) return false;
      if (filter.archetypeId && v.sourceArchetypeId !== filter.archetypeId) return false;
      return true;
    });
  }

  public validateMasterBank() {
    return QuestionBankValidationEngine.validateEntireBank(this.sourceQuestions, this.generatedVariants);
  }

  public getMasterQuestions() {
    return masterQuestionBank;
  }

  public getMasterQuestionById(id: string) {
    return masterQuestionBank.find((q: any) => q.id === id || q.sourceId === id);
  }

  // --- Legacy Accessors ---
  public getAll(): QuestionRecord[] {
    return this.questions;
  }

  public getCount(): number {
    return this.questions.length;
  }

  public getById(id: string): QuestionRecord | undefined {
    return this.idIndex.get(id);
  }

  public getByTopic(topic: CanonicalTopic): QuestionRecord[] {
    return this.topicIndex.get(topic) || [];
  }

  public getByIntent(intent: CanonicalIntent): QuestionRecord[] {
    return this.intentIndex.get(intent) || [];
  }

  public searchByKeywords(keywords: string[], filterTopic?: CanonicalTopic): QuestionRecord[] {
    const candidates = filterTopic ? this.getByTopic(filterTopic) : this.questions;
    const scored: { q: QuestionRecord; score: number }[] = [];

    for (const q of candidates) {
      let matchCount = 0;
      for (const kw of keywords) {
        if (q.keywords.includes(kw) || q.normalizedQuestion.includes(kw)) {
          matchCount++;
        }
      }
      if (matchCount > 0) {
        scored.push({ q, score: matchCount });
      }
    }

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.q);
  }
}

export const questionBank = QuestionBankStore.getInstance();

