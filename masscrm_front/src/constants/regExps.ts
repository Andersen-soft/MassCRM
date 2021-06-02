export const URL_REGEXP = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/;
export const PHONE_REG_EXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
export const SOCIALS_REG_EXP = /(?:http:\/\/)?(?:www\.)?(vk|facebook)\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\\-]*\/)*([\w\\-]*)/;
export const SKYPE_REG_EXP = /^[a-z][a-z0-9_\-.,:]{5,31}$/i;
export const LINKEDIN_REG_EXP = /^.*\b(linkedin\.com)\b.*$/;
export const REGEX_INDUSTRY_NAME = /^[a-zA-Z& \\,-/]+$/;
export const LOCATION_REG_EXP = /^[a-z]+((?:[- ][a-z]+)*)+$/i;
export const LOGIN_REG_EXP = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,19}$/;
export const SOCIAL_NETWORKS = [
  'linkedin.com',
  'vk.com',
  'facebook.com',
  'instagram.com',
  'tiktok.com',
  'im.qq.com',
  'youtube.com',
  'wechat.com',
  'telegram.org'
];
export const NAME_REG_EXP = /^[a-zA-ZäåöüßÄÅÖÜẞа-яА-ЯЁёùûüÿàâæçéèêëïîôœÙÛÜŸÀÂÆÇÉÈÊËÏÎÔŒ]+([\s|-]?[a-zA-ZäåöüßÅÄÖÜẞа-яА-ЯЁёùûüÿàâæçéèêëïîôœÙÛÜŸÀÂÆÇÉÈÊËÏÎÔŒ])*$/g;
export const POSITION_REG_EXP = /^[a-zA-ZäåöüßÄÅÖÜẞа-яА-ЯЁёùûüÿàâæçéèêëïîôœÙÛÜŸÀÂÆÇÉÈÊËÏÎÔŒ]+((( |&|-)|( & ))?[a-zA-ZäåöüßÅÄÖÜẞа-яА-ЯЁёùûüÿàâæçéèêëïîôœÙÛÜŸÀÂÆÇÉÈÊËÏÎÔŒ])*$/g;
export const INVALID_CHARACTERS_OR_FORMAT = 'Invalid characters/format';
