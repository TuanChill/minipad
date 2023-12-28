import { v4 as uuidv4 } from 'uuid';

export function joinClasses(
  ...args: Array<string | boolean | null | undefined>
) {
  return args.filter(Boolean).join(" ");
}

function isEmpty(obj: object) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return true;
}
// distinguish {}-like empty objects from other objects
export const isEmptyObject = (value: object) => {
  if (value == null || value == undefined) {
    // null or undefined
    return false;
  }

  if (typeof value !== "object") {
    // boolean, number, string, function, etc.
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  // consider `Object.create(null)`, commonly used as a safe map
  // before `Map` support, an empty object as well as `{}`
  if (proto !== null && proto !== Object.prototype) {
    return false;
  }

  return isEmpty(value);
};

export const getUrlHost = (): string => {
  return window.location.host;
};

export const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export const extractNameFromEmail = (email: string) => {
  // Tìm vị trí của ký tự @ trong địa chỉ email
  const atIndex = email.indexOf("@");

  return email.substring(0, atIndex);
};

export const uuidGenerator = (): string => {
  return uuidv4();
}