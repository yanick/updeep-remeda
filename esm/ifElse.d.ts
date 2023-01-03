type Predicate = ((source: any) => boolean) | boolean;
interface IfElse {
    (object: any, predicate: Predicate, trueUpdates: any, falseUpdates: any): unknown;
    (predicate: Predicate, trueUpdates: any, falseUpdates: any): (unknown: any) => unknown;
}
declare const _default: IfElse;
export default _default;
//# sourceMappingURL=ifElse.d.ts.map