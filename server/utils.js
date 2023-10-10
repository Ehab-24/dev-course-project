export function verifyRequiredFields(json, fields) {
  fields.forEach((f) => {
    if (typeof json[f] === "undefined" || json[f] === "") {
      return false;
    }
  });
  return true;
}
