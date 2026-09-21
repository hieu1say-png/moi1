/**
 * Test video integration spec and Zero-Fake Policy
 */
import fs from 'fs';
import path from 'path';
import { PersistentTheoryVideoStorage } from '../server/theoryVideoStorage';
import { videoRegistry } from '../src/data/videoRegistry';

async function runTest() {
  console.log('=== TEST 1: Video Registry Data Validation ===');
  const topics = ['cylinder', 'cone', 'sphere'] as const;
  for (const t of topics) {
    const item = videoRegistry[t];
    if (!item) throw new Error(`Missing registry item for ${t}`);
    if (!item.id || !item.storagePath || !item.fileName) {
      throw new Error(`Incomplete registry item for ${t}`);
    }
    console.log(`[PASS] Registry item valid: ${t} -> ${item.id} (${item.fileName})`);
  }

  console.log('\n=== TEST 2: Database No-Fake Policy Validation ===');
  PersistentTheoryVideoStorage.initialize();
  const allVideos = PersistentTheoryVideoStorage.getAllVideos();
  for (const v of allVideos) {
    if (v.videoUrl.includes('fake') || v.videoUrl.includes('example.com')) {
      throw new Error(`CRITICAL: Found fake URL in database: ${v.videoUrl}`);
    }
  }
  console.log(`[PASS] All ${allVideos.length} database records verified with zero fake URLs.`);

  console.log('\n=== TEST 3: Shape Assignments Check ===');
  const assignments = PersistentTheoryVideoStorage.getAssignments();
  if (
    assignments.cylinder !== 'theory-cylinder' ||
    assignments.cone !== 'theory-cone' ||
    assignments.sphere !== 'theory-sphere'
  ) {
    throw new Error(`Assignments mismatch: ${JSON.stringify(assignments)}`);
  }
  console.log('[PASS] Shape assignments correctly mapped to canonical IDs.');

  console.log('\n=== TEST 4: Physical File Verification & Empty Message ===');
  for (const t of topics) {
    const res = PersistentTheoryVideoStorage.getAssignedVideoForShape(t);
    // Since real binary file is not yet placed, it MUST report hasVideo: false with exact message
    if (res.hasVideo) {
      console.log(`[NOTICE] Shape ${t} currently has physical video present.`);
    } else {
      if (res.error !== 'Video bài học chưa được giáo viên cung cấp.') {
        throw new Error(`Shape ${t} unexpected error message: "${res.error}"`);
      }
      console.log(`[PASS] Shape ${t} returns hasVideo=false with exact message: "${res.error}"`);
    }
  }

  console.log('\n=== ALL INTEGRATION SPEC TESTS PASSED ===');
}

runTest().catch((e) => {
  console.error(e);
  process.exit(1);
});
