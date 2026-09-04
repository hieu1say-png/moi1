/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * DISK JSON VIDEO REPOSITORY (SERVER-AUTHORITATIVE & ROBUST)
 * - Interfaces with local filesystem on Node server and `/api/theory-videos`
 * - Ensures videos uploaded to `/uploads/videos/` with JSON metadata remain intact across reloads
 */

import { TheoryVideo } from '../../types/theoryVideo';
import { TheoryVideoService } from '../theoryVideoService';

export class DiskJsonVideoRepository {
  /**
   * Fetch all videos from persistent disk repository via API
   */
  static async getAllVideos(): Promise<TheoryVideo[]> {
    return await TheoryVideoService.fetchVideosFromServer();
  }

  /**
   * Save / Create a new video entry to persistent disk storage
   */
  static async createVideo(video: Omit<TheoryVideo, 'id' | 'createdAt' | 'updatedAt'>): Promise<TheoryVideo> {
    const res = await TheoryVideoService.createVideoAsync(video);
    if (res.video) {
      return res.video;
    }
    return TheoryVideoService.createVideo(video);
  }

  /**
   * Update video in disk storage
   */
  static async updateVideo(id: string, updates: Partial<TheoryVideo>): Promise<TheoryVideo> {
    return TheoryVideoService.updateVideo(id, updates);
  }

  /**
   * Delete video and its metadata from disk storage
   */
  static async deleteVideo(id: string): Promise<boolean> {
    return TheoryVideoService.deleteVideo(id);
  }

  /**
   * Upload video file directly to disk /uploads/videos/
   */
  static async uploadVideoFile(file: File): Promise<{ videoUrl: string; fileName: string; fileSize: number }> {
    const res = await TheoryVideoService.uploadVideoFile(file);
    return {
      videoUrl: res.videoUrl || '',
      fileName: res.fileName || file.name,
      fileSize: res.fileSize || file.size
    };
  }
}
