/**
 * Deeply freeze a plain javascript object.
 *
 * If `process.env.NODE_ENV === 'production'`, this returns the original object
 * without freezing.
 *
 * Or if `process.env.UPDEEP_MODE === 'dangerously_never_freeze'`, this returns the original object
 * without freezing.
 *
 * If in a browser and built without replacing process, never freeze.
 *
 * @function
 * @sig a -> a
 * @param   object Object to freeze.
 * @return  Frozen object, unless in production, then the same object.
 */
declare function freeze<T>(object: T): Readonly<T>;
export default freeze;
//# sourceMappingURL=freeze.d.ts.map