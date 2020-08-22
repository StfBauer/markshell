export type sourceTheme = string;
/**
 *
 * @param {string} source
 * @param {string} language
 * @param {sourceTheme} outTheme
 */
declare function _highlight(source: string, language: string, outTheme: sourceTheme): string;
export namespace sourceTheme {
    const COY: string;
    const DARK: string;
    const FUNKY: string;
    const OKADIDO: string;
    const PRISM: string;
    const SOLARIZE: string;
    const TOMORROW: string;
    const TWILIGHT: string;
}
export { _highlight as highlight, sourceTheme as themes, sourceTheme as availableThemes };
