export var styles: any;
declare function _add(content: any, beforeIdent: any, afterIndent: any, useSafeStyles?: boolean): any;
declare function _getStyles(): {
    indent: {
        beforeIndent: number;
        afterIndent: number;
    };
    abstract: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    note: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    info: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    tip: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    success: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    question: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    warning: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    failure: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    danger: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    important: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    bug: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    example: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
    quote: {
        title: string;
        style: import("chalk").Chalk;
        safeStyle: import("chalk").Chalk;
    };
};
declare function _setStyles(styleBlock: any): void;
export { _add as add, _getStyles as getStyles, _setStyles as setStyles };
