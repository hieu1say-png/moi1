/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GEOMETRY LAB - QUESTION NORMALIZER (V5.0)
 * Normalizes Vietnamese natural language questions for math & geometric intent classification:
 * - Diacritic & Accent Insensitive Normalization
 * - Telex / VNI Typos Correction
 * - Mathematical Notations & Slang Expansion (r, h, l, d, V, Sxq, Stp, pi, etc.)
 */

export class QuestionNormalizer {
  /**
   * Remove Vietnamese accents for diacritic-insensitive matching.
   */
  public static removeAccents(str: string): string {
    if (!str) return '';
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase();
  }

  /**
   * Normalizes abbreviations, slangs, math notations and whitespace.
   */
  public static normalize(raw: string): string {
    if (!raw) return '';

    let text = raw.trim().toLowerCase();

    // Normalize unicode composite accents to precomposed NFC
    text = text.normalize('NFC');

    // Remove punctuation while keeping math symbols (^, *, /, +, -, =, ., ,)
    text = text.replace(/[\?!\:;\"\'“”‘’\(\)\[\]\{\}]/g, ' ');

    // 1. Telex / Typing Typos Normalization
    const typoReplacements: [RegExp, string][] = [
      [/\b(thieets|thieet|thiet)\s+(dieejn|dieen|dien)\b/g, 'thiết diện'],
      [/\b(chieur|chieuf|chieu)\s+(cao)\b/g, 'chiều cao'],
      [/\b(duowngf|duongf|duong)\s+(sinh)\b/g, 'đường sinh'],
      [/\b(duowngf|duongf|duong)\s+(kinh|kjnh)\b/g, 'đường kính'],
      [/\b(banf|ban|bafn)\s+(kinh|kjnh)\b/g, 'bán kính'],
      [/\b(theer|thee|the)\s+(tich|tijch)\b/g, 'thể tích'],
      [/\b(dieejn|dieen|dien)\s+(tich|tijch)\b/g, 'diện tích'],
      [/\b(traif|trai)\s+(phawngr|phangr|phang)\b/g, 'trải phẳng'],
      [/\b(khai)\s+(trieenr|trieen|trien)\b/g, 'khai triển'],
      [/\b(nghichj|nghijch|nghich)\s+(ly|li)\b/g, 'nghịch lý'],
      [/\b(rots|root|rot|doox|doo|do)\s+(nuowcs|nuoc)\b/g, 'rót nước'],
      [/\b(hinhf|hinh)\s+(truj|tru)\b/g, 'hình trụ'],
      [/\b(hinhf|hinh)\s+(nons|non)\b/g, 'hình nón'],
      [/\b(hinhf|hinh)\s+(caauf|cau)\b/g, 'hình cầu'],
      [/\b(mawtj|mat)\s+(caauf|cau)\b/g, 'mặt cầu'],
      [/\b(khoois|khoi)\s+(caauf|cau)\b/g, 'khối cầu'],
      [/\b(hinhf|hinh)\s+(tronf|tron)\s+(lowns|lon)\b/g, 'hình tròn lớn']
    ];

    for (const [pattern, repl] of typoReplacements) {
      text = text.replace(pattern, repl);
    }

    // 2. Mathematical shorthand & slang replacements
    const replacements: [RegExp, string][] = [
      [/\b(ko|k|kh|hok|hong|hổng|khong)\b/g, 'không'],
      [/\b(ct|c\.t|công thuc|cong thuc|congthuc)\b/g, 'công thức'],
      [/\b(tinh|tjh)\b/g, 'tính'],
      [/\b(thiet dien qua truc|thiết diện qua trục|thiet dien truc)\b/g, 'thiết diện qua trục'],
      [/\b(thiet dien|mặt cắt|mat cat)\b/g, 'thiết diện'],
      [/\b(hinh tron lon|hình tròn lớn|đường tròn lớn|duong tron lon)\b/g, 'hình tròn lớn'],
      [/\b(v tru|v hình trụ|v hinh tru)\b/g, 'thể tích hình trụ'],
      [/\b(v non|v hình nón|v hinh non)\b/g, 'thể tích hình nón'],
      [/\b(v cau|v hình cầu|v hinh cau)\b/g, 'thể tích hình cầu'],
      [/\b(sxq tru|sxq hình trụ)\b/g, 'diện tích xung quanh hình trụ'],
      [/\b(sxq non|sxq hình nón)\b/g, 'diện tích xung quanh hình nón'],
      [/\b(stp tru|stp hình trụ)\b/g, 'diện tích toàn phần hình trụ'],
      [/\b(stp non|stp hình nón)\b/g, 'diện tích toàn phần hình nón'],
      [/\b(sxq|s xung quanh|dien tich xung quanh)\b/g, 'diện tích xung quanh'],
      [/\b(stp|s toan phan|dien tich toan phan)\b/g, 'diện tích toàn phần'],
      [/\b(s day|s đáy|dien tich day|diện tích đáy)\b/g, 'diện tích đáy'],
      [/\b(dt|dien tich)\b/g, 'diện tích'],
      [/\b(tt|the tich)\b/g, 'thể tích'],
      [/\b(bk|ban kinh)\b/g, 'bán kính'],
      [/\b(dk|duong kinh)\b/g, 'đường kính'],
      [/\b(cc|chieu cao)\b/g, 'chiều cao'],
      [/\b(ds|duong sinh)\b/g, 'đường sinh'],
      [/\b(cv|chu vi)\b/g, 'chu vi'],
      [/\b(tai sao|vi sao|sao lai|ly do|sao thế|sao z)\b/g, 'tại sao'],
      [/\b(giai thich|gt)\b/g, 'giải thích'],
      [/\b(huong dan|hd)\b/g, 'hướng dẫn'],
      [/\b(goi y|gy)\b/g, 'gợi ý'],
      [/\b(dap an|kq|ket qua)\b/g, 'đáp án'],
      [/\b(trai phang|khai trien|trai hinh)\b/g, 'trải phẳng'],
      [/\b(hinh quat|quat tron|hinh quat tron)\b/g, 'hình quạt tròn'],
      [/\b(goc o tam|goc quat|góc ở tâm)\b/g, 'góc ở tâm'],
      [/\b(rot nuoc|do nuoc|rot|do|đổ nước)\b/g, 'rót nước'],
      [/\b(1\/3|mot phan ba|1 phan 3|một phần ba)\b/g, '1/3'],
      [/\b(4\/3|bon phan ba|4 phan 3|bốn phần ba)\b/g, '4/3'],
      [/\b(2\/3|hai phan ba|2 phan 3|hai phần ba)\b/g, '2/3'],
      [/\b(3 lan|ba lan|3lan)\b/g, '3 lần'],
      [/\b(pi|\\pi)\b/g, 'π'],
      [/\b(r\^2|r2|r bình|r binh|r bình phương)\b/g, 'r²'],
      [/\b(r\^3|r3|r lập|r lap|r lập phương)\b/g, 'r³'],
      [/\b(h\^2|h2|h bình|h binh|h bình phương)\b/g, 'h²'],
      [/\b(l\^2|l2|l bình|l binh|l bình phương)\b/g, 'l²'],
      [/\b(cm2|cm\^2)\b/g, 'cm²'],
      [/\b(cm3|cm\^3)\b/g, 'cm³'],
      [/\b(dm3|dm\^3)\b/g, 'dm³'],
      [/\b(m2|m\^2)\b/g, 'm²'],
      [/\b(m3|m\^3)\b/g, 'm³'],
      [/\b(hinh tru|tru)\b/g, 'hình trụ'],
      [/\b(hinh non|non)\b/g, 'hình nón'],
      [/\b(hinh cau|cau)\b/g, 'hình cầu'],
      [/\b(nghich ly|nghich li)\b/g, 'nghịch lý'],
      [/\b(ac-si-met|acsimet|archimedes)\b/g, 'archimedes']
    ];

    for (const [pattern, repl] of replacements) {
      text = text.replace(pattern, repl);
    }

    // Compress multiple spaces into one
    return text.replace(/\s+/g, ' ').trim();
  }

  /**
   * Tokenizes text into search tokens & keywords.
   */
  public static extractKeywords(normalized: string): string[] {
    const stopWords = new Set([
      'là', 'gì', 'thế', 'nào', 'sao', 'ơi', 'thầy', 'em', 'ạ', 'cho', 'của',
      'được', 'có', 'và', 'hoặc', 'với', 'như', 'khi', 'này', 'đó', 'thì',
      'ra', 'bao', 'nhiêu', 'hãy', 'giúp', 'làm', 'xin', 'cách', 'một'
    ]);

    const words = normalized.split(/\s+/);
    const keywords: string[] = [];

    for (const w of words) {
      if (w.length > 1 && !stopWords.has(w)) {
        keywords.push(w);
      }
    }

    return Array.from(new Set(keywords));
  }
}

