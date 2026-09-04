declare module 'mammoth' {
  export interface ExtractionResult {
    value: string;
    messages: Array<{
      type: string;
      message: string;
    }>;
  }

  export interface ImageElement {
    src: string;
    altText?: string;
  }

  export interface Image {
    read(encoding: 'base64' | 'binary'): Promise<string>;
    contentType: string;
  }

  export interface ConvertOptions {
    convertImage?: any;
    styleMap?: string | string[];
    includeDefaultStyleMap?: boolean;
  }

  export namespace images {
    export function imgElement(
      callback: (image: Image) => Promise<ImageElement> | ImageElement
    ): any;
    export function dataUri(image: Image): Promise<ImageElement>;
  }

  export function extractRawText(input: { arrayBuffer: ArrayBuffer }): Promise<ExtractionResult>;
  export function convertToHtml(
    input: { arrayBuffer: ArrayBuffer },
    options?: ConvertOptions
  ): Promise<ExtractionResult>;
}

