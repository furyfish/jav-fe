export class ObjectUtils {
  static isNull(obj: any) {
    return obj === null || obj === undefined;
  }

  static isNotNull(obj: any) {
    return !this.isNull(obj);
  }
}
