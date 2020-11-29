export var _theme: any;
/**
 * Returns the default theme
 */
declare function _getTheme(): {
    headline: chalk.Chalk;
    bold: chalk.Chalk;
    italic: chalk.Chalk;
    strikethrough: chalk.Chalk;
    /** @deprecated Used before syntax highlighter */
    code: chalk.Chalk;
    inlineCode: chalk.Chalk;
    blockQuote: chalk.Chalk;
    sourceCodeTheme: string;
    availableSourceThemes: {
        COY: string;
        DARK: string;
        FUNKY: string;
        OKAIDIA: string;
        PRISM: string;
        SOLARIZE: string;
        TOMORROW: string;
        TWILIGHT: string;
    };
    indents: {
        blockquote: number;
        definitionList: number;
    };
    admonitions: {
        enabled: boolean;
        useSafeColors: boolean;
        getStyles: () => any;
        setStyles: (styleBlock: any) => void;
    };
    includePath: any;
};
/**
 * Define a custom theme for the output
 * @param {*} customTheme
 */
declare function _setTheme(customTheme: any): void;
/**
 * Outputs formated string
 * @param {string} filepath to markdown file
 */
declare function _toConsole(filepath: string): void;
/**
 * Returns the raw formatted string
 * @param {string} filepath to markdown file
 */
declare function _toRawContent(filepath: string): any;
import chalk = require("chalk");
export declare const sourceTheme: {
    COY: string;
    DARK: string;
    FUNKY: string;
    OKAIDIA: string;
    PRISM: string;
    SOLARIZE: string;
    TOMORROW: string;
    TWILIGHT: string;
};
export { _getTheme as getTheme, _setTheme as setTheme, _toConsole as toConsole, _toRawContent as toRawContent };
