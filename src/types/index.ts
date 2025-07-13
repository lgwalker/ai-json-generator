export interface Config {
    subject: string;
    style: { art_style: string; mood: string };
    environment: { location: string; time_of_day: string; weather: string };
    lighting: { type: string; color_palette: string; dominant_colors: string };
    texture: { quality: string; image_quality: string };
    camera: { angle: string; shot_type: string; depth_of_field: string };
    [key: string]: any;
  }
  
  export interface CategoryMetadata {
    [key: string]: {
      name: string;
      color: string;
    };
  }
  
  export interface SavedConfig {
    name: string;
    config: Config;
    categoryMetadata: CategoryMetadata;
    timestamp: string;
  }
  
  export interface ModalState {
    show: boolean;
    type: 'alert' | 'confirm' | 'prompt' | '';
    title: string;
    message: string;
    onConfirm: ((value?: string) => void) | null;
    onCancel: (() => void) | null;
    inputValue: string;
  }
  
  export interface PresetOptions {
    [key: string]: string[];
  }