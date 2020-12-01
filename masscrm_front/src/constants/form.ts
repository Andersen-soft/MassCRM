export const LINKEDIN_URL = 'https://www.linkedin.com';
export const FACEBOOK_URL = 'https://www.facebook.com/';
export const VK_URL = 'https://vk.com/';
export const ALL_SOCIALS = [LINKEDIN_URL, FACEBOOK_URL, VK_URL];
export const URL_REGEX = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|[a-zA-Z0-9]+\.[^\s]{2,})/;
export const PHONE_REG_EXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
export const SOCIALS_REG_EXP = /(?:http:\/\/)?(?:www\.)?(vk|facebook)\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\\-]*\/)*([\w\\-]*)/;
export const LINKEDIN_REG_EXP = /^.*\b(linkedin\.com)\b.*$/;
export const REGEX_INDUSTRY_NAME = /^[a-zA-Z& \\,-/]+$/;
