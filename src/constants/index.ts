import { Config, CategoryMetadata, PresetOptions } from '../types';

export const PRESET_OPTIONS: PresetOptions = {
  art_style: ['photorealistic', 'digital art', 'oil painting', 'watercolor', 'anime', 'cartoon', 'cyberpunk'],
  mood: ['dramatic', 'peaceful', 'mysterious', 'energetic', 'melancholic', 'ethereal', 'dark', 'bright'],
  time_of_day: ['dawn', 'morning', 'midday', 'afternoon', 'golden hour', 'sunset', 'dusk', 'night'],
  weather: ['sunny', 'cloudy', 'rainy', 'stormy', 'foggy', 'snowy', 'misty', 'overcast'],
  angle: ['eye level', 'low angle', 'high angle', "bird's eye view"],
  shot_type: ['close-up', 'medium shot', 'wide shot', 'extreme close-up', 'full body', 'portrait'],
  depth_of_field: ['shallow depth of field', 'deep depth of field', 'bokeh', 'tilt-shift'],
  type: ['natural lighting', 'studio lighting', 'dramatic lighting', 'soft lighting', 'backlighting', 'neon lighting'],
  color_palette: ['warm colors', 'cool colors', 'monochromatic', 'vibrant', 'muted', 'pastel', 'high contrast'],
  quality: ['smooth', 'rough', 'detailed', 'soft', 'sharp', 'glossy', 'matte'],
  image_quality: ['8K resolution', '4K resolution', 'ultra detailed', 'hyperrealistic']
};

export const INITIAL_CONFIG: Config = {
  subject: '',
  style: { art_style: '', mood: '' },
  environment: { location: '', time_of_day: '', weather: '' },
  lighting: { type: '', color_palette: '', dominant_colors: '' },
  texture: { quality: '', image_quality: '' },
  camera: { angle: '', shot_type: '', depth_of_field: '' }
};

export const INITIAL_CATEGORY_METADATA: CategoryMetadata = {
  style: { name: 'Style', color: 'blue-900' },
  environment: { name: 'Environment', color: 'blue-900' },
  lighting: { name: 'Lighting', color: 'blue-900' },
  texture: { name: 'Texture & Quality', color: 'blue-900' },
  camera: { name: 'Camera', color: 'blue-900' }
};