export interface Is {
    (object: any, path: string | number | (number | string)[], predicate: any): boolean;
    (path: string | number | (number | string)[], predicate: any): (object: any) => boolean;
}
declare const _default: Is;
export default _default;
//# sourceMappingURL=is.d.ts.map