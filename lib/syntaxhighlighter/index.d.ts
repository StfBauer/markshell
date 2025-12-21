export var theme: any;
export var themeTokenKeys: string[];

/**
 * Information about loaded languages
 */
export interface LoadedLanguagesInfo {
    count: number;
    languages: string[];
}

/**
 *
 * @param {string} source
 * @param {string} language
 * @param {sourceTheme} outTheme
 */
declare function _highlight(source: string, language: string, outTheme: sourceTheme): string;

/**
 * Resolves language aliases to canonical names
 * @param language - Language identifier (may be an alias)
 * @returns Canonical language name or null
 */
declare function _resolveLanguageAlias(language: string): string | null;

/**
 * Get information about currently loaded languages
 * @returns Statistics about loaded languages
 */
declare function _getLoadedLanguagesInfo(): LoadedLanguagesInfo;

type sourceTheme = string;
declare namespace sourceTheme {
    const COY: string;
    const DARK: string;
    const FUNKY: string;
    const OKAIDIA: string;
    const PRISM: string;
    const SOLARIZE: string;
    const TOMORROW: string;
    const TWILIGHT: string;
}

export {
    _highlight as highlight,
    sourceTheme as themes,
    sourceTheme as availableThemes,
    _getLoadedLanguagesInfo as getLoadedLanguagesInfo,
    _resolveLanguageAlias as resolveLanguageAlias
};
